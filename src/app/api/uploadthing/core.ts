import { db } from "@/lib/db";
import getSession from "@/lib/getSession";
import { fi } from "date-fns/locale";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";

const f=createUploadthing()
export const fileRouter = {
  avatar: f({
    image: { maxFileSize: "512KB" }
    
  })
    .middleware(async () => {
        const session=await getSession()
        if(!session?.user.id) throw new UploadThingError("Unauthorized")
        return{session}
    })
    .onUploadComplete(async ({ metadata, file }) => {
      
        const newAvatarUrl = file.url
        await db.user.update({
          where:{
              id:metadata.session?.user.id
          },
          data:{
              image:newAvatarUrl
          }
        })
        return { avatarUrl: newAvatarUrl,uploadedBy: metadata.session?.user.id };
    }),
    background:f({
      image:{maxFileSize:"1MB"}
    }).middleware(async()=>{
      const session=await getSession()
      if(!session?.user.id) throw new UploadThingError("Unauthorized")
      return{session}
    }).onUploadComplete(async({metadata,file})=>{
      const nBackground=file.url
       await db.user.update({
        where:{
          id:metadata.session.user.id
        },
        data:{
          background:nBackground
        }
      })
      return{background:nBackground}
    }),
    attachmets:f({
      image:{maxFileSize:"4MB",maxFileCount:4},
      video:{maxFileSize:"64MB",maxFileCount:4}
    }).middleware(async()=>{
      const session=await getSession()
      if(!session?.user.id) throw new UploadThingError("Unauthorized")
      return {session}
    }).onUploadComplete(async({file})=>{
      const media=await db.media.create({
        data:{
          url:file.url,
          type:file.type.startsWith("image") ? "IMG" : "VID"
        }
      })
      return {mediaId:media.id}
    })
} satisfies FileRouter;
export type AppFileRouter = typeof fileRouter;