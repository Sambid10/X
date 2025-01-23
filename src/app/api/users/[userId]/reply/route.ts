import { db } from "@/lib/db"
import getSession from "@/lib/getSession"
import { CommentsPage, getCommentDataInclude, getPostDataInclude } from "@/lib/types"
import { da } from "date-fns/locale"
import { NextRequest } from "next/server"

interface Props{
    params:{userId:string}
}
export async function GET(req:NextRequest,{params}:Props){
    try {
        const session=await getSession()
        const {userId}=await params
        const cursor=req.nextUrl.searchParams.get("cursor") || undefined
        const pagesize=10
        if(!session?.user.id) return Response.json({error:"Sorry not authorized"},{status:401})
        const replies=await db.comment.findMany({
            where:{
                userId:userId
            },
            include:getCommentDataInclude(session.user.id),
            take:pagesize + 1,
            cursor:cursor ? {id:cursor} : undefined,  
        })
        const nextCursor=replies.length > pagesize ? replies[pagesize].id : null
        const data:CommentsPage={
            comments:replies.slice(0,pagesize),
            nextCursor:nextCursor
        }
        return Response.json(data)
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}