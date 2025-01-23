"use client"
import React, { useTransition } from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ImSpinner2 } from "react-icons/im";
import * as z from "zod"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { displayNameSchema } from '@/lib/Schema/posts'
import { Input } from '@/components/ui/input'
import { UpdateDisplayName } from '@/app/actions/UpdateDisplayName'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getSession, useSession } from 'next-auth/react';
export const DisplayNameModal = () => {
    const [isPending,startTransition]=useTransition()
    const session=useSession()
    const form = useForm<z.infer<typeof displayNameSchema>>(
        {
            resolver: zodResolver(displayNameSchema),
            defaultValues:{
                displayname:""
            }
        }
    )
    const router=useRouter()
    const handleNameSubmit=(values:z.infer<typeof displayNameSchema>)=>{
            startTransition(async()=>{
                await UpdateDisplayName(values).then((data)=>
                    {data?.error ?
                        toast.error(data.error,{
                            richColors:true
                        }) : session.update()
                        
                    }
                
                )

            })
    }
    return (

        <AlertDialog open={true}>
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

                    <AlertDialogTitle className='text-2xl '>What should we call You?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Choose the @name you’d like to display. Once set, this handle cannot be changed later.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleNameSubmit)} className='flex flex-col w-full gap-4'>
                            <FormField
                                name='displayname'
                                control={form.control}
                                render={({ field }) =>(
                                    <FormItem>
                                        <div className='flex justify-between items-center'>
                                            <FormLabel>Display Name: </FormLabel>
                                            <FormMessage />
                                            
                                        </div>
                                        <FormControl>
                                            <Input  {...field} placeholder='Enter your display name' type='text' />
                                        </FormControl>
                                        
                                    </FormItem>
                                )}
                            >
                            </FormField>
                            <div className='flex flex-col gap-4 w-full items-center justify-center'>
                                <Button
                                disabled={isPending}
                                    type='submit'
                                    className='rounded-full w-[70%] h-10'>
                                    {isPending ? <ImSpinner2 className='animate-spin'/>:   <h1>Submit</h1>}
                                 
                                </Button>
                            </div>
                        </form>
                    </Form>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
