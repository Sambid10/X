"use client"
import { userFollowerInfo } from '@/customhooks/useFollowerInfo'
import { CommentData, followerInfo, UserData } from '@/lib/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
interface Props {
  userId: string ,
  FollowerInfo: followerInfo,
  user: UserData 
  className?: string
}
export default function FollowCount({ FollowerInfo, userId, user, className}: Props) {
  const { data } = userFollowerInfo(userId, FollowerInfo)
  return (
    <div className={cn(`flex items-center`, className)}>
      <Link className='hover:underline underline-offset-2 flex items-center gap-1' href={`/home/user/${user.displayname}/list`}>
        Follower:  <h1 className='font-semibold block text-gray-200'>{data.followers}</h1>
      </Link>
     
    </div>
  )
}
