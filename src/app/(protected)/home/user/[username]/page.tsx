import React, { cache, Suspense, use } from 'react'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { followerInfo, getUserDataSelect, UserData } from '@/lib/types'
import getSession from '@/lib/getSession'
import Image from 'next/image'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { FaCalendar, } from 'react-icons/fa'
import EditProfile from './EditProfile'
import CustomFollowButton from '@/components/ui/CustomFollowButton'
import FollowsUserInfo from './_components/FollowsUserInfo'
import FollowCount from '@/components/ui/FollowCount'
import { Linkify } from '@/app/_components/Linkify'
import BackButton from '@/app/_components/BackButton'
import UserTabs from './_components/UserTabs'
import PremiumBannerProfile from '@/app/_components/PremiumBannerProfile'
import { Metadata } from 'next'

interface Props {
    params: { username: string }
}
export const getUser = cache(async (username: string, loggedInUser: string) => {
    const user = await db.user.findFirst({
        where: {
            displayname: {
                equals: username,
                mode: "insensitive"
            }
        },
        select: getUserDataSelect(loggedInUser),
       
    })
    if (!user) notFound()
    return user
})

export async function generateMetadata({ params }: Props):Promise<Metadata> {
    const { username } = await params
    const session = await getSession()
    if (!session?.user.id) return {}
    const user = await getUser(username, session.user.id)
    return {
        title: `${user.name} / @${(user.displayname)}`
    }
}
export default async function page({ params }: Props) {
    const { username } = await params
    const session = await getSession()
    if (!session?.user.id) {
        return <p>Not Authorized</p>
    }
   
    const user = await getUser(username, session.user.id)
 

    return (
        <>

            <Suspense fallback={<Loader2 className='flex justify-center animate-spin w-full mt-4 text-blue-500' />}>
                <UserPage user={user} />
            </Suspense>
        </>
    )
}
export const UserPage = async ({ user }: {
    user: UserData,

}) => {
    const session = await getSession()
    if (!session?.user.id) throw new Error("Unauthorized")
    const followerinfo: followerInfo = ({
        followers: user._count.followers,
        isFollowedByUser: user.followers.some(({ followerId }) => followerId === session.user.id),
    
    })

    return (


        <>
            <div className='border-b sticky top-0 backdrop-blur-lg  z-40 pt-6 bg-black border-gray-600 flex gap-4 items-center py-2 px-2 '>
                <BackButton />
                <div className='flex flex-col'>
                    <h1
                        style={{ lineHeight: "100%" }}
                        className='text-gray-200 text-[1.4rem] font-bold'>{user.name}</h1>
                    <p className='text-sm text-gray-400'>{user._count.post} posts</p>
                </div>

            </div>
            <div
                style={{
                    backgroundImage: user.background ? `url(${user.background})` : undefined,
                    backgroundColor: user.background ? undefined : "#363839",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className='h-[14rem] bg-[#363839] relative'>
                <div className='absolute -bottom-20 left-6'>
                    <Image
                        className='rounded-full border-4 border-black'
                        height={160}
                        width={160}
                        alt='pic'
                        src={`${user.image}`}
                    />
                </div>


            </div>
            <div className='text-gray-200 px-6 pt-[6rem] font-bold border-b border-stone-800 relative '>
                <div className='flex items-start '>
                    <div
                        style={{ lineHeight: "160%" }}
                        className='flex flex-col'>
                            <div className='flex  gap-6'>
                            <h1 className='text-[1.7rem]'>{user.name}</h1>
                            {session?.user.id !== user.id &&   <FollowsUserInfo userId={session.user.id} user={user} FollowerInfo={followerinfo}/>}
                          
                            </div>
                       
                        <p className='text-gray-400/100 text-[0.90rem] font-light'>@{user.displayname}</p>
                        <h1 className='text-gray-200 text-[1rem] font-light'>
                            <Linkify>
                                {user.bio}
                            </Linkify>
                        </h1>
                        <h1 className='mt-3 text-gray-400 text-base font-light flex items-center gap-2'>
                            <FaCalendar className='text-lg' />
                            Joined {user.createdAt.toLocaleString('en-us', {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}</h1>
                    </div>
                  
                   

                   
                    
                    {session?.user.id === user.id ? <EditProfile user={user} /> : 
                    <div className='absolute right-4 top-4'>
                    <CustomFollowButton userId={user.id} initialState={followerinfo} />
                    </div>
                    }

                </div>
                <div className='mt-2  mb-12 font-light text-base flex gap-2 items-center text-gray-400/100 '>
                    <span className=' flex items-center gap-1'>Posts: <h1 className='font-semibold block text-gray-200'>{user._count.post}</h1></span>
                    
                    <FollowCount userId={user.id} user={user} FollowerInfo={followerinfo} />
                    <Link className='hover:underline underline-offset-2 flex items-center gap-1' href={`/home/user/${user!.displayname}/list/following`}>
                        Following:  <h1 className='font-semibold block text-gray-200'>{user._count.following}</h1>
                    </Link>
                </div>
                {session.user.id === user.id && <PremiumBannerProfile/>}
                <UserTabs id={user.id} />
            </div>



        </>

    )
}

