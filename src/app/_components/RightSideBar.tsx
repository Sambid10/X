import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import SearchInputRapper from './SearchInputRapper'
import { auth } from '@/auth'
import { getUserDataSelect} from '@/lib/types'
import { RightTooltipDemo } from './RightSideToolTip'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense, use } from 'react'
import { cn, formatpostsNumber } from '@/lib/utils'
import Divskeleton from '@/components/ui/Divskeleton'
import CustomFollowButton from '@/components/ui/CustomFollowButton'
export default async function RightSideBar({ showSearchInput}:{
    showSearchInput:boolean
}) {
    
    return (
      
            <div className="hidden  sticky top-0 custom-scrollbar lg:w-[35%] xl:w-[32%]   lg:flex flex-col max-h-[100dvh] overflow-y-auto   py-0 pl-7 ">
            <div className='py-6'>
                <div className='flex flex-col gap-10'>
                    <SearchInputRapper/>
                    <div
                        className="px-4 py-4 rounded-xl "
                        style={{
                            background: "linear-gradient(135deg, #66a6ff 0%, #121212 100%)",
                        }}
                    >
                        <div className='flex flex-col gap-2 lg:text-center xl:text-left xl:flex-row xl:justify-between items-center'>
                            <div className='flex flex-col'>
                                <h1 className="font-bold text-2xl text-white">Ending today!</h1>
                                <p className="text-white">Get up to 50% off X Premium</p>
                            </div>
                            <Link 
                            href={"/premium"}
                            className='rounded-full px-4 py-1 bg-white text-[#000] hover:bg-gray-200 ease-in duration-200 transition-colors'>
                                Subscribe
                            </Link>
                        </div>
                    </div>
                    <Suspense fallback={
                        <Divskeleton/>
                    }>
                        <FollowReccomendation />
                        <TrendingTopics />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
export async function FollowReccomendation({className,showbio=false}:{
    className?:string,
    showbio?:boolean
}) {
    const session = await auth()
    

    if (!session?.user) return null
    const usertoFollow = await db.user.findMany({
        where: {
            NOT: {
                id: session?.user.id,
            },
            followers:{
                none:{
                    followerId:session.user.id
                }
            }

        },
        select: getUserDataSelect(session.user.id!),
        take: 5,
    })
    return (
        <div className={cn('text-2xl text-gray-50 font-bold  py-3 border border-gray-800 rounded-xl ',className)}>
            <h1 className='px-4'>Who to follow</h1>
            <div className='mt-4 cursor-pointer'>
                
                {usertoFollow.map((user, i) =>
                    
                    <div key={i} className={cn('flex gap-2  hover:bg-[#121212] transition-colors ease-in px-4  py-[0.65rem]  items-start',className)}>
                        
                        <img 
                            className='rounded-full border border-gray-600 h-12 w-12'
                            src={user.image!}
                            alt='profilepic'
                        />
                        <div className='flex items-center justify-between w-full'>
                        <div className='flex flex-col '>
                        <RightTooltipDemo  userdata={user} sessionId={session.user.id}>
                            <Link
                            className='hover:underline underline-offset-2 '
                            href={`/home/user/${user.displayname}`}
                            >
                               
                                <h1
                                style={{
                                    lineHeight: "120%"
                                }}
                                className='xl:text-[1rem] w-fit  text-[1rem] font-semibold'>{user.name}</h1>
                                   
                          </Link>
                          </RightTooltipDemo>
                          
                            <h1 className='text-sm font-thin text-gray-400'>@{user.displayname}</h1>
                            {showbio && 
                             <p className='text-[1rem] font-thin text-gray-200'>{user.bio}</p> 
                            } 
                              
                            
                        </div>
                        <CustomFollowButton userId={user.id} 
                          initialState={{
                           
                            followers: user._count.followers,
                            isFollowedByUser: user.followers.some(
                              ({ followerId }) => followerId === user.id,
                            )
                           
                          }}
                        />
                        </div>
                       
                      
                    </div>
                )}
            </div>
        </div>
    )
}

 const getTrendingTopics = async () => {
    const result = await db.$queryRaw<{ hashtag: string; count: bigint }[]>`
                SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
                FROM post
                GROUP BY (hashtag)
                ORDER BY count DESC, hashtag ASC
                LIMIT 5
            `;

    return result.map((row) => ({
        hashtag: row.hashtag,
        count: Number(row.count),
    }));
}
// ["trending_topics"],
// {
//     revalidate: 3 * 60 * 60,
// },

export async function TrendingTopics({className}:{
    className?:string
}) {
    const topics = await getTrendingTopics()
    return (
        <div className={cn('text-gray-50 text-2xl font-bold  py-2 border border-gray-800 rounded-xl',className)}>
            <h1 className='mb-4 px-4'>Trend's for you</h1>
            {topics.map(({ count, hashtag }) => {
                const title = hashtag.split('#')[1]
                return (
                    <Link key={title} href={`/hastag/${title}`} className={cn('block  px-4  py-1 hover:bg-[#121212] ease-in duration-200 transition-colors',className)}>
                        <p title={hashtag} className='hover:underline text-base tracking-wide font-light text-blue-400'>
                            {hashtag}
                        </p>
                        <p className='text-sm font-normal text-gray-200'>{formatpostsNumber(count)}&nbsp;{count === 1 ? "post" : "posts"}</p>
                    </Link>
                )
            }
            )}
        </div>
    )
}