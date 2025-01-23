"use client"
import React, { useRef, useState, useTransition } from 'react'
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
import Image, { StaticImageData } from 'next/image'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Textarea } from '@/components/ui/textarea';
import { EditSchema } from '@/lib/Schema/posts';
import { useUpdatePofileMutation } from '@/app/actions/mutation';
import { UserData } from '@/lib/types';
import { FaCamera } from 'react-icons/fa';
import { TooltipContent, Tooltip, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import CropImageModal from './CropImageModal';
import Resizer from "react-image-file-resizer"
import { toast } from 'sonner';
import { ChevronLast, ChevronLeft } from 'lucide-react';
interface Props {
    user: UserData
    open: boolean,
    setOpen: (open: boolean) => void
}
export const EditProfileModal = ({ open, setOpen, user }: Props) => {
    const session = useSession()

    const form = useForm<z.infer<typeof EditSchema>>(
        {
            resolver: zodResolver(EditSchema),
            defaultValues: {
                displayname: user?.name || " ",
                bio: user?.bio || " "
            }
        }
    )
    const mutation = useUpdatePofileMutation()
    const [croppedAvatar, setcroppedAvatar] = useState<Blob | null>(null)
    const [Croppedbackgroundimg, setCroppedbackgroundimg] = useState<Blob | null>(null)
    const handleNameSubmit = (values: z.infer<typeof EditSchema>) => {
        const nAvatarFile = croppedAvatar ?
            new File([croppedAvatar], `avatar_${session.data?.user.id}.webp`)
            : undefined
        const backgroundImg=Croppedbackgroundimg ?
            new File([Croppedbackgroundimg],`backgroung_${session.data?.user.id}.webp`) :undefined
        mutation.mutate({ values, avatar: nAvatarFile,background:backgroundImg }, {
            onSuccess: () => {
                setcroppedAvatar(null)
                setCroppedbackgroundimg(null)
                setOpen(false)
                session.update()
                toast.message("User profile updated.",{
                    richColors:false,
                    position:"bottom-center",
                    style: {
                        backgroundColor: "#1DA1F2", // Twitter blue
                        color: "#fff",
                        borderRadius: "4px",
                        padding: "14px 16px",
                        boxShadow: "0px 4px 8px rgba(100, 100, 100, 0.2)",
                        fontSize: "16px",
                        fontWeight:"normal",
                        textAlign:"center",
                            // Center verticall
                      }, 
        
                      // Optional icon to make it more engaging
                      duration: 3000, // Short display time like Twitter notifications
                   
                   })
            }
        })
    }

    return (

        <AlertDialog open={open} onOpenChange={() => setOpen(false)}>
            <AlertDialogContent className='w-[60%] md:w-[40%] lg:w-[30%]'>
                <AlertDialogHeader>
                    <div className='flex  items-center relative'>
                    <AlertDialogCancel className='rounded-full h-10 w-10'>
                        <ChevronLeft/>
                    </AlertDialogCancel>
                        <div className='absolute left-[45%] '>
                        <Image
                            className=''
                            src={"/gmail.svg"}
                            alt="logo"
                            height={50}
                            width={40}
                        />
                        </div>
                       
                         
                    </div>
                   

                    <AlertDialogTitle className='text-2xl '>Edit Profile</AlertDialogTitle>
                    <AlertDialogDescription>

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className=''>
                    <BackGroundInput
                        onbackgorundimgCropped={setCroppedbackgroundimg}
                        imageSrc={Croppedbackgroundimg ? URL.createObjectURL(Croppedbackgroundimg) : user?.background || "/avatar-placeholder.png"}
                    />
                    <div className='h-[1rem]'/>
                    <AvatarInput
                        onImageCropped={setcroppedAvatar}
                        imageSrc={croppedAvatar ? URL.createObjectURL(croppedAvatar) : user?.image || "/avatar-placeholder.png"}
                    />
                </div>
                <AlertDialogFooter>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleNameSubmit)} className='flex flex-col w-full gap-4'>
                            <FormField
                                name='displayname'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex justify-between items-center'>
                                            <FormLabel>Name: </FormLabel>
                                            <FormMessage />

                                        </div>
                                        <FormControl>
                                            <Input  {...field} placeholder='Enter your new name' type='text' className='border=1 border-gray-800' />
                                        </FormControl>

                                    </FormItem>
                                )}
                            >
                            </FormField>
                            <FormField
                                name='bio'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex justify-between items-center'>
                                            <FormLabel>Bio: </FormLabel>
                                            <FormMessage />

                                        </div>
                                        <FormControl>
                                            <Textarea className='max-h-[10rem] overflow-y-auto' {...field} placeholder="Type your message here." />
                                        </FormControl>

                                    </FormItem>
                                )}
                            >
                            </FormField>
                            <div className='flex flex-col gap-4 w-full mt-2 items-center justify-center'>
                                <Button
                                    disabled={mutation.isPending}
                                    type='submit'
                                    className='rounded-full w-[70%] h-10'>
                                    {mutation.isPending ? <ImSpinner2 className='animate-spin' /> : <h1>Save</h1>}

                                </Button>
                            </div>
                        </form>
                    </Form>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

