import { db } from "@/lib/db";
import getSession from "@/lib/getSession";
import { getPostDataInclude, PostPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const startTime = Date.now(); // Start time for logging
    try {
        // Extract cursor and set default page size
        const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
        const pageSize = 5;

        // Fetch session to verify user
        const session = await getSession();
        if (!session?.user.id) {
            return new Response(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        // Query posts from the database
        const posts = await db.post.findMany({
            include: getPostDataInclude(session.user.id),
            orderBy: { createdAt: "desc" },
            take: pageSize + 1, // Fetch one extra post to check for the next cursor
            ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
        });

        // Determine the next cursor
        const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

        // Prepare response data
        const data: PostPage = {
            posts: posts.slice(0, pageSize),
            nextCursor,
        };

        console.log(`Query completed in ${Date.now() - startTime}ms`); // Log execution time

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching posts:", error);

        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
