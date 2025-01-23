"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { createPostSchema } from "@/lib/Schema/posts"
import { getPostDataInclude } from "@/lib/types"


export const SubmitPost=async(input:{
    content:string,
    mediaIds:string[]
})=>{
    const session=await auth()
    if(!session?.user) throw new Error("Unauthorized")
    const {content,mediaIds} =createPostSchema.parse(input)
    const post= await db.post.create({
        data:{
            userId:session.user.id!,
            content:content,
            attachments:{
                connect:mediaIds.map(id=>({id}))
            },
          
        },
        include:getPostDataInclude(session.user.id!)
    })
    return post
}