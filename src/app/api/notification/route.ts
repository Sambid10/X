import { db } from "@/lib/db"
import getSession from "@/lib/getSession"
import { getPostDataInclude, notificationInclude, NotificationPage} from "@/lib/types"
import { da, id } from "date-fns/locale"
import { NextRequest } from "next/server"

export async function GET(req:NextRequest) {
   
    try{
        const pageSize=10
        const cursor=req.nextUrl.searchParams.get("cursor") || undefined
        const session=await getSession()
        if(!session?.user.id) return Response.json({error:"Unauthirized"},{status:401})
        
        const notification=await db.notification.findMany({
            where:{
                recipientID:session.user.id
            },
            include:notificationInclude,
            orderBy:{
                createdAt:"desc"
            },
            take:pageSize + 1,
            cursor:cursor ? {id:cursor} : undefined
        })
        const nextCursor=notification.length > pageSize ? notification[pageSize].id : null
        const data:NotificationPage={
            notificationData:notification.slice(0,pageSize),
            nextCursor:nextCursor
        }
        return Response.json(data)
        }catch(error){
        console.log(error)
        return Response.json({error:"Internal Server error"},{status:500})
    }
}