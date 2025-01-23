"use server"
import { db } from "@/lib/db";
import { getPostDataInclude, getUserDataSelect, PostData, PostPage, UserPage } from "@/lib/types";
import getSession from "@/lib/getSession";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const session = await getSession()
        if (!session?.user.id) return Response.json({ error: "Unauthorized" }, { status: 401 })
        const pageSize = 10
        const search = req.nextUrl.searchParams.get("search") || " "
        const cursor = req.nextUrl.searchParams.get("cursor") || undefined
        const searchinput = search.split(" ").join(" & ")
        
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
            select: getUserDataSelect(session.user.id),
            take: pageSize + 1,
            cursor: cursor ? { id: cursor } : undefined
        });
        const nextcurosr = searchedusers.length > pageSize ? searchedusers[pageSize].id : null
        console.log(searchedusers)
        const data: UserPage = {
            users: searchedusers.slice(0, pageSize),
            nextCursor: nextcurosr

        }
        return Response.json(data)
    } catch (err) {
        console.log(err)
        return Response.json({ error: "Server Error" }, { status: 501 })
    }
}