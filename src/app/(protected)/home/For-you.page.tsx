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
    const post= data?.pages.flatMap((page) => page.posts) || [];
    if(status === "pending"){
        return ( 
            <div className='min-h-screen flex justify-center py-4'>
                <Loader2 className='animate-spin text-blue-500'/>
            </div>
    )
    }
   
    if(status === "error"){
        <h1>An error occoured.Check your internet connection.</h1>
    }
    return<InfiniteScroll 
        onBottomReached={()=>hasNextPage && !isFetching && fetchNextPage()}
    >
        
        {post.map((post)=>(
            <Posts post={post} key={post.id} />
        ))}
        {isFetchingNextPage && <PostSkeleton/>}
        {isFetched  && !hasNextPage && <HasReachedLastPage/>}
        
    </InfiniteScroll>
}