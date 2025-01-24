import { followerInfo} from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";

export function userFollowerInfo(userId:string ,initialState:followerInfo){
    const query=useQuery({
        queryKey:["follower-info", userId],
        queryFn:()=>ky.get(`/api/users/${userId}/followers`).json<followerInfo>(),
        initialData:initialState,
        staleTime:Infinity
    })
    return query
}


