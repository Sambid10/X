"use client";
import { followerInfo } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Button } from "./button";
import { userFollowerInfo } from "@/customhooks/useFollowerInfo";
import ky from "ky";
import { cn } from "@/lib/utils";

interface Props {
  userId: string;
  sessionId?: string;
  initialState: followerInfo;
}

export default function CustomFollowButton({
  initialState,
  sessionId,
  userId,
}: Props) {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["follower-info", userId];
  const { data } = userFollowerInfo(userId, initialState);
  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? ky.delete(`/api/users/${userId}/followers`)
        : ky.post(`/api/users/${userId}/followers`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData<followerInfo>(queryKey);

      // Update follower info
      queryClient.setQueryData<followerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : +1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));
      return { previousState };
    },
    onError(error, variables, context) {
      console.error(error);
      // Revert follower info
      queryClient.setQueryData(queryKey, context?.previousState);
    },
  });

  return (
    <Button
      onClick={() => mutate()}
      className={cn(
        `rounded-full bg-white text-[#000] ml-auto hover:bg-none px-8 -mt-2`,
        {
          "bg-[#000] text-gray-100 hover:bg-[#121212] px-8 border border-blue-100":
            data.isFollowedByUser,
        }
      )}
    >
      {data.isFollowedByUser ? <h1>Following</h1> : <h1>Follow</h1>}
    </Button>
  );
}
