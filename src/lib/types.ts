import { Prisma } from "@prisma/client";
export const getUserDataSelect = (loggedinUserId: string) => {
  return {
    id: true,
    displayname: true,
    createdAt: true,
    image: true,
    name: true,
    updatedAt: true,
    email: true,
    post: true,
    background: true,
    bio: true,

    followers: {
      select: {
        followerId: true,
        follower: {
          select: {
            displayname: true,
            image: true,
            name: true,
            bio: true,
            followers: true,
            _count: {
              select: {
                followers: true
              }
            }
          }

        },
      },
      orderBy: {
        timeStamp: "desc"
      }
    },
    following: {
      select: {
        followingId: true,
        followerId: true,
        follower: {
          select: {
            followers: true,
            displayname: true,
            image: true,
            name: true,
          }
        },
        following: {
          select: {
            displayname: true,
            image: true,
            id: true,
            name: true,
            bio: true,
            followers: true,
            following: true,
          }
        },

      },
      orderBy: {
        timeStamp: "desc"
      }

    },
    _count: {
      select: {
        post: true,
        followers: true,
        following: true,
      },

    },



  } satisfies Prisma.UserSelect

}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>
}>

export const notificationInclude = {
  issueruser: {
    select: {
      displayname: true,
      image: true,
      name: true,
      followers: true,
      bio: true,
      _count: {
        select: {
          followers: true,
          following: true,
          post: true,
        }
      },


    }
  },
  post: {
    select: {
      content: true,
      attachments: true
    }
  }
} satisfies Prisma.NotificationInclude
export type NotificationData = Prisma.NotificationGetPayload<{
  include: typeof notificationInclude
}>

export interface NotificationPage {
  notificationData: NotificationData[]
  nextCursor: string | null
}

export const getPostDataInclude = (userId: string) => {
  return {
    user: {
      select: getUserDataSelect(userId)
    },
    attachments: true,
    like: {
      where: {
        userId: userId
      },
      select: {
        userId: true
      },
    },
    Repost: {
      select: {
        user: {
          select: {
            id: true,
            displayname: true,
            image: true,
          },
        },
        post: {
          include: {
            user: {
              select: getUserDataSelect(userId),
            },
            attachments: true,
            _count: {
              select: {
                like: true,
                Bookmark: true,
                comments: true,
              },
            },
          },
        },
        
      },
    },
    Bookmark: {
      where: {
        userId: userId
      },
      select: {
        userId: true,
      },

    },
    _count: {
      select: {
        like: true,
        Bookmark: true,
        comments: true,

      }
    },

  } satisfies Prisma.PostInclude
}

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>
}>



export interface PostPage {
  posts: PostData[],
  nextCursor: string | null
}

export interface UserPage{
  users:UserData[],
  nextCursor:string | null
}

export interface UserInputPage{
  users:UserData[]
}

export interface followerInfo {
  followers: number,
  isFollowedByUser: boolean,

}

export interface LikeInfo {
  likes: number,
  isLikedbyUser: boolean
}

export interface RepostedPostInfo{
  isRepostedbyUser:boolean
}

export interface BookmarkInfo {
  bookmarks: number,
  isBookmarkedbyuser: boolean
}



export function getCommentDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId)
    },
    attachments: true,
    post:true,
    _count:{
      select:{
        attachments:true,
      }
    }
  } satisfies Prisma.CommentInclude;
}

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;

export interface CommentsPage {
  comments: CommentData[]
  nextCursor: string | null;
}



export type PostWithRepost =
  | (PostData & {
      type: "post"; // Identify this as a regular post
    })
  | (PostData & {
      type: "repost"; // Identify this as a repost
      repostedBy: {
        id: string;
        displayname: string;
        image: string;
        name: string;
        bio: string;
      };
    });






// Define PostPage type, including the combined posts and reposts
// export interface PostsPage  {
//   posts: PostWithRepost[]; // Array of posts and reposts
//   nextCursor: string | null; // Next cursor for pagination
// };

// // Example of the PostData type based on your Prisma query


// // Define the RepostData structure based on your Prisma model
// export type RepostData = {
//   user: {
//     id: string;
//     displayname: string;
//     image: string;
//   };
//   post: PostData; // Reposted post
// };

// // Adjust the PostWithRepost to include reposts using the above types
// export type PostsWithRepost = 
//   | (PostData & {
//       type: "post"; // Regular post
//     })
//   | (PostData & {
//       type: "repost"; // Repost type
//       repostedBy: RepostData["user"]; // Include user who reposted
//     });