import React from 'react'

export default function Divskeleton() {
  return (
    <>
      <div className="flex flex-col p-4 bg-[#000]  shadow-md space-y-4 animate-pulse mb-4 border border-[#121212] rounded-xl">
    {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#121212]"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-[#121212] rounded w-1/2"></div>
                <div className="h-3 bg-[#121212] rounded w-1/3"></div>
            </div>
            <div className="w-16 h-8 bg-[#121212] rounded-full"></div>
        </div>
    ))}
</div>
 <div className="flex flex-col p-4 mt-6 bg-[#000]  shadow-md space-y-3 animate-pulse border border-[#121212] rounded-xl">
 {Array.from({ length: 5 }).map((_, index) => (
     <div key={index} className="space-y-2">
         <div className="h-6 bg-[#121212] rounded w-1/3"></div>
         <div className="h-3 bg-[#121212] rounded w-1/2"></div>
     </div>
 ))}
</div></>
  
  )
}
