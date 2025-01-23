import { Loader2 } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <div className='min-h-screen flex justify-center items-center w-full'>
        <Loader2 className='animate-spin text-blue-400'/>

    </div>
  )
}
