"use client"
import React from 'react'
import { useInfiniteQuery } from "@tanstack/react-query";
import ky from "ky";
import PostSkeleton from "@/components/ui/PostSkeleton";
import InfiniteScroll from "@/components/ui/InfinteScrollContainer/InfiniteScroll";
import Notification from './Notification';
import { Loader2 } from 'lucide-react';
import { NotificationPage } from '@/lib/types';
export default function NotitficationPage() {

    const {
        data,
        status,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
      } = useInfiniteQuery({
        queryKey: ["notification-page"],
        queryFn: ({ pageParam }) =>
          ky
            .get("/api/notification", pageParam ? { searchParams: { cursor: pageParam } } : {})
            .json<NotificationPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastpage) => lastpage.nextCursor,
      });
    
      if (status === "pending") {
        return (
            <div className='min-h-screen flex justify-center items-center w-full'>
            <Loader2 className='animate-spin text-blue-400'/>
    
        </div>
        );
      }
    
      const notification = data?.pages.flatMap((page) => page.notificationData) || [];
    
      if (status === "success" && !notification.length && !hasNextPage) {
        return (
          <div className="flex flex-col gap-2 items-center pt-4 text-muted-foreground">
            <h1 className="text-4xl text-center text-gray-50 font-bold max-w-[30rem]">You don’t have any Notifications yet</h1>
            <p className="px-20 text-center">
              Any Notification you’ll see it here
            </p>
          </div>
        );
      }
    
      if (status === "error") {
        return (
          <p className="text-center text-red-400 mt-4">
            An error occurred while loading bookmarks. Please try again later.
          </p>
        );
      }
    
      return (
        <>
          <InfiniteScroll onBottomReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}>
            {notification.map((notification) => (
              <div key={notification.id}>
                <Notification notification={notification}/>
              </div>
                
            ))}
            {isFetchingNextPage && <PostSkeleton />}
          </InfiniteScroll>
        </>
      );
  
}
