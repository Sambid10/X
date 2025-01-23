import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
export default { 
    providers:[

        Google({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking:true,
            authorization:{
                params:{
                    prompt:"consent"
                }
            }
        }),
        Github({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET,
            allowDangerousEmailAccountLinking:true,
            authorization:{
                params: {
                    prompt: "consent", // Requests consent every time
                  },
            }
        }),  
    ]
 } satisfies NextAuthConfig