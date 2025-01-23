import { db } from "@/lib/db"
import getSession from "@/lib/getSession"
import { getPostDataInclude, PostPage } from "@/lib/types"
import { NextRequest } from "next/server"

export async function GET(req:NextRequest) {
    try{
        const cursor=req.nextUrl.searchParams.get("cursor") || undefined
        const pageSize=10
        const session=await getSession()
        if(!session?.user.id) return Response.json({error:"Unauthirized"},{status:401})
        const post=await db.post.findMany({
            include:getPostDataInclude(session.user.id),
            orderBy:{createdAt:"desc"},
            take:pageSize+1,
            cursor:cursor ? {id:cursor} : undefined
        })
       
        const nextCursor=post.length > pageSize ? post[pageSize].id : null
        const data:PostPage={
            posts:post.slice(0,pageSize),
            nextCursor:nextCursor
        }
        return Response.json(data)
        }catch(error){
        console.log(error)
        return Response.json({error:"Internal Server error"},{status:500})
    }
}