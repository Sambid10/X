import { Button } from '@/components/ui/button'
import { useLikeInformation } from '@/customhooks/useLikeInfo'
import { LikeInfo } from '@/lib/types'
import { FaRegHeart } from "react-icons/fa";
import { cn } from '@/lib/utils'
import { QueryClient, QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import ky from 'ky'
import { Heart } from 'lucide-react'
import React from 'react'
import SimpleToolTip from '../../SimpleToolTip'
interface Props {
    postID: string,
    LikeData: LikeInfo
    className?:string
}
export default function LikeButton({ LikeData, postID ,className}: Props) {
    const queryClient = useQueryClient()
    const queryKey: QueryKey = ["like-info", postID]
    const { data } = useLikeInformation(postID, LikeData)
    const { mutate } = useMutation({
        mutationFn: () => LikeData.isLikedbyUser ? ky.delete(`/api/post/for-you/${postID}/likes`) : ky.post(`/api/post/for-you/${postID}/likes`),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey })
            const previousData = queryClient.getQueryData<LikeInfo>(queryKey)
            queryClient.setQueryData(queryKey, () => ({
                likes:
                    (previousData?.likes || 0) + (previousData?.isLikedbyUser ? -1 : 1),
                isLikedbyUser: !previousData?.isLikedbyUser
            }))
            return { previousData }
        },
        onError(error, variables, context) {
            queryClient.setQueryData(queryKey, context?.previousData)
        },
    })

    return (
        <div className='flex items-center '>
            <SimpleToolTip
                className='bg-gray-800 text-gray-200 p-2 py-2'
                title={data.isLikedbyUser ? "Unlike" : "Like"}
                align='center'
                side='bottom'
            >
                <button onClick={(e) => {
                    e.stopPropagation()
                    mutate()
                }} className="flex px-2 py-2 mt-0.5 hover:bg-[#3E1F1F] ease-in duration-200 transition-colors rounded-full items-center gap-1 text-gray-400  hover:text-red-500">
                    <Heart
                        className={cn(
                            "h-[1.1rem] w-[1.1rem]",
                            className,
                            data.isLikedbyUser && "fill-red-500 text-red-500",
                        )}
                    />

                </button>
            </SimpleToolTip>
            <div className={cn('text-[0.9rem] font-semibold ml-[-4px] mt-[0.20rem]',className)}>
                <h1 className=''>{data.likes}</h1>
            </div>
        </div>
    )
}
