import React from 'react'
import { NavLinksInterface } from '../(protected)/home/page'

export default function MobileBarLinks({ link }: {
    link: NavLinksInterface
}) {
  return (
   <div className='flex'>
     <h1 className='text-[1.1rem]'><link.icon/></h1>
     <h1 className='text-[1.2rem] font-medium hidden lg:block'>{link.title}</h1>
   </div>
  )
}
