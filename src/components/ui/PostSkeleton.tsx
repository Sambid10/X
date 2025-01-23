"use client"
import React from 'react'

export default function PostSkeleton() {
  return (
    <div className="flex p-4 h-52 bg-[#000]  shadow-md mb-4 animate-pulse border-b border-gray-800">
            <div className="w-14 h-14 rounded-full bg-[#121212] mr-4"></div>
            <div className="flex-1 space-y-4 py-1">
                <div className="h-5 bg-[#121212] rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-5 bg-[#121212] rounded"></div>
                    <div className="h-5 bg-[#121212] rounded w-5/6"></div>
                </div>
                <div className="flex space-x-4 mt-2">
                    <div className="h-4 w-8 bg-[#121212] rounded"></div>
                    <div className="h-4 w-8 bg-[#121212] rounded"></div>
                </div>
            </div>
        </div>
  )
}
