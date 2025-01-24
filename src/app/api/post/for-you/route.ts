import { db } from "@/lib/db"
import getSession from "@/lib/getSession"
import { getPostDataInclude, PostPage } from "@/lib/types"
import { NextRequest } from "next/server"
export async function GET(req:NextRequest){
    try{

        const session=await getSession()
        if(!session?.user.id)  return Response.json({error:"Unauthorzied"},{status:401})
        const pageSize=10
        const cursor=req.nextUrl.searchParams.get("cursor") || undefined
        const followingPost=await db.post.findMany({
           include:getPostDataInclude(session.user.id),
           take:pageSize+1,
           cursor:cursor ? {id:cursor} : undefined,
           orderBy:{
            createdAt:"desc"
           }
        })
        const nextcusror=followingPost.length > pageSize ? followingPost[pageSize].id : null
        const data:PostPage={
            nextCursor:nextcusror,
            posts:followingPost.slice(0,pageSize)
        }
        return Response.json(data)
    }catch(err){
        console.log(err)
        return Response.json({error:"Server Error"},{status:501})
    }
}