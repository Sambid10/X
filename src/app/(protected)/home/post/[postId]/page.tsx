
import React from 'react'
import { cache } from "react"
import { db } from '@/lib/db'
import {  getPostDataInclude, } from '@/lib/types'
import getSession from '@/lib/getSession'
import Posts from '@/app/_components/posts/Posts'
import { notFound } from 'next/navigation'
import ReplyPosts from './ReplyPosts'
interface PropsPage {
  params: { postId: string }
}

import BackButton from '@/app/_components/BackButton'
import CommentEditor from '@/app/_components/posts/editor/CommentPostEditor'

const IndividualPosts = cache(async (postId: string, loggedinUserID: string) => {
  const post = await db.post.findUnique({
    where: {
      id: postId
    },
    include: getPostDataInclude(loggedinUserID)
  })
  if (!post) notFound()
  return post
})

export default async function page({ params }: PropsPage) {
  const session = await getSession()
  if (!session?.user.id) return
  const { postId } = await params
  const indiviualpost = await IndividualPosts(postId, session.user.id)

  return (
    <>
      <div>
        <div className='border-b sticky top-0 backdrop-blur-lg z-40 pt-4 bg-black border-gray-600 flex gap-2 items-center py-3 px-2 '>
         
            <BackButton />
         

          <div className='flex flex-col'>
            <h1
              style={{ lineHeight: "100%" }}
              className='text-gray-200 text-[1.3rem] font-bold mb-1'>
              Post
            </h1>
          </div>
        </div>
        <Posts post={indiviualpost} />
        <div className='px-6 border-b border-gray-800'>
          <CommentEditor postContent={indiviualpost} postId={postId}/>
        </div>
          <ReplyPosts post={indiviualpost}/>
          <div className='h-20'/>
    </div >
    </>
  )
}
