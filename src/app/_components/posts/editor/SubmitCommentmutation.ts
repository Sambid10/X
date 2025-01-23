"use client"
import { submitComment } from '@/app/actions/comments/submitComment'
import { useMutation, useQueryClient ,QueryKey,QueryFilters} from '@tanstack/react-query'
import { toast } from 'sonner'
import { InfiniteData } from '@tanstack/react-query'
import { CommentsPage } from '@/lib/types'
export default function SubmitCommentMutation(postId: string) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: submitComment,
      onSuccess: async (ncomment) => {
        const queryFilter: QueryFilters = { queryKey: ["comments", postId] };
  
        await queryClient.cancelQueries(queryFilter);
  
        queryClient.setQueriesData<InfiniteData<CommentsPage, string | null>>(
          queryFilter,
          (oldData) => {
            const firstPage = oldData?.pages[0];
            if (firstPage) {
              return {
                pageParams: oldData?.pageParams,
                pages: [
                  {
                    nextCursor: firstPage.nextCursor,
                    comments: [ncomment as typeof firstPage.comments[0], ...firstPage.comments],
                   
                  },
                  ...oldData?.pages.slice(1), // Preserve remaining pages
                ],
              };
            }
          }
        );
  
        queryClient.invalidateQueries({
          queryKey: queryFilter.queryKey,
          predicate(query) {
            return !query.state.data; // Ensure invalidation is precise
          },
        });
  
        toast.message("Reply Sent.", {
          richColors: false,
          position: "bottom-center",
          style: {
            backgroundColor: "#1DA1F2", // Twitter blue
            color: "#fff",
            borderRadius: "4px",
            padding: "14px 16px",
            boxShadow: "0px 4px 8px rgba(100, 100, 100, 0.2)",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
          },
          duration: 4500, // Short display time
        });
       
      },
    
      onError: (err) => {
        console.log(err);
        toast.error("Failed to send Reply.");
      },
    });
  
    return mutation;
  }
  
