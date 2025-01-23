"use client"
import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function BackButton() {
const handleBack=()=>{
    window.history.back()

}
    return (
        <div
         
        onClick={handleBack}
        className='  cursor-pointer  rounded-full flex justify-center items-center '>
        <Button size={'icon'} className=' flex justify-center items-center  ease-in rounded-full hover:bg-gray-800 bg-black duration-100 transition-colors'>
          <ChevronLeft  className='text-[#fff]'/>
        </Button>
      </div>
    
  )
}
