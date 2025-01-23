import React from 'react'
import { Loader2 } from 'lucide-react'
export default function loading() {
  return (
    <div className='min-h-screen flex justify-center items-center w-full'>
        <Loader2 className='animate-spin text-blue-400'/>

    </div>
  )
}
