import React from 'react'
import { UserData } from '@/lib/types'
import { followerInfo } from '@/lib/types'
interface Props {
    userId: string ,
    FollowerInfo: followerInfo,
    user: UserData,
    className?: string
  }
export default function FollowsUserInfo({FollowerInfo,user,userId,className}:Props) {
   const followingCurrentActiveUser=user.following.some(({followingId})=>followingId === userId)
    console.log(followingCurrentActiveUser)
  return (
    <>
    {followingCurrentActiveUser &&  
    <span className='bg-[#090909] border-blue-400 border rounded-full  font-normal h-9 flex justify-center items-center px-4 -mt-2'>
        Follows you
    </span>}
    </>
   
  )
}
