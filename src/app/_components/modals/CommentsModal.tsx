"use client"
import { formatDate } from '@/lib/formatdate'
import { Linkify } from '../Linkify'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { PostData } from '@/lib/types'
import { TooltipDemo } from '../UserTootltipInformation'
import { useSession } from 'next-auth/react'
import PostEditor from "../posts/editor/PostEditor"
import CommentEditor from '../posts/editor/CommentPostEditor'
interface Props {
    open: boolean,
    onOpen: (open: boolean) => void,
    postcontent: PostData
}
export const Commentsmodal = ({ open, onOpen, postcontent }: Props) => {
    const session = useSession()
    const [isExpanded, setisExpaned] = useState<boolean>(false)
    const maxcharacters = 40
    const handleTrunckatedContent = () => {
        setisExpaned((prev) => !prev)
    }
    const tunckatedContent = postcontent.content.length > maxcharacters && !isExpanded ? postcontent.content.slice(0, maxcharacters) + "......" : postcontent.content
    const handleClose = () => {
        onOpen(false)
    }
  
    return (
        <AlertDialog open={open} onOpenChange={handleClose}>
            <AlertDialogContent className='w-[80%] md:w-[40%] overflow-clip flex flex-wrap max-h-[60%] overflow-y-auto fixed top-[40%]'>
                <div className='flex justify-end w-full'>
                    <AlertDialogCancel className='border-none hover:bg-gray-800  '>
                        <div className='w-full'>X</div>
                    </AlertDialogCancel>
                </div>
                <AlertDialogHeader>
                    <AlertDialogTitle />
                    <AlertDialogDescription />
                </AlertDialogHeader>
                <div className='w-full mt-[-40px]'>
                    <article>
                        <div className="relative">
                            <div className="flex gap-2 w-full text-gray-100 ">
                                <div className="w-fit relative">
                                    <Link href={`/home/user/${postcontent.user.displayname}`}>
                                        <img
                                            fetchPriority="high"
                                            src={postcontent.user.image!}
                                            
                                            
                                            className="rounded-full h-11 w-12 brightness-90 relative z-30 border border-gray-700"
                                            alt="profile-pic"
                                        />
                                    </Link>
                                    <div className='absolute inset-0 z-10 h-full w-full flex justify-center '>
                                        <div className=' w-[2px] bg-gray-800' />
                                    </div>
                                </div>
                                <div onClick={(e) => e.stopPropagation()} className="flex flex-col w-[100%]  ">
                                    <div className="flex gap-2 items-center">
                                        <TooltipDemo user={postcontent} sessionId={session.data?.user.id}>
                                            <Link onClick={(e) => e.stopPropagation()} href={`/home/user/${postcontent.user.displayname}`} className="hover:underline underline-offset-2">
                                                <h1 className="font-semibold text-[1.07rem]">{postcontent.user.name}</h1>
                                            </Link>
                                        </TooltipDemo>
                                        <h1 className="font-normal text-[0.89rem] tracking-wider text-gray-400">@{postcontent.user.displayname}</h1>
                                        <h1 className="font-normal ml-[-5px] tracking-wide text-[0.89rem] text-gray-400">{formatDate(postcontent.createdAt)}</h1>

                                    </div>
                                    <Linkify>
                                        <h1 className="font-normal cursor-text text-[1rem] mt-[0.10rem] whitespace-pre-line">
                                            {tunckatedContent}
                                        </h1>
                                        {postcontent.content.length > maxcharacters && (
                                            <button className="ml-auto mt-1 text-sm text-blue-400 hover:underline" onClick={handleTrunckatedContent}>
                                                {isExpanded ? <h1>See Less</h1> : <h1>See More</h1>}
                                            </button>
                                        )}
                                        <span className='text-sm text-gray-400 flex items-center gap-2 mt-6'>Replying to <h1 className='text-blue-400'>@{postcontent.user.displayname} </h1></span>
                                    </Linkify>
                                </div>
                            </div>
                        </div>
                    </article>
                    <CommentEditor  postId={postcontent.id} buttonTitle={"Reply"} postContent={postcontent} closeModal={handleClose}/>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
