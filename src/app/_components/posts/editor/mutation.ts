"use client"
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitPost } from "./action";
import { toast } from "sonner";
import { PostPage } from "@/lib/types";

export function useSubmitPostMutation(){
    const queryClient=useQueryClient()
    const mutation=useMutation({
        mutationFn:SubmitPost,
        onSuccess:async(npost)=>{
           const queryFilter:QueryFilters={queryKey:["post-feed","for-you"]}
           await queryClient.cancelQueries(queryFilter)

           queryClient.setQueriesData<InfiniteData<PostPage,string | null>>(
            queryFilter,
            (oldData) => {
                const firstPage=oldData?.pages[0]
                if(firstPage) {
                    return {
                        pageParams:oldData.pageParams,
                        pages:[
                            {
                                posts:[npost,...firstPage.posts],
                                nextCursor:firstPage.nextCursor
                            },
                            ...oldData.pages.slice(1),
                        ]
                    }
                }
            }
           )
           queryClient.invalidateQueries({
            queryKey:queryFilter.queryKey,
            predicate(query){
                return !query.state.data
            }
           })
           toast.message("Post created.",{
            richColors:false,
            position:"bottom-center",
            style: {
                backgroundColor: "#1DA1F2", // Twitter blue
                color: "#fff",
                borderRadius: "4px",
                padding: "14px 16px",
                boxShadow: "0px 4px 8px rgba(100, 100, 100, 0.2)",
                fontSize: "16px",
                fontWeight:"bold",
                textAlign:"center",
                    // Center verticall
              }, 

              // Optional icon to make it more engaging
              duration: 4500, // Short display time like Twitter notifications
           
           })
        },
        onError:(err)=>{
            console.log(err)
            toast.error("Sorry Failed to fetch post.Try again")
        }
    })
    return mutation
}