interface BackgorundProps {
    onbackgorundimgCropped: (blob: Blob | null) => void
    imageSrc: string | StaticImageData
}
export const BackGroundInput = ({ imageSrc, onbackgorundimgCropped }: BackgorundProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [imgtoCrop, setImagetoCrop] = useState<File>()
    const handleImage = (image: File | undefined) => {
        if (!image) return
        Resizer.imageFileResizer(
            image,
            1024,     // maxWidth
            576,
            "WEBP",
            100,
            0,
            (uri) => setImagetoCrop(uri as File),
            "file"
        )
    }
    return (
        <>
            <input
                type='file'
                ref={inputRef}
                className='hidden relative sr-only'
                onChange={(e) => handleImage(e.target.files?.[0])}
                accept='image/*'
            />
            <TooltipProvider>
                <Tooltip delayDuration={0.01} >
                    <TooltipTrigger asChild >
                    <div className="relative w-full h-[12rem] max-w-[1024px] overflow-hidden bg-gray-800/50">
                        <button
                            type='button'
                            onClick={() => inputRef.current?.click()}
                            className='group block'
                        >
                                <Image
                                    src={imageSrc}
                                    alt="cover-pic"
                                    fill
                                    className="object-cover w-full h-full brightness-75"
                                />
                                <div className="absolute inset-0 hover:bg-black/30 duration-200 ease-in flex justify-center items-center">
                                    <div className="bg-black/50 px-3 py-2 rounded-full flex justify-center items-center">
                                        <FaCamera className="text-gray-100" />
                                    </div>
                                </div>
                           

                        </button>
                        </div>

                    </TooltipTrigger >
                    <TooltipContent align={'center'} side={'right'} className='bg-gray-800 min-w-[5rem] text-[#fff] z-50'>
                        Add Cover Photo
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider >
        {imgtoCrop && (
            <CropImageModal
            src={URL.createObjectURL(imgtoCrop)}
            cropAspectRatio={2}
            onClose={() => {
                setImagetoCrop(undefined)
                if (inputRef.current) {
                    inputRef.current.value = ""
                }
            }}
            onCropped={onbackgorundimgCropped}

            />
        )}
        </>

    )
}



interface AvatarInputPRops {
    imageSrc: string | StaticImageData
    onImageCropped: (blob: Blob | null) => void
}
const AvatarInput = ({ imageSrc, onImageCropped }: AvatarInputPRops) => {
    const [imgtoCrop, setimgtoCrop] = useState<File>()

    const fileInputref = useRef<HTMLInputElement>(null)

    function onImageSelected(image: File | undefined) {
        if (!image) return
        Resizer.imageFileResizer(
            image,
            1024,
            1024,
            "WEBP",
            100,
            0,
            (uri) => setimgtoCrop(uri as File),
            "file"
        )
    }
    return <>

        <input
            type='file'
            accept='image/*'
            ref={fileInputref}
            className='hidden sr-only relative'
            onChange={(e) => onImageSelected(e.target.files?.[0])}
        >

        </input>

        <TooltipProvider>
            <Tooltip delayDuration={0.01} >
                <TooltipTrigger asChild >
                    <button
                        type='button'
                        onClick={() => fileInputref.current?.click()}
                        className='group relative  block'
                    >

                        <Image
                            src={imageSrc}
                            alt='profile-pic'
                            height={120}
                            width={120}
                            className='size-32 rounded-full brightness-75'
                        />
                        <div className='absolute inset-0 hover:bg-black/30 duration-200 ease-in flex justify-center items-center w-full'>
                            <div className='bg-black/30 px-2 py-2 rounded-full flex justify-center items-center'>
                                <FaCamera className='text-gray-100' />
                            </div>
                        </div>
                    </button>

                </TooltipTrigger >
                <TooltipContent align={'center'} side={'right'} className='bg-gray-800 min-w-[5rem] text-[#fff] z-50'>
                    Add Photo
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        {imgtoCrop && (
            <CropImageModal
                src={URL.createObjectURL(imgtoCrop)}
                cropAspectRatio={1}
                onCropped={onImageCropped}
                onClose={() => {
                    setimgtoCrop(undefined)
                    if (fileInputref.current) {
                        fileInputref.current.value = ""
                    }
                }}
            />
        )}
    </>
}

