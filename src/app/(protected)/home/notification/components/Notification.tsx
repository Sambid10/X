"use client"
import { NotificationData, NotificationPage, PostData } from '@/lib/types'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { NotificationTooltipDemo } from '@/app/_components/NotificationToolTip'
interface Props {
    notification: NotificationData
}
export default function Notification({ notification }: Props) {
    return (
        <div>
            {notification.type === "LIKE" && <LikeNotification notification={notification} />}
        </div>

    )
}

const LikeNotification = ({ notification }: Props) => {
    const handleClick=()=>{
        window.location.href=(`/home/post/${notification.postId}`)
    }
    return (
        <div
        onClick={handleClick}
        className='min-h-[4rem] border-b border-gray-800 cursor-pointer hover:bg-[#121212] flex place-items-baseline gap-2 px-4 py-4 transition-all ease-in duration-200'>
            <div>
                <Heart className='size-10 fill-red-600 text-red-600'/>
            </div>
            <div className='flex flex-col items-start gap-1'>
                <div className='flex gap-2 flex-col'>
                    <div className='w-fit'>
                        <div
                       
                        className='relative h-12 w-12  rounded-full border border-gray-800'>
                            <Image
                                fill
                                alt='profile-pic'
                                className='rounded-full border border-gray-800 '
                                src={`${notification.issueruser.image}`}
                            />
                        </div></div>
                        <span 
                        onClick={(e)=>e.stopPropagation()}
                        className='font-bold flex items-center gap-2 '>
                           <NotificationTooltipDemo  userdata={notification} sessionId={notification.recipientID}>
                           <Link
                           href={`/home/user/${notification.issueruser.displayname}`}
                           className='hover:underline'
                           >
                           {notification.issueruser.name}
                           </Link>
                           
                           </NotificationTooltipDemo>
                          
                           
                           
                            <h1 className='font-light text-gray-200 '>
                                liked your post.
                            </h1>
                        </span>
                        <p 
                        className='text-gray-400 whitespace-pre-line'>
                            {notification.post?.content}</p>
                </div>
            </div>
        </div>
    )
}