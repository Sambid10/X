import { db } from "@/lib/db"
import getSession from "@/lib/getSession"
import { BookmarkInfo, getPostDataInclude } from "@/lib/types"
import { NextRequest } from "next/server"

interface BookmarkProps{
    params:{postId:string},
}
export async function GET(req:NextRequest,{params}:BookmarkProps) {
    try{
        const {postId} =await params
        const session=await getSession()
        if(!session?.user.id) return Response.json({error:"Unauthorized"},{status:401})
        const bookmarkpost=await db.post.findUnique({
           where:{
            id:postId
           },
           select:{
                Bookmark:{
                    where:{
                        userId:session.user.id
                    },
                    select:{
                        userId:true
                    }
                },
                _count:{
                    select:{
                        Bookmark:true
                    }
                }
           }

        })
        if(!bookmarkpost) return Response.json({error:"No Bookmarked Post found"},{status:404})
        const data:BookmarkInfo={
            bookmarks:bookmarkpost._count.Bookmark,
            isBookmarkedbyuser:!!bookmarkpost.Bookmark.length
        }
        return  Response.json(data)
    }catch(error){
        console.log(error)
        return Response.json({ err: "Internal Server Error" }, { status: 401 })
    }
        
}



export async function POST(req:NextRequest,{params}:BookmarkProps) {
    try{
        const {postId} =await params
        const session=await getSession()
        if(!session?.user.id) return Response.json({error:"Unauthorized"},{status:401})
        const data= await db.bookmarks.upsert({
            where:{
                userId_postId:{
                    userId:session.user.id,
                    postId:postId
                }
            },
            create:{
                postId:postId,
                userId:session.user.id
            },
            update:{},
        })
        return new Response()
    }catch(error){
        console.log(error)
        return Response.json({ err: "Internal Server Error" }, { status: 401 })
    }
        
}

export async function DELETE(req:NextRequest,{params}:BookmarkProps) {
    try{
        const {postId} =await params
        const session=await getSession()
        if(!session?.user.id) return Response.json({error:"Unauthorized"},{status:401})
        await db.bookmarks.deleteMany({
            where:{
                userId:session.user.id,
                postId:postId
            }
        })
        return new Response()
    }catch(error){
        console.log(error)
        return Response.json({ err: "Internal Server Error" }, { status: 401 })
    }
        
}