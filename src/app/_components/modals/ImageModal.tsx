import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { ModalCarousel } from "./ModalCarsoul"; // Adjust path to your carousel component
import LikeButton from "../posts/components/LikeButton";
import BookmarkButton from "../posts/components/BookmarkButton";
import CommentButton from "../posts/components/Comments";
import ReTweetButton from "../posts/components/ReTweet";
import ShareButton from "../posts/components/ShareButton";
import { BookmarkInfo } from "@/lib/types";
import { Media } from "@prisma/client";
import { LikeInfo } from "@/lib/types";
import { X } from "lucide-react";
import ReplyPosts from "@/app/(protected)/home/post/[postId]/ReplyPosts";
import { PostData } from "@/lib/types";
import Posts from "../posts/Posts";
import CommentEditor from "../posts/editor/CommentPostEditor";
import { useSession } from "next-auth/react";

interface Props {
  media: Media[];
  open: boolean;
  currentIndex: number;
  onClose: (open: boolean) => void;
  post: PostData;
  currentMedia:string
}

export default function ImageModal({
  open,
  onClose,
  media,
  post,
currentMedia,
  currentIndex,
}: Props) {
  const session = useSession();
  const likedata: LikeInfo = {
    likes: post._count.like,
    isLikedbyUser: post.like.some((like) => like.userId === session.data?.user.id),
  };
  const BookmarkData: BookmarkInfo = {
    bookmarks: post._count.Bookmark,
    isBookmarkedbyuser: post.Bookmark.some((bookmark) => bookmark.userId === session.data?.user.id),
  };
 
  
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="fixed z-50 w-[100vw] min-h-screen p-0 border-none bg-black/60 m-0">
        <AlertDialogHeader className="hidden">
          <AlertDialogTitle className="sr-only hidden"></AlertDialogTitle>
          <AlertDialogDescription className="sr-only hidden">
            Description of the image
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="h-[100svh] px-2 flex bg-black/60">
          {/* Image Section */}
          <div className="w-[80%] min-h-[100vh] sticky top-0 flex flex-col ">
            <div className="relative h-full flex flex-col ">
              <ModalCarousel
              totalItems={media.length}
              currentIndex={currentIndex}>
                {media.map((item, i) => (
                  <div key={i} className="relative h-full">
                    {item.type === "IMG" && (
                      <img
                        src={currentMedia}
                        alt={`Attachment ${i + 1}`}
                        className="object-contain w-fit h-[90vh] m-auto rounded-2xl"
                      
                      />
                    ) }
                  </div>
                ))}
              </ModalCarousel>
              <div className="flex justify-center items-center gap-20 w-full mt-[0.5rem] px-4 text-gray-400">
                <LikeButton
                  postID={post.id}
                  LikeData={likedata}
                  className="h-[1.8rem] w-[1.8rem] text-[1.2rem]"
                />
                <CommentButton
                  postcontent={post}
                  className="h-[1.68rem] w-[1.8rem] text-[1.2rem] mt-0"
                />
                <ReTweetButton postcontent={post} className="h-[1.8rem] w-[1.8rem]" />
                <div className="flex items-center">
                  <BookmarkButton
                    postId={post.id}
                    BookmarkData={BookmarkData}
                    className="h-[1.8rem] w-[1.8rem]"
                  />
                  <ShareButton postId={post.id} className="h-[1.8rem] w-[1.8rem]" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-[30%] bg-[#000] border-l h-[100vh] border-gray-600 flex flex-col overflow-y-auto">
            <Posts showMedia={false} post={post} />
            <div className="px-4 border-b border-gray-800">
              <CommentEditor postId={post.id} postContent={post} />
            </div>
            <ReplyPosts post={post} />
          </div>

          <AlertDialogCancel
            asChild
            className="absolute top-2 left-2 border-gray-800 h-12 w-12 bg-[#121212] text-[#fff] rounded-full flex justify-center items-center"
          >
            <button>
              <X />
            </button>
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
