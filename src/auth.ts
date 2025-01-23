import NextAuth,{DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth-config"
import { db } from "./lib/db"
export type ExtendedUser=DefaultSession["user"] & {
    displayname:string,
    bio:string,
    name:string,
    background:string
}
declare module "next-auth" {
    interface Session{
        user:ExtendedUser
    }
}
export const { auth, handlers, signIn, signOut } = 
NextAuth({
    pages:{
        error:"/",
        signIn:"/",
        
    },
    callbacks:{
        async session({token,session}){
           
            if(token.sub && session.user){
                session.user.id=token.sub
                session.user.name=token.name as string
                session.user.displayname=token.displayname as string
                session.user.bio=token.bio as string
                session.user.image=token.image as string
                session.user.background=token.background as string
            }
           
            return session
        },
        async jwt({token}){
            if(!token.sub) return token
            const user=await db.user.findUnique({
                where:{
                    id:token.sub
                }
            })
            if(!user) return token
            token.name=user.name
            token.image=user.image
            token.displayname=user.displayname
            token.bio=user.bio
            token.background=user.background
            return token
            
        }
    },
    adapter:PrismaAdapter(db),
    session:{strategy:"jwt"},
    ...authConfig
})