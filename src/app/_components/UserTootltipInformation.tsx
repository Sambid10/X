import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CommentData, NotificationData } from "@/lib/types"
import { PostData } from "@/lib/types"
import Image from "next/image"
import React from "react"
import FollowCount from "@/components/ui/FollowCount"
interface Props{
    user:PostData | CommentData
    children:React.ReactNode,
    sessionId:string | undefined
}
import { Linkify } from "./Linkify"
import { followerInfo } from "@/lib/types"
import CustomFollowButton from "@/components/ui/CustomFollowButton"
import Link from "next/link"

export  function  TooltipDemo({children,user,sessionId}:Props) {
    
    const followerinfo:followerInfo=({
        followers:user.user._count.followers,
        isFollowedByUser:user.user.followers.some(({followerId})=>followerId === sessionId),
       
    })
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
            {children}
        </TooltipTrigger>
        <TooltipContent 
        className="bg-black  px-4 py-4 text-gray-200 border-stone-800 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]">
            <div className="flex items-center justify-between">
            <Link href={`/home/user/${user.user.displayname}`}>
            <img
            className="rounded-full h-16 w-16"
            alt="profile-picture"
            src={`${user.user.image}`}
            /></Link>
            
            {sessionId !== user.user.id &&  <CustomFollowButton userId={user.user.id} initialState={followerinfo}/>}
    
            </div>
            <Link className="hover:underline underline-offset-2" href={`/home/user/${user.user.displayname}`}>
            <h1 className="text-lg font-bold mt-2">{user.user.name}</h1></Link>
         
            <h1 className="text-[0.95rem] font-light text-gray-400">@ {user.user.displayname}</h1>
            <h1 className='text-gray-200 text-[1rem] font-light mt-2'>
                            <Linkify>
                            {user.user.bio}
                            </Linkify>
                            </h1>
            <div className="h-[1.5vh]"/>
            <div className="flex items-center gap-2">
            <span className="text-[0.95rem] flex gap-1 font-light text-gray-400">Posts:<h1 className="font-semibold block text-gray-200">{user.user._count.post}</h1></span>
            <FollowCount FollowerInfo={followerinfo} user={user.user} userId={user.user.id}  className={"text-gray-400 text-[0.95rem] flex gap-1  font-light"}/>
            <span className="text-gray-400 text-[0.95rem] flex gap-1  font-light">Following: <h1 className="font-semibold block text-gray-200">{user.user._count.following}</h1></span>
            
            </div>
          
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
