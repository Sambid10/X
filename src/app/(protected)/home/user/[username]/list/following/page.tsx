import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import getSession from '@/lib/getSession'
import { UserData, UserFollowData } from '@/lib/types'
import { getUser } from '../../page'
import PostSkeleton from '@/components/ui/PostSkeleton'
import CustomFollowButton from '@/components/ui/CustomFollowButton'
import BackButton from '@/app/_components/BackButton'
import EditProfile from '../../EditProfile'
interface Props {
    params: { username: string }
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
            <Suspense fallback={<PostSkeleton />}>
                <UserFollowingPage user={user} sessionId={session.user.id} />
            </Suspense>
        </>
    )
}
interface UserProps {
    user: UserData,
    sessionId: string
}
export const UserFollowingPage = async ({ user, sessionId }: UserProps) => {
  
    return (
        <>
            <div className='sticky top-0 backdrop-blur-lg  z-40 pt-6 bg-black  flex flex-col gap-4  '>
                <div className='flex items-center gap-4  px-2 '>
                    <BackButton />
                    <div className='flex flex-col'>
                        <h1
                            style={{ lineHeight: "100%" }}
                            className='text-gray-200 text-[1.4rem] font-bold'>
                            {user.name}
                        </h1>
                        <p className='text-sm text-gray-400'>
                            @{user.displayname}
                        </p>
                    </div>
                </div>
                <h1 className="text-center text-gray-200 text-[1.4rem] font-bold border-gray-600 border-b">
                    Following:
                </h1>

            </div>
            <div>
                {user.following.map((following, index) =>
                    <div key={index} className='    '>
                        <div className='flex items-center justify-between relative  '>
                            <Link href={`/home/user/${following.following.displayname}`} className='w-full hover:bg-[#121212] cursor-pointer'>
                                <div className='flex gap-2 px-4 py-2 min-h-20'>
                                    <div className='relative h-12 w-12'>
                                    <Image
                                        className='rounded-full border-2 border-gray-800'
                                        fill
                                        alt='profilepic'
                                        src={`${following.following.image}`}
                                    />
                                    </div>
                                    <div className='flex flex-col '>

                                        <h1 className='text-base font-semibold'>{following.following.name}</h1>
                                        <h1 className='text-sm font-light text-gray-400'>@{following.following.displayname}</h1>
                                        <h1>{following.following.bio}</h1>
                                    </div>
                                </div>

                            </Link>
                             <div className='absolute right-2 '>
                            {following.followingId !== sessionId && 
                             <CustomFollowButton
                             sessionId={sessionId}
                             userId={following.followingId}
                             initialState={{
                                 followers:0,
                                 isFollowedByUser: following.following.followers.some(
                                     ({ followerId }) => followerId === sessionId // Check if session user follows this user
                                 ),
                             }}
                         />
                           
                            }
                              
                           
                         </div>
                           
                        </div>
                    </div>

                )}

            </div>
        </>

    )
}
