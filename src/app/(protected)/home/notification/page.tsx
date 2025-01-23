import React from 'react'
import BackButton from '@/app/_components/BackButton'
import NotitficationPage from './components/NotitficationPage'
export default function page() {
  return (
    <>
    <div >
      <div className="border-b sticky top-0 backdrop-blur-lg z-40 pt-6 bg-black border-gray-600 flex gap-2 items-center py-3 px-2 ">
        <div className="px-1 py-1 ease-in duration-100 transition-colors rounded-full flex justify-center items-center hover:bg-gray-800">
          <BackButton />
        </div>
        <div className="flex flex-col">
          <h1 style={{ lineHeight: '100%' }} className="text-gray-200 text-[1.3rem] font-bold mb-1">
            Notifications
          </h1>
        </div>
      </div>
        <NotitficationPage/>
    </div>
  </>
  )
}
