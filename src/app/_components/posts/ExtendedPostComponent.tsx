import { PostData } from '@/lib/types'
import React, { useState } from 'react'
import DeletePostModal from '../modals/DeletePostDialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem ,DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {Ellipsis, Trash } from 'lucide-react'
import { Popover,PopoverTrigger,PopoverContent } from '@/components/ui/popover'
import SimpleToolTip from '../SimpleToolTip'
interface Props{
    post:PostData
}
export default function ExtendedPostComponent({post}:Props) {
    const [dialog,setdialog]=useState(false)
  return (
    <>
   
    <Popover>
    <SimpleToolTip
                 title='More'
                 className='bg-gray-800 text-[#fff] ml-auto'
                 align='center'
                 side='bottom'
                 >
                <PopoverTrigger asChild className='ml-auto'>
               
                    <Button 
                    onClick={(e)=>e.stopPropagation()}
                    variant={"ghost"} className='hover:text-blue-400 rounded-full h-8 w-8 hover:bg-gray-800 '>
                        <Ellipsis  className='text-gray-400'/>
                    </Button>
               
                </PopoverTrigger>
                </SimpleToolTip>
                <PopoverContent align='end'>
                <span onClick={(e)=>{
                    e.stopPropagation()
                    setdialog(true)}} className='flex bg-[#000]  items-center gap-1 text-red-400 px-2 py-2 transition-colors ease-in duration-200 hover:bg-[#121212] cursor-pointer w-full'>
                    <h1 className=''><Trash className='h-4 w-4'/></h1>
                    Delete
                </span>
                </PopoverContent>
            </Popover> 
            <DeletePostModal
                open={dialog}
                post={post}
                onClose={() => setdialog(false)}
            />
        </>
   
  )
}
