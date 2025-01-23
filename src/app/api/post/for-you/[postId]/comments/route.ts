import { db } from "@/lib/db"
import getSession from "@/lib/getSession"
import { CommentsPage, getCommentDataInclude, } from "@/lib/types"
import { NextRequest } from "next/server"
interface props{
    params:{postId:string}
}
export async function GET(req:NextRequest,{params}:props) {
    
    try{
        const {postId}=await params
        const cursor=req.nextUrl.searchParams.get("cursor") || undefined
        const pageSize=5
        const session=await getSession()
        if(!session?.user.id) return Response.json({error:"Unauthirized"},{status:401})
        const comments=await db.comment.findMany({
            where:{
                postId:postId
            },
            include:getCommentDataInclude(session.user.id),
            orderBy:{createdAt:"desc"},
            take:pageSize+1,
            cursor:cursor ? {id:cursor} : undefined
        })
        const nextCursor=comments.length > pageSize ? comments[pageSize].id : null
        const data:CommentsPage={
            comments:comments.slice(0,pageSize),
            nextCursor:nextCursor
        }
        return Response.json(data)
        }catch(error){
        console.log(error)
        return Response.json({error:"Internal Server error"},{status:500})
    }
}