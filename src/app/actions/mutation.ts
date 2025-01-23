"use client"
import * as z from "zod"
import { InfiniteData, QueryClient, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query"
import { UpdateProfile } from "./UpdateProfile"
import { useRouter } from "next/navigation"
import { PostPage } from "@/lib/types"
import { EditSchema } from "@/lib/Schema/posts"
import { useUploadThing } from "@/lib/uploadthing"
import { toast } from "sonner"
export const useUpdatePofileMutation = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const {startUpload}=useUploadThing("avatar",{})
    const {startUpload:backgroundUpload}=useUploadThing("background",{})
    const mutation = useMutation({
        mutationFn: async ({
          values,
          avatar,
          background
        }: {
          values:z.infer<typeof EditSchema>;
          avatar?:File,
          background?:File
        }) => {
          return Promise.all([
           UpdateProfile(values),
           avatar && startUpload([avatar]),
           background && backgroundUpload([background])

          ]);
        },
        onSuccess: async ([updatedUser,uploadResult]) => {
            if(!("id" in updatedUser)){
                console.log("No id")
                return
            }
            const navatarUrl=uploadResult?.[0].serverData.avatarUrl
            const nBackground=uploadResult?.[0].serverData
          const queryFilter: QueryFilters = {
            queryKey: ["post-feed"],
          };

          await queryClient.cancelQueries(queryFilter);

          queryClient.setQueriesData<InfiniteData<PostPage, string | null>>(
            queryFilter,
            (oldData) => {
              if (!oldData) return;

              return {
                pageParams: oldData.pageParams,
                pages: oldData.pages.map((page) => ({
                  nextCursor: page.nextCursor,
                  posts: page.posts.map((post) => {
                    if (post.user.id === updatedUser.id) {
                      return {
                        ...post,
                        user: {
                          ...updatedUser,
                          image:navatarUrl || updatedUser.image,
                          backgroundUpload:nBackground || updatedUser.background

                        },
                      };
                    }
                    return post;
                  }),
                })),
              };
            },
          );

          router.refresh();


        },
        onError(error) {
          console.error(error);
          toast.error("Failed to update your profile..")
        },
      });

      return mutation;
}