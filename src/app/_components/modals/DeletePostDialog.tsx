"use client"
import React from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Props{
    post:PostData, 
    open:boolean,
    onClose:()=>void
}
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useDeletePostMutation } from '../posts/mutation'
import { PostData } from '@/lib/types'
import { FaSpinner } from 'react-icons/fa'
export default function DeletePostModal({onClose,open,post}:Props) {
    const mutation=useDeletePostMutation()
    function handleOpenChange(open:boolean){
        if(!open || !mutation.isPending) {
                onClose()
        }
    }
  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogContent className='w-[60%] md:w-[40%] lg:w-[30%]'>
                <AlertDialogHeader>
                    <div className='flex justify-center'>
                        <Image
                            className=''
                            src={"/gmail.svg"}
                            alt="logo"
                            height={50}
                            width={40}
                        />
                    </div>

                    <AlertDialogTitle className='text-2xl text-center'>Delete Post?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your post will be permanently deleted from our Servers and cannot be retrieved back.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div className='flex flex-col gap-4 w-full items-center justify-center'>
                    <Button
                    disabled={mutation.isPending}
                        onClick={(e)=>{
                            e.stopPropagation()
                            mutation.mutate(post.id)
                        }}
                          className='rounded-full w-[70%] h-10 bg-rose-600 text-[#fff] hover:bg-rose-800'>
                        {mutation.isPending ? <FaSpinner className='animate-spin'/>:  <h1>
                            Delete
                        </h1>}
                       

                      </Button>
                        <AlertDialogCancel 
                        onClick={(e)=>e.stopPropagation()}
                        disabled={mutation.isPending}
                        className='rounded-full w-[70%] border border-blue-300 h-10'>Cancel</AlertDialogCancel>
                
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
  )
}
