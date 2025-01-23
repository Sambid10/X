"use client"
import { useModal } from '@/hooks/use-modal'
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
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
export const Logoutmodal = () => {
    const { isOpen, onClose, onOpen, type } = useModal()
    const queryClient= useQueryClient()
    const isModalOpen = isOpen && type === "logout"
    const handleClose = () => {
        onClose()
    }
    return (
        <AlertDialog open={isModalOpen} onOpenChange={handleClose}>
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

                    <AlertDialogTitle className='text-2xl text-center'>Log out of X?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div className='flex flex-col gap-4 w-full items-center justify-center'>
                        <AlertDialogCancel  className='rounded-full w-[70%] border border-blue-300 h-10'>Cancel</AlertDialogCancel>
                        <Button
                            onClick={() => {
                                queryClient.clear()
                                signOut({redirectTo:"/"})

                            }}
                            className='rounded-full w-[70%] h-10'>
                            <h1>Log Out</h1>

                        </Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
