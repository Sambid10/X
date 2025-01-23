"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { displayNameSchema, EditSchema } from "@/lib/Schema/posts"
import { getUserDataSelect } from "@/lib/types"
import * as z from "zod"
export const UpdateProfile = async (values: z.infer<typeof EditSchema>) => {
    console.log(values)
    const user = await auth()
    if (!user?.user.id) throw new Error("Unauthorized")
    const {displayname,bio} = EditSchema.parse(values)
    const existingdisplayname = await db.user.findFirst({
       where:{
        displayname:displayname
        
       }
    })
    if(existingdisplayname) return {error:"Name already in use."}
    const updatedUser= await db.user.update({
        where: {
            id: user.user.id
        },
        data: {
            name:displayname,
            bio:bio,
            
        },
        select:getUserDataSelect(user.user.id)
    })
  
  
    return updatedUser
}