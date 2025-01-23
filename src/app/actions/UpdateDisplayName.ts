"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { displayNameSchema } from "@/lib/Schema/posts"
import { revalidatePath } from "next/cache"
import * as z from "zod"
export const UpdateDisplayName = async (values: z.infer<typeof displayNameSchema>) => {
    console.log(values)
    const user = await auth()
    if (!user?.user.id) throw new Error("Unauthorized")
    const {displayname} = displayNameSchema.parse(values)
    const existingdisplayname = await db.user.findFirst({
       where:{
        displayname:displayname
       }
    })
    if(existingdisplayname) return {error:"Name already in use."}
    await db.user.update({
        where: {
            id: user.user.id
        },
        data: {
            displayname:displayname,
            
            
        }
    })
    revalidatePath("/home")
}