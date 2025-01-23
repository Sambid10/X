import { CommentData } from '@/lib/types'
import { Comment } from 'postcss'
import React from 'react'

export default function UsersComment({comment}:{
    comment:CommentData
}) {
  return (
    <article>
        {comment.content}
    </article>
  )
}
