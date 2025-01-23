"use client"
import { UserData } from '@/lib/types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CustomFollowButton from '@/components/ui/CustomFollowButton'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
export default function SearchedUserProfile({user,className}:
    {
        user:UserData,
        className?:string,
    }
) {
    const router=useRouter()
    const session=useSession()
  return (
  
    <div 
    onClick={()=>router.push(`/home/user/${user.displayname}`)}
    className={cn(` flex gap-2 rounded-xl cursor-pointer px-4  py-4 hover:bg-[#0b0b0b] ease-in duration-200 transition-colors items-center`,className)}>
                        <img
                            className='rounded-full border border-gray-600 h-11 w-11'
                            src={user.image || '/default-profile-pic.jpg'}
                            alt='profilepic'  
                        />
                        <div className='flex flex-col '>
                       
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
                         
                          
                            
                          <h1 className='text-sm font-thin text-gray-400'>@{user.displayname}</h1>
                        
                        </div>
                        {session.data?.user.id !== user.id && 
                         <div
                         className='absolute right-4'
                         onClick={(e)=>e.stopPropagation()}
                         >
                         <CustomFollowButton userId={user.id} 
                         initialState={{
                          
                           followers: user._count.followers,
                           isFollowedByUser: user.followers.some(
                             ({ followerId }) => followerId === user.id,
                           )
                          
                         }}
                       />
                        </div>
                        }
                       
                       
                    </div>
  )
}
