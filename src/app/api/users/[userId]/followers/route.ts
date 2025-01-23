import { db } from "@/lib/db"
import getSession from "@/lib/getSession"
import { followerInfo, } from "@/lib/types"

interface Props{
    params:{userId:string}
}


export async function GET(req: Request,{params}:Props ) {
    const {userId}=await params
    try {
        const session = await getSession()
        if (!session?.user.id) return  Response.json({error:"Unauthorized"},{status:401})

        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                followers: {
                    where: {
                        followerId: session.user.id
                    },
                    select: {
                        followerId: true
                    }
                },
                following:{
                    where:{
                        followingId:session.user.id
                    },
                    select:{
                        followingId:true
                    }
                },
                _count: {
                    select: {
                        followers: true,
                        following:true,
                    }
                }
            }
        })
        if (!user) return  Response.json({error:"User not found"},{status:404})
        const data: followerInfo = {
            followers: user._count.followers,
            isFollowedByUser: !!user.followers.length,
          
        }
        return Response.json(data)
    } catch (error) {
        console.log(error)
        return Response.json({ error: "Internal Server error" }, { status: 500 })
    }
}

export async function POST(req: Request
    , {params}:Props) {
        const {userId}=await params
    try {
        const session = await getSession()
        if (!session?.user.id) return  Response.json({error:"Unauthorized"},{status:401})
        await db.$transaction([
            db.follow.upsert({
                where: {
                    followerId_followingId: {
                        followerId: session.user.id,
                        followingId: userId
                    }
                },
                create: {
                    followerId: session.user.id,
                    followingId:userId
                },
                update: {
    
                }
            }),
            db.notification.create({
                data:{
                    issuerId:session.user.id,
                    recipientID:userId,
                    type:"FOLLOW"
                }
            })
    ])
        
           
        return new Response()
    } catch (error) {
        console.log(error)
        return Response.json({ error: "Internal Server error" }, { status: 500 })
    }
}

export async function DELETE(req: Request
    , {params}:Props) {
       
    try {
        const{userId}=await params
        const session = await getSession()
        if (!session?.user.id) return  Response.json({error:"Unauthorized"},{status:401})
        await db.$transaction([
            db.follow.deleteMany({
                where: {
                        followerId: session.user.id,
                        followingId:userId
                },
            }),
            db.notification.deleteMany({
                where:{
                    issuerId:session.user.id,
                    recipientID:userId,
                },
            })
    ])
           
        return new Response()
    } catch (error) {
        console.log(error)
        return Response.json({ error: "Internal Server error" }, { status: 500 })
    }
}