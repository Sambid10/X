"use client";
import { PostPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import ky from "ky";
import { Loader2 } from "lucide-react";
import React from "react";
import PostSkeleton from "@/components/ui/PostSkeleton";
import InfiniteScroll from "@/components/ui/InfinteScrollContainer/InfiniteScroll";
import Posts from "@/app/_components/posts/Posts";

export default function BookMarkPage() {
  const {
    data,
    status,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["bookmark-info", "post-feed"],
    queryFn: ({ pageParam }) =>
      ky
        .get("/api/post/for-you/bookmark", pageParam ? { searchParams: { cursor: pageParam } } : {})
        .json<PostPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastpage) => lastpage.nextCursor,
  });

  if (status === "pending") {
    return (
      <>
        <div className='min-h-screen flex justify-center items-center w-full'>
        <Loader2 className='animate-spin text-blue-400'/>

    </div>

      </>
    );
  }

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <div className="flex flex-col gap-2 items-center pt-4 text-muted-foreground">
        <h1 className="text-4xl text-center text-gray-50 font-bold max-w-[30rem]">You don’t have any Bookmarks yet</h1>
        <p className="px-20 text-center">
          Tap the Bookmark on any post to show it some love. When you do, it’ll show up here.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading bookmarks. Please try again later.
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
  );
}
