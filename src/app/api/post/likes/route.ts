import { db } from "@/lib/db"
import getSession from "@/lib/getSession"
import { getPostDataInclude, LikeInfo, PostPage } from "@/lib/types"
import { NextRequest } from "next/server"
export async function GET(req: NextRequest) {
    try {
        const session = await getSession()
        if (!session?.user.id) return Response.json({ error: "Unauthorized" }, { status: 401 })
        const pageSize = 10
        const cursor = req.nextUrl.searchParams.get("cursor") || undefined
        const likedPost = await db.like.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                post: {
                    include: getPostDataInclude(session.user.id),
                },                
            },
           
            take: pageSize + 1,
            cursor: cursor ? { id: cursor } : undefined
        })
        const nextCursor = likedPost.length > pageSize ? likedPost[pageSize].postId : null
        const data: PostPage = {
            nextCursor: nextCursor,
            posts: likedPost.slice(0, pageSize).map((likedpost) => likedpost.post)
        }
        return Response.json(data)
    } catch (err) {
        console.log(err)
        return Response.json({ error: "Server Error" }, { status: 501 })
    }
}