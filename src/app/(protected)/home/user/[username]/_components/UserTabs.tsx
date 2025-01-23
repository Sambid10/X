"use client"
import React, { useEffect, useState } from 'react'
import UserPost from '../UserPost'
import { Lock } from 'lucide-react'
import LikedPost from './LikedPost'
import UserMedia from './UserMedia'
import { useSession } from 'next-auth/react'
import UserReplies from './UserReplies'
type Tabs = "Posts" | "Media" | "Likes" | "Replies"
export default function UserTabs({ id }: {
    id: string
}) {
    const session = useSession()
    const [tabs, setTabs] = useState<Tabs>("Posts")
    const handleTabChange = (tabs: Tabs) => {
        setTabs(tabs)
    }
    return (
        <>
            <div className='flex  w-full  mt-2'>
                <button
                    onClick={() => handleTabChange("Posts")}
                    className={`w-full relative hover:bg-[#121212] py-2  ease-in duration-200  border-b border-gray-800  text-gray-400 transition-colors ${tabs === "Posts" && "after:absolute text-gray-50 after:left-1/2 after:translate-x-[-50%] after:w-12 after:bottom-0 after:bg-blue-400 after:h-[4px]"}`

                    }>
                    Posts
                </button>
                <button
                    onClick={() => handleTabChange("Replies")}
                    className={`w-full relative hover:bg-[#121212]  py-2   ease-in duration-200  border-b border-gray-800  text-gray-400 transition-colors ${tabs === "Replies" && "after:absolute text-gray-50 after:left-1/2 after:translate-x-[-50%] after:w-12 after:bottom-0 after:bg-blue-400 after:h-[4px]"}`                    
                    }>
                    Replies
                </button>
                <button
                    onClick={() => handleTabChange("Media")}
                    className={`w-full relative hover:bg-[#121212]  py-2   ease-in duration-200  border-b border-gray-800  text-gray-400 transition-colors ${tabs === "Media" && "after:absolute text-gray-50 after:left-1/2 after:translate-x-[-50%] after:w-12 after:bottom-0 after:bg-blue-400 after:h-[4px]"}`}
                >
                    Media
                </button>
                {session.data?.user.id === id &&
                    <>
                        <button
                            onClick={() => handleTabChange("Likes")}
                            className={`w-full hover:bg-[#121212] py-2 ease-in duration-200 border-b border-gray-800 transition-colors text-gray-400 relative 
                                ${tabs === "Likes" && "after:absolute text-gray-50 after:left-1/2 after:translate-x-[-50%] after:w-12 after:bottom-0 after:bg-blue-400 after:h-[4px]"}
                            `}>
                            Likes
                        </button>
                    </>
                }

            </div>
            {tabs === "Posts" &&
                <div className='min-h-screen -mx-6'>
                    <UserPost userId={id} />
                </div>}

            {tabs === "Media" &&
                <div className='min-h-screen -mx-6'>
                    <UserMedia userId={id} />
                </div>}

                {tabs === "Replies" &&
                <div className='min-h-screen -mx-6'>
                    <UserReplies userId={id} />
                </div>}

            {tabs === "Likes" &&
                <div className='min-h-screen -mx-6'>

                    <div className='bg-[#0A1E3F] mb-1 text-center gap-2 text-[#fff] py-2 px-2 flex items-center justify-center font-normal'>
                        <Lock size={16} /> Likes are private—you can only see your own, not others'.
                    </div>
                    <LikedPost userId={id} />
                </div>}


        </>

    )
}
