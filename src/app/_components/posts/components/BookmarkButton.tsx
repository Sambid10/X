import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import ky from "ky"
import { CiBookmark } from "react-icons/ci";
import { BookmarkInfo } from '@/lib/types'
import { useBookmarkInfo } from '@/customhooks/useBookmarkInfo'
import { cn } from '@/lib/utils'
interface Props {
    postId: string,
    BookmarkData: BookmarkInfo,
    className?:string
}
import SimpleToolTip from '../../SimpleToolTip'
import { Bookmark } from 'lucide-react'
import { NextRequest } from 'next/server'
import { toast } from 'sonner'
export default function BookmarkButton({ BookmarkData, postId ,className}: Props) {

    const queryClient = useQueryClient()
    const queryKey: QueryKey = ["bookmark-info", postId]
    const { data } = useBookmarkInfo( postId, BookmarkData )
    const {mutate} = useMutation({
        mutationFn: ()=> data.isBookmarkedbyuser ? ky.delete(`/api/post/for-you/${postId}/bookmarks`)
            : ky.post(`/api/post/for-you/${postId}/bookmarks`),
        onMutate:async()=>{
            await queryClient.cancelQueries({queryKey})
            const prevData=queryClient.getQueryData<BookmarkInfo>(queryKey)
            queryClient.setQueryData(queryKey,()=>({
                bookmarks:(prevData?.bookmarks || 0) + (prevData?.isBookmarkedbyuser ? -1 : +1),
                isBookmarkedbyuser:!prevData?.isBookmarkedbyuser
            }))
            
            //for toast message idk the toast was not changing color for somereason on the shadncnui on main sonner/toast file
            if (data.isBookmarkedbyuser) {
                toast.message("Removed from Bookmarks", {
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
            } else {
                toast.message("Added to Bookmarks", {
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
            }
        
            return {prevData}
        },onError(error, variables, context) {
            queryClient.setQueryData(queryKey,context)
        },
    })
    return (
        <div className='flex items-center '>
            <SimpleToolTip
                className='bg-gray-800 text-gray-200  p-2 py-2'
                title={data.isBookmarkedbyuser ? "Remove from Bookmark" : "Bookmark"}
                align='center'
                side='bottom'
            >
                <button onClick={(e) => {
                    e.stopPropagation()
                    mutate()
                }} className="flex px-2 py-2 mt-0.5 hover:bg-[#0A1E3F] ease-in duration-200 transition-colors rounded-full items-center gap-1 text-gray-400  hover:text-blue-500">
                    <Bookmark
                        className={cn(
                            "h-[1rem] w-[1rem]",
                            className,
                            data.isBookmarkedbyuser && "fill-blue-500 text-blue-500",
                        )}
                    />

                </button>
            </SimpleToolTip>
            {/* <div className=' text-[0.9rem] ml-[-4px] mt-[0.20rem]'>
                <h1 className=''>{data.bookmarks}</h1>
            </div> */}

        </div>
    )
}
