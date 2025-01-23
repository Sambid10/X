
import { db } from "@/lib/db";
import { getPostDataInclude, getUserDataSelect, PostData, PostPage, UserInputPage, UserPage } from "@/lib/types";
import getSession from "@/lib/getSession";
interface Props{
    params:{username:string}
}
export async function GET(req: Request,{params}:Props) {
    const {username}=await params
    try {
        const session = await getSession()
        console.log(username)
        if (!session?.user.id) return Response.json({ error: "Unauthorized" }, { status: 401 })
        const searchinput = username.split(" ").join(" & ")
        
        const searchedusers = await db.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            search: searchinput,

                            mode: "insensitive"
                        },
                    },
                    {
                        displayname: {
                            search: searchinput,

                            mode: "insensitive"
                        },
                    },
                    {
                        name: {

                            contains: searchinput,
                            mode: "insensitive"
                        },
                    },
                    {
                        displayname: {

                            contains: searchinput,
                            mode: "insensitive"
                        },
                    },
                ],
            },
            select:getUserDataSelect(session.user.id)
        });
        const data:UserInputPage={
            users:searchedusers
        }
        return Response.json(data)
    } catch (err) {
        console.log(err)
        return Response.json({ error: "Server Error" }, { status: 501 })
    }
}