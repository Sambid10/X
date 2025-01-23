"use client"
import React, { useState } from 'react'
import SearchUsersPage from './SearchUsersPage'
import SearchPostsPage from './SearchPostsPage'
type STATE= "Posts" | "People"
export default function SearchSelection({searchinput}:{
    searchinput:string
}) {
    const[currentstate,setCurrentState]=useState<STATE>("Posts")
  return (
    <div>
        <div className='flex w-full h-12 border-b border-gray-600 bg-black sticky top-20 z-10'>
        <button 
         className={`w-full text-gray-400 hover:bg-[#121212] py-4 ease-in duration-200 border-b relative border-gray-800  transition-colors ${currentstate === "Posts" && "text-gray-50 after:absolute after:left-1/2 after:translate-x-[-50%] after: z-10 after:h-[4px] after:w-14 after:bg-blue-400 after:bottom-0"
         }`}
        onClick={()=>setCurrentState("Posts")}
        >
            Posts
        </button>
        <button   
         className={`w-full text-gray-400 hover:bg-[#121212] py-4 ease-in duration-200 border-b relative border-gray-800  transition-colors ${currentstate === "People" && "text-gray-50 after:absolute after:left-1/2 after:translate-x-[-50%] after: z-10 after:h-[4px] after:w-14 after:bg-blue-400 after:bottom-0"
         }`}
        onClick={()=>setCurrentState("People")} >
            People
        </button>
    </div>
    {currentstate === "People" && <SearchUsersPage searchinput={searchinput}/>}
    {currentstate === "Posts" && <SearchPostsPage searchinput={searchinput}/>}
    </div>
    
  )
}
