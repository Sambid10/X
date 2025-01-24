"use client"
import ky from 'ky';
import {PostPage } from "@/lib/types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import Posts from "@/app/_components/posts/Posts"
import PostSkeleton from "@/components/ui/PostSkeleton"
import HasReachedLastPage from '@/components/ui/InfinteScrollContainer/HasReachedLastPage';
import InfiniteScroll from '@/components/ui/InfinteScrollContainer/InfiniteScroll';
import { Loader2 } from 'lucide-react';
export const ForYouPage=()=>{  
    const {data,hasNextPage,status,isFetchingNextPage,isFetching,fetchNextPage,isFetched}=useInfiniteQuery({
        queryKey:["post-feed","for-you"],
        queryFn:({pageParam})=>ky.get("/api/post/for-you",
            pageParam ? {searchParams:{cursor:pageParam}} : {}
        ).json<PostPage>(),
        initialPageParam:null as string | null,
        getNextPageParam:(lastpage)=>lastpage.nextCursor
    })
    
   if (status === "pending") {
           return (
             <div className='min-h-screen flex justify-center py-4'>
             <Loader2 className='animate-spin text-blue-500'/>
         </div>
   
           )
       }
       const post= data?.pages.flatMap((page) => page.posts) || [];
       if(status === "success" && !post.length && !hasNextPage){
        return (
            <div className="flex flex-col gap-2 items-center pt-4 text-muted-foreground min-h-screen">
              <p className='px-20 text-center'>Sorry couldnot fetch post..</p>
            </div>
          );
    }
    if(status === "error"){
        return (
            <p className="text-center text-destructive">
              An error occurred while loading bookmarks.
            </p>
          );
    }
    return<InfiniteScroll 
        onBottomReached={()=>hasNextPage && !isFetching && fetchNextPage()}
    >
        
        {post.map((post)=>(
            <Posts post={post} key={post.id} />
        ))}
        {isFetchingNextPage && <PostSkeleton/>}
       
        
    </InfiniteScroll>
}