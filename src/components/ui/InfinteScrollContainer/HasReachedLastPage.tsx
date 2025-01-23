import React from 'react'
import Image from 'next/image'
export default function HasReachedLastPage() {
  return (
    <div className='py-4 px-4 text-center'>
        <div className='flex justify-center'>
        <Image
        className="w-1/4"
        src={"/gmail.svg"}
        height={20}
        width={20}
        alt='people'
        />
        </div>
    <p className='text-lg font-semibold pb-4'>
      You've reached the end! Follow more people to stay updated with more amazing content!
    </p>
  </div>
  )
}
