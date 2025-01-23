"use client"
import React, { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import SimpleToolTip from '../../SimpleToolTip'
import { Commentsmodal } from '../../modals/CommentsModal'
import { PostData } from '@/lib/types'
export default function CommentButton({postcontent,className}:{

    postcontent:PostData,
    className?:string
}) {
    const [comments, setComments] = useState(false)
    const showComments = () => {
        setComments(true)
    }
    return (
        <> <div className='flex items-center '>
            <SimpleToolTip
                className='bg-gray-800 text-gray-200  p-2 py-2'
                title={"Comments"}
                align='center'
                side='bottom'
            >

                <button onClick={(e) => {
                    e.stopPropagation()
                    showComments()

                }} className="flex px-2 py-2 mt-0.5 hover:bg-[#0A1E3F] ease-in duration-200 transition-colors rounded-full items-center gap-1 text-gray-400  hover:text-blue-500">
                    <MessageCircle
                        className={cn(
                            "h-[1.0rem] w-[1.0rem] font-bold",
                            className

                        )}
                    />
                   

                </button>


            </SimpleToolTip>
            <div className={cn('text-[0.9rem] font-semibold ml-[-4px] mt-[0.20rem]',className)}>
                <h1 className=''>{postcontent._count.comments}</h1>
            </div>

        </div>
        {comments && <Commentsmodal postcontent={postcontent} open={comments} onOpen={setComments}/>}
        </>


    )
}
