"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { OpenMessageModal } from '@/app/_components/modals/OpenMessageModal'


export default function MessageButton() {
    const [messageModal,setMessageModal]=useState(false)
  return (
    <div className='flex justify-center w-full'>
      <Button 
      onClick={()=>{setMessageModal(true)}}
      className='mt-12  bg-button hover:bg-blue-500 ease-in duration-200 transition-colors h-16 font-semibold text-[#fff] px-12 text-xl rounded-full'>Write A Message</Button>
      
      {messageModal &&  <OpenMessageModal open={messageModal} setOpen={setMessageModal}/>}
      </div>

     
  )
}
