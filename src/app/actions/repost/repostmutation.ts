"use client"
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { HandleRepost } from "./HandleRepost";
import { toast } from "sonner";
import { PostPage } from "@/lib/types";

export function useRepostedPostMutation(){
    const queryClient=useQueryClient()
    const mutation=useMutation({
        mutationFn:HandleRepost,
        // onSuccess:async(npost)=>{
        //    const queryFilter:QueryFilters={queryKey:["post-feed","for-you"]}
        //    await queryClient.cancelQueries(queryFilter)

        //    queryClient.setQueriesData<InfiniteData<PostPage,string | null>>(
        //     queryFilter,
        //     (oldData) => {
        //         const firstPage=oldData?.pages[0]
        //         if(firstPage) {
        //             return {
        //                 pageParams:oldData.pageParams,
        //                 pages:[
        //                     {
        //                         posts:[npost,...firstPage.posts],
        //                         nextCursor:firstPage.nextCursor
        //                     },
        //                     ...oldData.pages.slice(1),
        //                 ]
        //             }
        //         }
        //     }
        //    )
          
          
        // },
        onError:(err)=>{
            console.log(err)
            toast.error("Sorry Failed to fetch post.Try again")
        }
    })
    return mutation
}