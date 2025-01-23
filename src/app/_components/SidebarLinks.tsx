import React from 'react'
import { NavLinksInterface } from './AppSidebar'
import Link from 'next/link'
import SimpleToolTip from './SimpleToolTip'
export default function SidebarLinks({ link }: {
    link: NavLinksInterface
}) {
    return (
        <SimpleToolTip
        title={link.title}
        className={'bg-gray-800 text-[#fff] p-2 '}
        side='right'
        align='center'
        >
              <Link 
        prefetch={true}
        href={`${link.url}`}>
         <div className='flex w-full cursor-pointer text-gray-200 rounded-full xl:rounded-xl items-center   xl:hover:bg-[#121212] transition-colors ease-in duration-200' >
        
        <div className='flex gap-4 justify-center items-center xl:justify-normal py-[0.65rem] w-full px-2 hover:bg-[#121212] xl:hover:bg-transparent  transition-colors ease-in duration-200' >
            <div className='lg:w-[12%] w-[100%] flex items-center justify-center  rounded-full '>
            <h1 className='text-[1.4rem] lg:text-[1.3rem] xl:text-[1.1rem]  '><link.icon/></h1>
            </div>
           
            <div className='lg:w-[88%] hidden xl:block'>
            <h1 className='text-[1.2rem] font-medium hidden xl:block'>{link.title}</h1>
            </div>
          
        </div>
       
    </div>  </Link>
        </SimpleToolTip>
      
        
    )
}
