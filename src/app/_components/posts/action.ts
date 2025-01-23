"use server"

import { db } from "@/lib/db"
import getSession from "@/lib/getSession"
import { getPostDataInclude } from "@/lib/types"

export async function DeletePost(id:string){
    try{
        const session=await getSession()
        if(!session?.user.id) throw new Error("Unauthorized")
        const post=await db.post.findUnique({
            where:{
                id
            }
        })
        if(!post) throw new Error ("No Post Found")
        if(session.user.id !== post.userId) throw new Error ("Unauthorized")
        const deletedPost= await db.post.delete({
            where:{
                id:post.id
            },
            include:getPostDataInclude(id)
            
        })
        return deletedPost
    }catch(error){
        console.log(error)
    }
}