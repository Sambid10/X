import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { NotificationData, PostData, UserData } from "@/lib/types"
  import Image from "next/image"
  import React from "react"
  interface Props{
      userdata:NotificationData,
      children:React.ReactNode,
      sessionId:string | undefined
  }
  import { Linkify } from "./Linkify"
  import { followerInfo } from "@/lib/types"
  import CustomFollowButton from "@/components/ui/CustomFollowButton"
  import Link from "next/link"
import FollowCount from "@/components/ui/FollowCount"
  export  function  NotificationTooltipDemo({children,userdata,sessionId}:Props) {
      
      const followerinfo:followerInfo=({
          followers:userdata.issueruser._count.followers,
          isFollowedByUser:userdata.issueruser.followers.some(({followerId})=>followerId === sessionId),
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
              <Link href={`/home/user/${userdata.issueruser.displayname}`}>
              <Image
              height={40}
              width={40}
              className="rounded-full"
              alt="profile-picture"
              src={`${userdata.issueruser.image}`}
              /></Link>
              
              {sessionId !== userdata.id &&  <CustomFollowButton userId={userdata.issuerId} initialState={followerinfo}/>}
            
              </div>
              <div className="w-fit">
              <Link className="hover:underline underline-offset-2" href={`/home/user/${userdata.issueruser.displayname}`}>
              <h1 className="text-lg font-bold mt-2  w-fit">{userdata.issueruser.name}</h1></Link>
              </div>
             
           
              <h1 className="text-[0.95rem] font-light text-gray-400">@ {userdata.issueruser.displayname}</h1>
              <h1 className='text-gray-200 text-[1rem] font-light mt-2'>
                            <Linkify>
                            {userdata.issueruser.bio}
                            </Linkify>
                            </h1>
              <div className="h-[1.5vh]"/>
              <div className="flex items-center gap-2">
              <span className="text-[0.95rem] flex gap-1 font-light text-gray-400">Posts:<h1 className="font-semibold block text-gray-200">{userdata.issueruser._count.post}</h1></span>
              {/* <FollowCount FollowerInfo={followerinfo} user={userdata} userId={userdata.id}  className={"text-gray-400 text-[0.95rem] flex gap-1  font-light"}/> */}
              <Link className='hover:underline underline-offset-2 text-[0.95rem] flex gap-1 font-light text-gray-400' href={`/home/user/${userdata.issueruser.displayname}/list/following`}>
                        Followers:  <h1 className='font-semibold block text-gray-50'>{userdata.issueruser._count.followers}</h1>
                    </Link>
              <Link className='hover:underline underline-offset-2 text-[0.95rem] flex gap-1 font-light text-gray-400' href={`/home/user/${userdata.issueruser.displayname}/list/following`}>
                        Following:  <h1 className='font-semibold block text-gray-50'>{userdata.issueruser._count.following}</h1>
                    </Link>
              </div>
            
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  