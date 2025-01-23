import React from 'react'
import AppSidebar from '@/app/_components/AppSidebar'
import { DisplayNameModal } from '@/app/_components/modals/DisplayNameModal'
import getSession from '@/lib/getSession'
import RightSideBar from '../_components/RightSideBar'
export default async function layout({ children }: {
  children: React.ReactNode
}) {
  const session = await getSession()
  return (
    <div className="flex  mx-auto max-w-7xl  relative md:justify-start md:pl-12 lg:pl-0 px-0 min-h-screen">
      {!session?.user.displayname && <DisplayNameModal />}
      <AppSidebar />
      <main className="flex-grow md:max-w-[70%]  lg:max-w-full border-r border-gray-600 relative">
        {children}
      </main>
    </div>
  )
}

