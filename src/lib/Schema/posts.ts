import * as z from "zod"
export const createPostSchema=z.object({
    content:z.string().min(0,{message:"Empty post."}),
    mediaIds:z.array(z.string()).max(5,{message:"Max 4 pictures/videos are allowed"})
})
export const displayNameSchema=z.object({
    displayname:z.string().min(1,{message:"Empty field."})
})

export const EditSchema=z.object({
    displayname:z.string().min(1,{message:"Empty field."}),
    bio:z.string().max(150,{message:"40 characters exceeded"})
})
const requiredString = z.string().trim().min(1, "Required");
export const createCommentSchema = z.object({
    content: requiredString,
    mediaIds:z.array(z.string()).max(5,{message:"Max 4 pictures/videos are allowed"}),
});