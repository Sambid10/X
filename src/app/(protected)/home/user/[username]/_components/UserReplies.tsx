import { CommentsPage, PostPage } from '@/lib/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import ky from 'ky'
import React from 'react'
import PostSkeleton from '@/components/ui/PostSkeleton'
import InfiniteScroll from '@/components/ui/InfinteScrollContainer/InfiniteScroll'
import Posts from '@/app/_components/posts/Posts'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import UsersComment from './UserComment'
export default function UserReplies({userId}:{
    userId:string
}) {
    const session=useSession()
    const {data,status,hasNextPage,isFetchingNextPage,fetchNextPage}=useInfiniteQuery({
        queryKey:["post-feed","for-you","liked-post"],
        queryFn:({pageParam})=>ky.get(`/api/users/${userId}/reply`,pageParam ? {searchParams:{cursor:pageParam}} : {}).json<CommentsPage>(),
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
    const comments=data?.pages.flatMap((comment)=>comment.comments) || []
    if(!comments?.length && status === "success" && !hasNextPage){
        return (
            <div className="flex flex-col gap-2 items-center pt-4 text-muted-foreground">
              <h1 className='text-4xl text-center text-gray-50 font-bold max-w-[30rem]'>No Replies yet..</h1>
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
         {comments.map((comment)=>(
                <span key={comment.id}>
                        <UsersComment comment={comment}/>
                </span>
               
            ))}
            {isFetchingNextPage && <PostSkeleton/>}
      </InfiniteScroll>
}
