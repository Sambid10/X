"use client"
import { PostPage, UserPage } from '@/lib/types'
import SearchedUserProfile from './SearchedUserProfile'
import { useInfiniteQuery } from '@tanstack/react-query'
import ky from 'ky'
import React from 'react'
import { Loader2, SearchIcon, Users } from 'lucide-react'
export default function SearchUsersPage({ searchinput }: {
  searchinput: string
}) {
  const { data, isFetching, hasNextPage, status, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["post-feed", "search-user", searchinput],
    queryFn: ({ pageParam }) =>
      ky
        .get("/api/searchuser", {
          searchParams: {
            search: searchinput,
            ...(pageParam ? { cursor: pageParam } : {}),
          },
        })
        .json<UserPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (oldPage) => oldPage.nextCursor

  })
  if (status === "pending") {
    return (
      <>
        <div className='min-h-screen flex justify-center items-baseline w-full'>
          <Loader2 className='animate-spin text-blue-400 mt-4' />

        </div>

      </>
    );
  }

  const users = data?.pages.flatMap((page) => page.users) || [];
  if (status === "success" && !users.length && !hasNextPage) {
    return (
      <div className="flex flex-col gap-2 items-center pt-4 text-muted-foreground">
        <h1 className="text-4xl text-center text-gray-50 font-bold max-w-[30rem] gap-4 flex items-center"><SearchIcon /> No User Found</h1>
        <p className="px-20 text-center">
          Sorry, we couldn’t find any user's matching your search. Try searching for something else.
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
  return(
    <>
      {users.map((user) => (
      <div key={user.id}>
        <SearchedUserProfile user={user}/>
      </div>
      
    ))
  }
  {
    status === "success" && hasNextPage &&
    <button
      disabled={isFetching}
      onClick={() => fetchNextPage()} className="w-full flex justify-center items-center h-12 hover:bg-[#121212] ease-in duration-200 transition-all">
      <span className="text-blue-500 flex justify-center items-center gap-2">

        {isFetching ? <Loader2 className="animate-spin text-blue-500" /> : <h1>See more</h1>}

      </span>
    </button>
  }
    </>
  )
}
