import React from 'react'
import AppSidebar from '@/app/_components/AppSidebar'
import RightSideBar from '@/app/_components/RightSideBar'
import { DisplayNameModal } from '@/app/_components/modals/DisplayNameModal'
import getSession from '@/lib/getSession'
export default async function layout({children}:{
    children:React.ReactNode
}) {
    const session=await getSession()
    return (
    <div className="flex mx-auto bg-[#000] max-w-7xl  relative md:justify-start lg:justify-center md:pl-12 lg:pl-0 min-h-screen">
    {!session?.user.displayname && <DisplayNameModal />}
    <AppSidebar />
    <main className='w-[100%] sm:w-[100%] md:max-w-[70%] lg:w-[53%] xl:w-[48%] min-h-[105vh] border-r border-gray-600 relative'>
      {children}
    </main>
    < RightSideBar  showSearchInput={true}/>

  </div>
    
  )
}

