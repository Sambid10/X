"use client"
import { EditProfileModal } from '@/app/_components/modals/EditProfileModal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-modal'
import { UserData } from '@/lib/types'
import React, { useState } from 'react'

export default function EditProfile({user}:{
    user:UserData
}) {
    const [isOpen,setOpen]=useState(false)
    return (
        <>
         <Button
            onClick={()=>setOpen(true)}
            className='ml-auto rounded-full bg-black text-[#fff] hover:bg-[#121212] duration-200 ease-in  border border-blue-300 h-9 -mt-2'>
            Edit Profile
        </Button>
        <EditProfileModal open={isOpen} user={user} setOpen={setOpen}/>
        </>
    )
}
