import { db } from "@/lib/db"
import getSession from "@/lib/getSession"
import { LikeInfo } from "@/lib/types"
import { error } from "console"
import { NextRequest } from "next/server"

interface Params {
    params: { postId: string }
}
export async function GET(req: Request, { params }: Params) {
    try {
        const { postId } = await params
        const session = await getSession()
        if (!session?.user.id) return Response.json({ error: "Unauthorized" }, { status: 401 })
        const post = await db.post.findUnique({
            where: {
                id: postId
            },
            select: {
                like: {
                    where: {
                        userId: session.user.id
                    },
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        like: true,
                    }
                }
            }

        })
        if (!post) {
            return Response.json({ error: "Post not Found" }, { status: 404 })
        }
        const data: LikeInfo = {
            likes: post._count.like,
            isLikedbyUser: !!post.like.length
        }
        return Response.json(data)
    } catch (err) {
        console.log(err)
        return Response.json({ message: "Internal Server Error" }, { status: 401 })
    }
}

export async function POST(req: NextRequest, { params }: Params) {
    try {
        const { postId } = await params
        const session = await getSession()
        if (!session?.user.id) return Response.json({ error: "Unauthorized" }, { status: 401 })
        const post = await db.post.findUnique({
            where: {
                id: postId
            },
            select: {
                userId: true,
            }
        })
        if (!post) {
            return Response.json({ error: "Post not found" }, { status: 404 });

        }
        await db.$transaction([
            db.like.upsert({
                where: {
                    userId_postId: {
                        postId: postId,
                        userId: session.user.id
                    }
                },
                create: {
                    userId: session.user.id,
                    postId: postId,
                },
                update: {}
            }),
            ...(session.user.id !== post.userId) ? [
                db.notification.create({
                    data:{
                        issuerId:session.user.id,
                        recipientID:post.userId,
                        postId,
                        type:"LIKE"
                    }
                })
            ] :[]
        ])
       
        return new Response()
    } catch (err) {
        console.log(err)
        return Response.json({ err: "Internal Server Error" }, { status: 401 })
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    try {
        const { postId } = await params
        const session = await getSession()
        if (!session?.user.id) return Response.json({ error: "Unauthorized" }, { status: 401 })
            const post = await db.post.findUnique({
                where: {
                    id: postId
                },
                select: {
                    userId: true,
                }
            })
            if (!post) {
                return Response.json({ error: "Post not found" }, { status: 404 });
    
            }
            await db.$transaction([
                db.like.deleteMany({
                    where: {
                        userId: session.user.id,
                        postId: postId
                    },
        
                }),
                db.notification.deleteMany({
                    where:{
                        issuerId:session.user.id,
                        recipientID:post.userId,
                        postId,
                        type:"LIKE"
                    }   
                })
            ])
         
        return new Response()
    } catch (err) {
        console.log(err)
        return Response.json({ err: "Internal Server Error" }, { status: 401 })
    }
}