"use client"
import React, { useTransition } from 'react'
import { Pen, Repeat2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import SimpleToolTip from '../../SimpleToolTip'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { HandleRepost } from '@/app/actions/repost/HandleRepost'
import { PostData } from '@/lib/types'
import { toast } from 'sonner'
import { useSubmitPostMutation } from '../editor/mutation'
import { useRepostedPostMutation } from '@/app/actions/repost/repostmutation'
export default function ReTweetButton({ className, postcontent }: {
    className?: string,
    postcontent: PostData
}) {
    const [popOver, setPopOver] = useState(false)
    const [isPending, startTransition] = useTransition()
    const mutation=useRepostedPostMutation()
    const handleRepost=()=>{
        mutation.mutate(postcontent.id)
    }
    const [modal, setModalOpen] = useState(false)
    return (
        <>
            <Popover open={popOver} onOpenChange={setPopOver}>
                <div className='flex items-center '>
                    <SimpleToolTip
                        className='bg-gray-800 text-gray-200  p-2 py-2'
                        title={"Re-Tweet"}
                        align='center'
                        side='bottom'
                    >
                        <PopoverTrigger asChild>
                            <button onClick={() => {
                                setPopOver(true)
                            }} className={`flex px-2 py-2 mt-0.5 hover:bg-[#0a3f1d] ease-in duration-200 transition-colors rounded-full items-center gap-1 text-gray-400 ${popOver && "bg-[#0a3f1d]"}`}>

                                <Repeat2
                                    className={cn(
                                        "h-[1.2rem] w-[1.2rem]",
                                        className
                                    )}
                                />
                            </button>
                        </PopoverTrigger>

                    </SimpleToolTip>
                </div>
                <PopoverContent className='p-0 rounded-xl -top-6'>
                    <button onClick={handleRepost}
                     className='flex bg-[#000]  rounded-xl items-center gap-4 text-gray-300 px-3 py-3 transition-colors ease-in duration-200 hover:bg-[#121212] cursor-pointer w-full'>
                        <h1 className=''><Repeat2 className='h-4 w-4' /></h1>
                        <h1 className='text-[0.95rem]'>Repost</h1>
                    </button>
                    <span onClick={(e) => {
                        e.stopPropagation()

                    }} className='flex bg-[#000]  rounded-xl items-center gap-4 text-gray-300 px-3 py-3 transition-colors ease-in duration-200 hover:bg-[#121212] cursor-pointer w-full'>
                        <h1 className=''><Pen className='h-4 w-4' /></h1>
                        <h1 className='text-[0.95rem]'>Quote</h1>
                    </span>
                </PopoverContent>
            </Popover>


        </>

    )
}
