"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/formatdate";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CommentData, PostData } from "@/lib/types";
import { Media } from "@prisma/client";
import { Loader, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommentsPage } from "@/lib/types";
import LazyLoadVideo from "@/components/LazyLoad";
import ky from "ky";
import { Tooltip } from "recharts";
import { TooltipDemo } from "@/app/_components/UserTootltipInformation";
import { useSession } from "next-auth/react";
export default function ReplyPosts({ post }: {
  post: PostData
}) {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["comments", post.id],
      queryFn: ({ pageParam }) =>
        ky.get(`/api/post/for-you/${post.id}/comments`,pageParam ? {searchParams:{cursor: pageParam}}:{}).json<CommentsPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: (oldPage) => oldPage.nextCursor,
    });

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  return (
    <div className="">
      {status === "pending" && <Loader2 className="mx-auto animate-spin mt-2 text-blue-500" />}
      {status === "success" && !comments.length && (
        <p className="text-center text-gray-200 text-xl font-medium mt-4">No comments yet.</p>
      )}
      {status === "error" && (
        <p className="text-center text-destructive">
          An error occurred while loading comments.
        </p>
      )}

      {comments.map((comment,i) => (
        <div key={i}>
        <Comment  comment={comment}/>
        </div>
      ))}
      {status === "success" && hasNextPage && 
       <button 
       disabled={isFetching}
       onClick={() => fetchNextPage()} className="w-full flex justify-center items-center h-12 hover:bg-[#121212] ease-in duration-200 transition-all">
       <span className="text-blue-500 flex justify-center items-center gap-2">
       
        {isFetching ? <Loader2 className="animate-spin text-blue-500"/> : <h1>See more</h1>}
       
      </span>
     </button>
      }

    </div>
  );
}

const Comment = ({ comment}: {
  comment: CommentData
}) => {
  const session=useSession()
  return (
    <article className="border-b-[1px] border-gray-800 group hover:bg-[#121212] cursor-pointer transition-colors ease-in duration-100">
      <div className="px-6 sm:px-4 pt-5 pb-3 relative">
        <div className="flex gap-3 w-full text-gray-100">
          {/* Profile Image */}
          <div className="w-fit">
            <Link href={`/home/user/${comment.user.displayname}`}>
              <img
                
                src={`${comment.user.image}`} // Fallback for null images
               
                className="rounded-full brightness-90 border border-gray-700 h-11 w-[3.2rem]"
                alt="profile-pic"
              />
            </Link>
          </div>

          {/* Content */}
          <div onClick={(e) => e.stopPropagation()} className="flex flex-col w-[100%] -mt-[4px]">
            <div className="flex gap-2 items-center">
              {/* Username and Displayname */}
              <TooltipDemo user={comment} sessionId={session.data?.user.id}>
              <Link 
                href={`/home/user/${comment.user.displayname}`}
                className="hover:underline underline-offset-2"
              >
                <h1 className="font-semibold text-[1.07rem]">
                  {comment.user.name }
                </h1>
              </Link>
              </TooltipDemo>
             
              <h1 className="font-normal text-[0.89rem] tracking-wider text-gray-400">
                @{comment.user.displayname }
              </h1>

              {/* Timestamp */}
              <h1 className="font-normal ml-[-5px] tracking-wide text-[0.89rem] text-gray-400">
                {formatDate(comment.createdAt)}
              </h1>
            </div>

            {/* Comment Content */}
            <h1 className="font-normal cursor-text text-[1rem] mt-[0.10rem] whitespace-pre-line">
              {comment.content}
            </h1>
            {!!comment.attachments.length && <MediaPreviews attachemnts={comment.attachments}/>}

          </div>
        </div>
      </div>
    </article>
  )
}
interface MediaPreviewsProps {
  attachemnts: Media[]
}
function MediaPreviews({ attachemnts }: MediaPreviewsProps) {
  return (
    <div

      className={cn("flex flex-col gap-2 mt-2  group-hover:bg-black rounded-3xl  overflow-hidden", attachemnts.length && "border border-gray-800", attachemnts.length > 1 && "sm:grid sm:grid-cols-2 ", attachemnts.length === 3 && "sm:grid sm:grid-cols-2 ")}>
      {attachemnts.map(a => (

        <MediaPreview
          key={a.id}
          media={a}
        />
      ))}
    </div>
  )
}
interface MediaPreviewProp {
  media: Media
}
function MediaPreview({ media }: MediaPreviewProp) {

  if (media.type === "IMG") {
    return (

      <Image
        src={media.url}
        alt='Attachment'
        height={400}
        width={400}
        className='mx-auto size-fit max-h-[30rem] '
      />

    )
  } else {
    return (

      <div>
        <LazyLoadVideo videoUrl={media.url} />
      </div>

    )
  }

}