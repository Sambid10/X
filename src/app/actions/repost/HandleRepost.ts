"use server"
import { db } from "@/lib/db"
import getSession from "@/lib/getSession"
import { getPostDataInclude } from "@/lib/types"

export const HandleRepost=async(postId:string)=>{
    console.log(postId)
    try{
        const session=await getSession()
        if(!session?.user.id) throw new Error("Unauthorized")
        const respostedpost= await db.repost.upsert({
         where:{
            userId_postId:{
                userId:session.user.id,
                postId:postId
            }
         },
         create:{
            userId:session.user.id,
            postId:postId
         },
         update:{},
         include:getPostDataInclude(session.user.id)
        })
        return respostedpost
    }catch(err){
        console.log(err)
    }
}