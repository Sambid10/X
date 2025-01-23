import React from 'react'
import Link from 'next/link'
export default function PremiumBannerProfile() {
    return (
        <Link 
        href="/premium"
        
        className='flex cursor-pointer -mx-6 py-3 relative justify-center items-center bg-gradient-to-r text-[#fff] from-[#0f6666] to-[#009b9b]'>
            <div className='flex flex-col text-center '>
                <h1 className='text-2xl font-semibold'>It's Premium Birthday!!</h1>
                <h1 className='text-lg font-normal'>50% off for a  limited time</h1>
                <img
                    className='absolute top-1/2 left-10 -translate-y-1/2 h-[40px] w-[40px]'
                    src='/paer.svg'
                />
                <img
                    className='absolute left-20 top-1/2  -translate-y-1/2 h-[40px] w-[40px]'
                    src='/part.svg'
                />
                <img
                    className='absolute right-10 top-1/2  -translate-y-1/2  h-[40px] w-[40px]'
                    src='/paer.svg'
                />
                  <img
                    className='absolute right-20 top-1/2  -translate-y-1/2  h-[40px] w-[40px]'
                    src='/part.svg'
                />
            </div>

        </Link>
    )
}
