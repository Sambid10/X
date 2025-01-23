"use client"
import InfiniteScroll from '@/components/ui/InfinteScrollContainer/InfiniteScroll'
import PostSkeleton from '@/components/ui/PostSkeleton'
import { PostPage } from '@/lib/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import ky from 'ky'
import React from 'react'
import { Loader2 } from 'lucide-react'
import Posts from '@/app/_components/posts/Posts'
export default function FollowingPage() {
    const { data, isFetching, hasNextPage, status, isFetchingNextPage,fetchNextPage } = useInfiniteQuery({
        queryKey: ["post-feed", "following-page"],
        queryFn: ({ pageParam }) => ky.get("/api/post/following", pageParam ? { searchParams: { cursor: pageParam } } : {}).json<PostPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (oldPage) => oldPage.nextCursor
    })
    if (status === "pending") {
        return (
          <div className='min-h-screen flex justify-center py-4'>
          <Loader2 className='animate-spin text-blue-500'/>
      </div>

        )
    }
    const posts=data?.pages.flatMap((post)=>post.posts) || []
    if(status === "success" && !posts.length && !hasNextPage){
        return (
            <div className="flex flex-col gap-2 items-center pt-4 text-muted-foreground min-h-screen">
              <h1 className='text-4xl text-center text-gray-50 font-bold max-w-[30rem]'>You are not following anyone.</h1>
              <p className='px-20 text-center'>No Post found.Tap the Follow button on any user to follow someone and see their posts..</p>
            </div>
          );
    }
    if (status === "error") {
        return (
          <p className="text-center text-destructive">
            An error occurred while loading bookmarks.
          </p>
        );
      }
    return (
        <InfiniteScroll
        onBottomReached={()=>hasNextPage && !isFetchingNextPage && fetchNextPage()}
        >
             {posts.map((post)=>(
                <span key={post.id}>
                     <Posts post={post}/>
                </span>
               
            ))}
            {isFetchingNextPage && <PostSkeleton/>}
        </InfiniteScroll>
    )
}
