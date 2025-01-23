import { LikeInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
export function useLikeInformation(postId:string,initalState:LikeInfo){
    const query=useQuery({
        queryKey:["like-info",postId],
        queryFn:()=>ky.get(`/api/post/for-you/${postId}/likes`).json<LikeInfo>(),
        initialData:initalState,
        staleTime:Infinity
    })
    return query
}