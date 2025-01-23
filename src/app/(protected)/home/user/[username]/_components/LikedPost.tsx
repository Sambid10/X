import { PostPage } from '@/lib/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import ky from 'ky'
import React from 'react'
import PostSkeleton from '@/components/ui/PostSkeleton'
import InfiniteScroll from '@/components/ui/InfinteScrollContainer/InfiniteScroll'
import Posts from '@/app/_components/posts/Posts'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
export default function LikedPost({userId}:{
    userId:string
}) {
    const session=useSession()
    const {data,status,hasNextPage,isFetchingNextPage,fetchNextPage}=useInfiniteQuery({
        queryKey:["post-feed","for-you","liked-post"],
        queryFn:({pageParam})=>ky.get("/api/post/likes",pageParam ? {searchParams:{cursor:pageParam}} : {}).json<PostPage>(),
        initialPageParam:null as string | null,
        getNextPageParam:(oldPage)=>oldPage.nextCursor
    })
    if (status === "pending") {
        return (
          <div className='mt-4'>
          <Loader2 className='mx-auto animate-spin text-blue-500' />
        </div>
        )
    }
    const posts=data?.pages.flatMap((post)=>post.posts) || []
    if(!posts?.length && status === "success" && !hasNextPage){
        return (
            <div className="flex flex-col gap-2 items-center pt-4 text-muted-foreground">
              <h1 className='text-4xl text-center text-gray-50 font-bold max-w-[30rem]'>You haven't liked any post's yet</h1>
              <p className='px-20 text-center'>Tap the Like Button on any post to show it some love. When you do, it’ll show up here.</p>
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
      if(userId !== session.data?.user.id ) return null
      return <InfiniteScroll
      onBottomReached={()=>hasNextPage && !isFetchingNextPage && fetchNextPage()}
      >
         {posts.map((post)=>(
                <span key={post.id}>
                     <Posts post={post}/>
                </span>
               
            ))}
            {isFetchingNextPage && <PostSkeleton/>}
      </InfiniteScroll>
}
