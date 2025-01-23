import getSession from "@/lib/getSession"
import streamServerClient from "@/lib/stream"
import { error } from "console"

export async function GET(){
    try {
        const session=await getSession()
        if(!session?.user.id) {
            return Response.json({error:"Unauthorzied"},{status:401})
        }
        const expiretime=Math.floor(Date.now()/1000) + 60 * 60
        const issuedAt=Math.floor(Date.now()/1000) - 60
        const token=streamServerClient.createToken(session.user.id,expiretime,issuedAt)
        return Response.json({token})
    } catch (error) {
        console.log(error)
    }
}