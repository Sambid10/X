"use client"
import { PostPage } from '@/lib/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import ky from 'ky'
import React from 'react'
import { Loader2, SearchIcon } from 'lucide-react'
import InfiniteScroll from '@/components/ui/InfinteScrollContainer/InfiniteScroll'
import Posts from '@/app/_components/posts/Posts'
import PostSkeleton from '@/components/ui/PostSkeleton'
export default function SearchPostsPage({searchinput}:{
    searchinput:string
}) {
    const {data,isFetching,hasNextPage,status,isFetchingNextPage,fetchNextPage}=useInfiniteQuery({
        queryKey: ["post-feed", "search-post", searchinput],
        queryFn: ({ pageParam }) =>
            ky
              .get("/api/search", {
                searchParams: {
                  search: searchinput,
                  ...(pageParam ? { cursor: pageParam } : {}),
                },
              })
              .json<PostPage>(),
        initialPageParam:null as string | null,
        getNextPageParam:(oldPage)=>oldPage.nextCursor

    })
    if (status === "pending") {
        return (
          <>
            <div className='min-h-screen flex justify-center items-baseline w-full'>
            <Loader2 className='animate-spin text-blue-400 mt-4'/>
    
        </div>
    
          </>
        );
      }
    
      const posts = data?.pages.flatMap((page) => page.posts) || [];
    
      if (status === "success" && !posts.length && !hasNextPage) {
        return (
          <div className="flex flex-col gap-2 items-center pt-4 text-muted-foreground">
            <h1 className="text-4xl text-center text-gray-50 font-bold max-w-[30rem] gap-4 flex items-center"><SearchIcon/> No Post Found</h1>
            <p className="px-20 text-center">
            Sorry, we couldn’t find any posts matching your search. Try searching for something else.
            </p>
          </div>
        );
      }
    
      if (status === "error") {
        return (
          <p className="text-center text-destructive">
            An error occurred while loading your result. Please try again later.
          </p>
        );
      }
    
      return (
        <>
          <InfiniteScroll onBottomReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}>
            {posts.map((post) => (
              <span key={post.id}>
                <Posts post={post} />
              </span>
            ))}
            {isFetchingNextPage && <PostSkeleton />}
          </InfiniteScroll>
        </>
      )
}
