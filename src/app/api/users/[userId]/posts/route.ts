
import { db } from "@/lib/db"
import getSession from "@/lib/getSession"
import { getPostDataInclude, PostPage } from "@/lib/types"

import { NextRequest } from "next/server"

interface Props {
    params:{userId:string}
}
export async function GET(req:NextRequest,{params}:Props){
    try {
        const session=await getSession()
        const cursor=req.nextUrl.searchParams.get("cursor")
        const pageSize=10
        const {userId}=await params
        if(!session?.user.id) return Response.json({error:"Unauthorized"},{status:401})
        
        const posts=await db.post.findMany({
            where:{
                userId
            },
            include:getPostDataInclude(userId),
            take:pageSize + 1,
            cursor:cursor ? {id:cursor} : undefined,
            orderBy:{
                createdAt:"desc"
            }
        })
        const nextCursor=posts.length > pageSize ? posts[pageSize].id : null
        const data:PostPage={
            posts:posts.slice(0,pageSize),
            nextCursor
        } 
        return Response.json(data)
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}