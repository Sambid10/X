import { db } from "@/lib/db";
import getSession from "@/lib/getSession";
import { getPostDataInclude, PostData, PostPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    try{
        const session=await getSession()
        if(!session?.user.id) return Response.json({error:"Unauthorized"},{status:401})
        const cursor=req.nextUrl.searchParams.get("cursor") || undefined
        const pageSize=10
        const bookmarkedpost=await db.bookmarks.findMany({
            where:{
                userId:session.user.id
            },
            include:{
                post:{
                    include:getPostDataInclude(session.user.id)
                }
            },
            take:pageSize+1 ,
           cursor:cursor ? {id:cursor} : undefined
        })
        const nextCursor=bookmarkedpost.length > pageSize ? bookmarkedpost[pageSize].id : null
        const data:PostPage={
            nextCursor:nextCursor,
            posts:bookmarkedpost.slice(0,pageSize).map((bookmark)=>bookmark.post)
        }
        return Response.json(data)
    }catch(error){
        console.log(error)
        return Response.json({error:"Server error"},{status:500})
    }
}