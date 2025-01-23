"use server"
import { db } from "@/lib/db";
import { getPostDataInclude, PostData, PostPage } from "@/lib/types";
import getSession from "@/lib/getSession";
import { NextRequest } from "next/server";


export async function GET(req:NextRequest){
    try{
    const session=await getSession()
    if(!session?.user.id) return Response.json({error:"Unauthorized"},{status:401})
    const pageSize=10
    const search=req.nextUrl.searchParams.get("search") || " "
    const cursor=req.nextUrl.searchParams.get("cursor") || undefined
    const searchinput=search.split(" ").join(" & ")
    
    const posts = await db.post.findMany({
      where: {
          OR: [
              // Full-text search
              {
                  content: {
                      search: searchinput,
                      mode: "insensitive",
                  },
              },
              {
                  user: {
                      displayname: {
                          search: searchinput,
                          mode: "insensitive",
                      },
                  },
              },
              {
                  user: {
                      name: {
                          search: searchinput,
                          mode: "insensitive",
                      },
                  },
              },
              // Substring matching
              {
                  content: {
                      contains: searchinput,
                      mode: "insensitive",
                  },
              },
              {
                  user: {
                      displayname: {
                          contains: searchinput,
                          mode: "insensitive",
                      },
                  },
              },
              {
                  user: {
                      name: {
                          contains: searchinput,
                          mode: "insensitive",
                      },
                  },
              },
          ],
      },
      include: getPostDataInclude(session.user.id),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
  });
  
      const nextcurosr=posts.length > pageSize ? posts[pageSize].id : null
     
      const data:PostPage={
        nextCursor:nextcurosr,
        posts:posts.slice(0,pageSize)
      }
      return Response.json(data)
    }catch(err){
        console.log(err)
        return Response.json({ error: "Server Error" }, { status: 501 })
    }
}