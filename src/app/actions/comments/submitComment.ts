"use server"
import { db } from "@/lib/db";
import getSession from "@/lib/getSession";
import { getCommentDataInclude, PostData } from "@/lib/types";
import { createCommentSchema } from "@/lib/Schema/posts";
interface Props{
    post: PostData,
    content: string,
    mediaIds:string[]
  
}
export const submitComment=async({post,content,mediaIds}:Props)=> {
    try {
        console.log(content)
        const session = await getSession()
        if (!session?.user.id) throw new Error("Unauthorized")
    
        const { content: contentValidated ,mediaIds:mediaValidated} = createCommentSchema.parse({content,mediaIds})
        
        const comment=await db.comment.create({
            data:{
                content:contentValidated,
                postId:post.id,
                userId:session.user.id,
                attachments:{
                    connect:mediaValidated.map(id=>({id}))
                }
            },
            include:getCommentDataInclude(session.user.id)
        })
        return comment
    } catch (err) {
        console.log(err)

    }
}