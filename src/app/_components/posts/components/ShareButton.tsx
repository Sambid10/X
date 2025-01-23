"use client"
import React, { useState } from 'react'
import { ArrowUpFromLine  } from 'lucide-react'
import { cn } from '@/lib/utils'
import SimpleToolTip from '../../SimpleToolTip'
import { BsShare } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger ,PopoverAnchor} from '@/components/ui/popover'
import { toast } from 'sonner';
export default function ShareButton({postId,className}:{
    postId:string
    className?:string
}) {
    const [popOver,setPopOver]=useState(false)

    const handleCopyLink=()=>{
        const currenturl=window.location.href;
        const currentpost=`/post/${postId}`
        navigator.clipboard.writeText(currenturl + currentpost).then(()=>{
            setPopOver(false)
            toast.message("Copied to Clipboard", {
                richColors: false,
                position: "bottom-center",
                style: {
                    backgroundColor: "#1DA1F2", // Twitter blue
                    color: "#fff",
                    borderRadius: "4px",
                    padding: "14px 16px",
                    fontSize: "16px",
                    fontWeight: "normal",
                    textAlign: "center",
                },
                duration: 4000,
            });
        })
        
    }
  return (
    <>
     <Popover open={popOver} onOpenChange={setPopOver}>
         <div className='flex items-center '>
            <SimpleToolTip
                className='bg-gray-800 text-gray-200  p-2 py-2'
                title={"Share"}
                align='center'
                side='bottom'
            >
                <PopoverTrigger asChild>
                <button onClick={(e) => {
                    e.stopPropagation()
                
                }} className={`flex px-2 py-2 mt-0.5 hover:bg-gray-800 ease-in duration-200 transition-colors rounded-full items-center gap-1 text-gray-400  hover:text-blue-500 ${popOver && "bg-gray-800 text-blue-500"}`}>
                    <ArrowUpFromLine 
                        className={cn(
                            "h-[1rem] w-[1rem]",
                         className   
                        )}
                    />
                </button>
                </PopoverTrigger>
               
            </SimpleToolTip>
            <PopoverContent className='p-0 rounded-xl'>
            <span onClick={(e)=>{
                    e.stopPropagation()
                    handleCopyLink()
                    }} className='flex bg-[#000]  rounded-xl items-center gap-4 text-gray-300 px-3 py-3 transition-colors ease-in duration-200 hover:bg-[#121212] cursor-pointer w-full'>
                    <h1 className=''><BsShare className='h-4 w-4'/></h1>
                    <h1 className='text-[0.95rem]'>Copy Link</h1>
                </span>
            </PopoverContent>
        </div>
    </Popover>
    </>
   
   
  )
}
