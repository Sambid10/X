import { BookmarkInfo } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import ky from "ky"

export const useBookmarkInfo=(postId:string,BookmarkData:BookmarkInfo)=>{
    const query=useQuery({
        queryKey:["bookmark-info",postId],
        queryFn:()=>ky.get(`/api/post/for-you/${postId}/bookmarks`).json<BookmarkInfo>(),
        initialData:BookmarkData,
        staleTime:Infinity
    })
    return query
}