import { db } from "@/lib/db";
import getSession from "@/lib/getSession";

interface Props {
    params: { slug: string };
}

export async function GET(req: Request, { params }: Props) {
    const { slug } = await params;

    try {
        const session = await getSession();

        if (!session?.user.id) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }


        const searchPattern = `%${slug.toLowerCase()}%`;

        const result = await db.$queryRaw<{ hashtag: string; count: bigint }[]>`
        WITH hashtags AS (
          SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag,
                 COUNT(*) AS count
          FROM post
          GROUP BY hashtag
        )
        SELECT hashtag, count
        FROM hashtags
        WHERE hashtag ILIKE ${searchPattern} -- Case-insensitive substring match
        ORDER BY
          CASE WHEN hashtag = LOWER(${slug}) THEN 0 ELSE 1 END, -- Prioritize exact matches
          count DESC, -- Then by count
          hashtag ASC -- Finally alphabetically
        LIMIT 5;
      `;

        const data = result.map((row) => ({
            hashtag: row.hashtag,
            count: Number(row.count),
        }));

        return Response.json(data);
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Server Error" }, { status: 501 });
    }
}
