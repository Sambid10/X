"use client"
import React, { useState } from 'react'
import { ForYouPage } from '../For-you.page'
import FollowingPage from './FollowingPage'
type Tabs = "For-You" | "Following"
import PostEditor from '@/app/_components/posts/editor/PostEditor'
export default function PostsPage() {
    const [tabs, setTabs] = useState<Tabs>("For-You")
    const handleTabChange = (tab: Tabs) => {
        setTabs(tab)
    }
    return (
        <>
            <div className="flex justify-between w-full sticky top-0 bg-[#000] z-50">
                <button
                    onClick={() => handleTabChange("For-You")}
                    className={`w-full text-gray-400 hover:bg-[#121212] py-4 ease-in duration-200 border-b relative border-gray-800  transition-colors ${tabs === "For-You" && "text-gray-50 after:absolute after:left-1/2 after:translate-x-[-50%] after: z-10 after:h-[4px] after:w-14 after:bg-blue-400 after:bottom-0"
                        }`}
                >
                    For-You
                </button>
                <button
                    onClick={() => handleTabChange("Following")}
                    className={`w-full relative hover:bg-[#121212] py-2 text-gray-400 ease-in duration-200 border-b border-gray-800  transition-colors ${tabs === "Following" &&  "text-gray-50 after:absolute after:left-1/2 after:translate-x-[-50%] after: z-10 after:h-[4px] after:w-14 after:bg-blue-400 after:bottom-0" 
                        }`}
                >
                    Following
                </button>
            </div>
            <div className='xs:px-4 sm:px-4'>
            <PostEditor />
            </div>
           
            {tabs === "For-You" && (
                <div className=" ">
                    <div className=' border-t-[1px] border-gray-800'/>
                    <ForYouPage />
                </div>
            )}
            {tabs === "Following" && (
                <div className=" ">
                   <div className=' border-t-[1px] border-gray-800'/>
                    <FollowingPage />
                </div>
            )}

        </>
    )
}
