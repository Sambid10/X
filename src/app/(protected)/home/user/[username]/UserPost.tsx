"use client"
import { PostPage } from '@/lib/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Loader2 } from 'lucide-react'
import InfiniteScroll from '@/components/ui/InfinteScrollContainer/InfiniteScroll'
import React from 'react'
import Posts from '@/app/_components/posts/Posts'
import PostSkeleton from '@/components/ui/PostSkeleton'
interface Props {
  userId: string
}
export default function UserPost({ userId }: Props) {
  const { isFetchingNextPage, data, hasNextPage, isFetching, fetchNextPage, status } = useInfiniteQuery({
    queryKey: ["post-feed", "user-posts", userId],
    queryFn: ({ pageParam }) => ky.get(`/api/users/${userId}/posts`,
      pageParam ? { searchParams: { cursor: pageParam } } : {}
    ).json<PostPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastpage) => lastpage.nextCursor
  })
  const posts = data?.pages.flatMap((page) => page.posts) || []
  if(status === "error"){
    return <h1>Something bad happened.Try agian later</h1>
  }
  if(status === "pending"){
    return (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton /></>
    )
  }
  return (
    <InfiniteScroll
    
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <PostSkeleton/>}
    </InfiniteScroll>
  )
}
