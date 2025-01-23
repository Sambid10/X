"use client"
import { formatDate } from '@/lib/formatdate'
import { BookmarkInfo, LikeInfo, PostData } from '@/lib/types'
import { useSession } from 'next-auth/react'
import ImageModal from '@/app/_components/modals/ImageModal'
import Image from 'next/image'
interface Props {
  post: PostData
  showMedia?: boolean
  showInteractions?: boolean
}
import Link from 'next/link'
import React, { useState } from 'react'
import ExtendedPostComponent from '@/app/_components/posts/ExtendedPostComponent'
import { Linkify } from '@/app/_components/Linkify'
import { TooltipDemo } from '@/app/_components/UserTootltipInformation'
import LikeButton from '@/app/_components/posts/components/LikeButton'
import BookmarkButton from '@/app/_components/posts/components/BookmarkButton'
import CommentButton from '@/app/_components/posts/components/Comments'
import ReTweetButton from '@/app/_components/posts/components/ReTweet'
import { ImageCarousel } from '@/app/_components/posts/ImageCarsoul'
import { Media } from '@prisma/client'
import { cn } from '@/lib/utils'
import LazyLoadVideo from '@/components/LazyLoad'
import ShareButton from '@/app/_components/posts/components/ShareButton'
import { useRouter } from 'next/navigation'
export default function RetweedPosts({ post, showMedia = true, showInteractions = true }: Props) {
  const session = useSession()
  const router = useRouter()
  const likedata: LikeInfo = {
    likes: post._count.like,
    isLikedbyUser: post.like.some((like) => like.userId === session.data?.user.id)
  }
  const BookmarkData: BookmarkInfo = {
    bookmarks: post._count.Bookmark,
    isBookmarkedbyuser: post.Bookmark.some((bookmark) => bookmark.userId === session.data?.user.id)
  }
  const [isExpanded, setisExpaned] = useState<boolean>(false)

  const maxcharacters = 250
  const LinkPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/home/post/${post.id}`);

  }

  const handleTrunckatedContent = () => {
    setisExpaned((prev) => !prev)
  }
  const tunckatedContent = post.content.length > maxcharacters && !isExpanded ? post.content.slice(0, maxcharacters) + "......" : post.content
  return (
    <>
    <h1>{post.user.displayname} reposted</h1>
      <article
        onClick={LinkPost}
        className=' border-b-[1px] border-gray-800 group hover:bg-[#080808] cursor-pointer transition-colors ease-in duration-100'>
        <div className=' px-6 sm:px-4 pt-5 pb-3 relative'>
          <div className='flex gap-2 w-full text-gray-100'>
            <div className='w-fit'>
              <Link
                href={`/home/user/${post.user.displayname}`}>
                <Image
                  fetchPriority='high'
                  src={post.user.image!}
                  height={45}
                  width={45}

                  className='rounded-full brightness-90 border border-gray-700'
                  alt='profile-pic'
                />

              </Link>

            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className='flex flex-col w-[100%] -mt-[4px]'>
              <div className='flex gap-2 items-center'>
                <TooltipDemo user={post} sessionId={session.data?.user.id}>
                  <Link
                    onClick={(e) => e.stopPropagation()}

                    href={`/home/user/${post.user.displayname}`} className='hover:underline underline-offset-2 '>
                    <h1 className='font-semibold text-[1.07rem]'>{post.user.name}</h1>
                  </Link>
                </TooltipDemo>

                <h1 className='font-normal text-[0.89rem] tracking-wider text-gray-400'>@{post.user.displayname}</h1>


                <h1 className='font-normal ml-[-5px] tracking-wide text-[0.89rem] text-gray-400'>{formatDate(post.createdAt)}</h1>
                {session.data?.user.id === post.userId &&

                  <ExtendedPostComponent post={post} />

                }
              </div>
              <Linkify>
                <h1
                  className=' font-normal  cursor-text  text-[1rem] mt-[-0.2rem] whitespace-pre-line'>
                  {tunckatedContent}

                </h1>
                {post.content.length > maxcharacters &&
                  <button
                    className='mr-auto mt-1 text-[0.95rem] text-blue-500 hover:underline'
                    onClick={handleTrunckatedContent}
                  >
                    {isExpanded ? <h1>See Less</h1> : <h1>See More</h1>}
                  </button>
                }


              </Linkify>

              {!!post.attachments.length && showMedia &&

                <MediaPreviews post={post} attachemnts={post.attachments}
                />

              }

              {showInteractions &&
                <div className='flex justify-between mt-[0.5rem] px-4 text-gray-400'>

                 

                  <CommentButton postcontent={post} />
                  <ReTweetButton postcontent={post}/>
                  <LikeButton postID={post.id} LikeData={likedata} />
                  <div className='flex items-center'>
                    <BookmarkButton postId={post.id} BookmarkData={BookmarkData} />
                    <ShareButton postId={post.id} />
                  </div>

                </div>
              }
            </div>
          </div>
        </div>
      </article></>



  )
}
// for a grid layout css used previous before carasoul  
// attachemnts.length && "border border-gray-800", attachemnts.length > 1 && "sm:grid sm:grid-cols-2 min-h-60", attachemnts.length === 3 && "sm:grid sm:grid-cols-2 "
interface MediaPreviewsProps {
  attachemnts: Media[]
  post: PostData
}
function MediaPreviews({ attachemnts, post }: MediaPreviewsProps) {
  const [imageModal, setImageModal] = useState(false)
  const [currentmediaUrl,setMediaId]=useState("")
  const [currentIndex,setCurrentIndex]=useState(0)
  const handleClickImage = (i:number,media:string) => {
      setImageModal(true)
     setCurrentIndex(i)
     setMediaId(media)
    
  }
 
  return (
    <div className="relative rounded-2xl  mt-[0.5rem]">
      
      <ImageCarousel
    
      totalItems={attachemnts.length}
      currentIndex={currentIndex}
      >
        {attachemnts.map((media,i) => {
         
          if (media.type === "IMG") {
            return (
              <div className='relative h-full' key={i}>
                <img
                src={media.url}
                alt="Attachment"
                className="object-cover w-fit h-full max-h-[35rem] rounded-2xl border-gray-600 border m-auto"
                onClick={()=>handleClickImage(i,media.url)}
              />
              </div>
             
            )
          } else if (media.type === "VID") {
            return (
              <LazyLoadVideo videoUrl={media.url} key={i}>
              
              </LazyLoadVideo>
             
            )
          }
        })}
      </ImageCarousel>
      {imageModal && (
        <ImageModal
          post={post}
          open={imageModal}
          onClose={setImageModal}
          currentMedia={currentmediaUrl}
          currentIndex={currentIndex}
          media={attachemnts} // Or your desired media to show in the modal
        />
      )}
    </div>
  )
}

// interface MediaPreviewProp {
//   media: Media
//   post: PostData
// }

// function MediaPreview({ media, post }: MediaPreviewProp) {
//   const [imagemodal, setImageModal] = useState(false)
//   const onClickImage = () => {
//     setImageModal(true)
//   }
//   if (media.type === "IMG") {
//     return (
//       <div className='relative'>
      
//           <Image
//             onClick={onClickImage}
//             src={media.url}
//             alt='Attachment'
//             height={400}
//             width={400}
//             className='mx-auto size-full object-cover max-h-[40rem] '
//           />
       

//         {imagemodal && <ImageModal post={post} media={media} open={imagemodal} onClose={setImageModal} />}
//       </div>


//     )
//   } else {
//     return (

//       <div>
//         <LazyLoadVideo videoUrl={media.url} />
//       </div>

//     )
//   }

// }