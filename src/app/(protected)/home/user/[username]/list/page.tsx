import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import getSession from '@/lib/getSession'
import { UserData, UserFollowData, getUserFollowSelect } from '@/lib/types'
import PostSkeleton from '@/components/ui/PostSkeleton'
import BackButton from '@/app/_components/BackButton'
import CustomFollowButton from '@/components/ui/CustomFollowButton'
interface Props {
    params: { username: string }
}
import { getUser } from '../page'
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
                <UserFollowersPage user={user} sessionId={session.user.id} />
            </Suspense>
        </>
    )
}
interface UserProps {
    user: UserData,
    sessionId: string,

}
export const UserFollowersPage = async ({ user, sessionId }: UserProps) => {

    return (
        <>
            <div className='sticky top-0 backdrop-blur-lg  z-40 pt-6 bg-black  flex flex-col gap-4  '>
                <div className='flex items-center gap-4  px-2 '>
                    <BackButton />
                    <div className='flex flex-col'>
                        <h1
                            style={{ lineHeight: "100%" }}
                            className='text-gray-200 text-[1.4rem] font-bold'>{user.name}</h1>
                        <p className='text-sm text-gray-400'>@{user.displayname}</p>

                    </div>
                </div>

                <h1 className="text-center text-gray-200 text-[1.4rem] font-bold border-gray-600 border-b">Followers:</h1>

            </div>
            <div>
                {user.followers.map((followers, index) =>
                    <div key={index} >
                        <div className='flex items-center justify-between relative '>
                           
                                <Link
                                    prefetch={true}
                                    href={`/home/user/${followers.follower.displayname}`} className=' w-full hover:bg-[#121212] cursor-pointer'>
                                    <div className='flex gap-2'>
                                    <div className='flex gap-2 px-4 py-2 min-h-20'>
                                    <div className='relative h-12 w-12'>
                                        <Image
                                           
                                            className='rounded-full border-2 border-gray-800'
                                            fill
                                            alt='profilepic'
                                            src={`${followers.follower.image}`}
                                        />
                                        </div>

                                        <div className='flex flex-col '>

                                            <h1 className='text-base font-semibold'>{followers.follower.name}</h1>
                                            <h1 className='text-sm font-light text-gray-400'>@{followers.follower.displayname}</h1>
                                            <h1>{followers.follower.bio}</h1>
                                        </div>
                                    </div>
                                    </div>
                                </Link>
                          
                            <div className='absolute right-2 '>
                                {sessionId !== followers.followerId &&
                                    <CustomFollowButton userId={followers.followerId}
                                        initialState={{

                                            followers: followers.follower._count.followers,
                                            isFollowedByUser: followers.follower.followers.some(
                                                ({ followerId }) => followerId === sessionId,
                                            )

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
