"use client"

import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query"
import { DeletePost } from "./action"
import { PostData, PostPage } from "@/lib/types"
import { toast } from "sonner"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

export const useDeletePostMutation = () => {
    const pathname=usePathname()
    const router=useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: DeletePost,
        onSuccess: (deletedPost) => {
            const queryFilter:QueryFilters={queryKey:["post-feed"]}
            queryClient.cancelQueries(queryFilter),
            queryClient.setQueriesData<InfiniteData<PostPage, string | null>>(
                queryFilter,
                (oldData)=>{
                    if(!oldData) return
                    return {
                        pageParams:oldData.pageParams,
                        pages:oldData.pages.map(page=>({
                            nextCursor:page.nextCursor,
                            posts:page.posts.filter(p=>p.id !== deletedPost?.id)

                        }))
                    }
                }
            )
            toast.message("Post Deleted.", {
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
        if(pathname === `/post/${deletedPost!.id}`){
            router.push("/home")
        }
        },
        onError: (error) => {
            console.log(error)
            toast.error("Sorry post could not be deleted.")
        },
    })
    return mutation
}