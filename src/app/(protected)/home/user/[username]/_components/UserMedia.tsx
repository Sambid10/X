"use client"
import { useInfiniteQuery } from '@tanstack/react-query'
import ky from 'ky'
import React, { useState } from 'react'
import InfiniteScroll from '@/components/ui/InfinteScrollContainer/InfiniteScroll'
import { PostPage } from '@/lib/types'
import { Loader2 } from 'lucide-react'
import ImageModal from '@/app/_components/modals/ImageModal'
interface Props {
  userId: string
}
export default function UserMedia({ userId }: Props) {
  const [isImageModalOpen, setImageModalOpen] = useState(false)
  const [currentMedia, setCurrentMedia] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const handleImageModal = (url: string, i: number) => {
    setImageModalOpen((prev) => !prev)
    setCurrentMedia(url)
    setCurrentIndex(i)
  }
  const { isFetchingNextPage, data, hasNextPage, isFetching, fetchNextPage, status } = useInfiniteQuery({
    queryKey: ["media", userId],
    queryFn: ({ pageParam }) => ky.get(`/api/users/${userId}/posts`, pageParam ? { searchParams: { cursor: pageParam } } : {}).json<PostPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (oldpage) => oldpage.nextCursor
  })
  const posts = data?.pages.flatMap((post) => post.posts) || []
  const allAttachments = posts.flatMap((post) => post.attachments) || [];
  if (status === "error") {
    return <h1>Something bad happened.Try agian later</h1>
  }
  if (status === "pending") {
    return (
      <div className='mt-4'>
        <Loader2 className='mx-auto animate-spin text-blue-500' />
      </div>
    )
  }
  return (
    <InfiniteScroll onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
      <div className='p-2'>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[0.35rem]">
        {allAttachments.map((attachment, i) => {
          // Find the corresponding post for the attachment kina vane flatmapped attachments turend into single array ani feri paila direct post bata garyo fuck it explain garna garo vo buja chatgpt bata hai
          const parentPost=posts.find((post)=>
            post.attachments.some((attr)=>attr.url === attachment.url)
          )

          return (
            <React.Fragment key={i}>
              <div className="group cursor-pointer">
                {attachment.type === "IMG" && (
                  <img
                    onClick={() => handleImageModal(attachment.url, i)}
                    className="w-full aspect-square object-cover border border-gray-800"
                    src={attachment.url}
                    alt={`Attachment ${i}`}
                  />
                )}
                {attachment.type === "VID" && (
                  <video
                    className="w-full aspect-square object-contain border border-gray-800"
                    src={attachment.url}
                    controls
                    muted
                    loop
                  />
                )}
              </div>
              {isImageModalOpen && currentIndex === i && parentPost &&(
                <ImageModal
                  open={isImageModalOpen}
                  onClose={() => setImageModalOpen(false)}
                  post={parentPost} // Pass the corresponding post
                  currentMedia={currentMedia}
                  media={allAttachments}
                  currentIndex={currentIndex}
                />
              )}
            </React.Fragment>
          );
        })}

        </div>
      </div>
      {isFetchingNextPage && <Loader2 className='mx-auto animate-spin text-blue-500' />}
    </InfiniteScroll>
  )
}
