"use client"
import { useModal } from '@/hooks/use-modal'
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import PlaceHolder from "@tiptap/extension-placeholder"
import { SubmitPost } from '../posts/editor/action'
import { Button } from "@/components/ui/button"
import UserButton from '../UserButton'
import {useTransition } from "react"
import { FaSpinner } from "react-icons/fa"
import { toast } from "sonner"
import React from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useSubmitPostMutation } from '../posts/editor/mutation'
export const Postmodal = () => {
    const { isOpen, onClose, onOpen, type } = useModal()
    const [isPending, startTransition] = useTransition()
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false
            }),
            PlaceHolder.configure({
                placeholder: "What is happening?!"
            })
        ],
        immediatelyRender: false
    })
    const input = editor?.getText({
        blockSeparator: "\n",
    }) || ""
    const mutation=useSubmitPostMutation()
    async function onSubmit() {
       mutation.mutate(input,{
        onSuccess:()=>{
            onClose()
            editor?.commands.clearContent()
        },
        onError:()=>{
            toast.success("Sorry something bad happened.")
        }
       }
    )
    }
    const isModalOpen = isOpen && type === "createPost"
    const handleClose = () => {
        onClose()
    }
    return (
        <AlertDialog open={isModalOpen} onOpenChange={handleClose}>
            <AlertDialogContent className='w-[80%] md:w-[40%] overflow-clip flex flex-wrap'>
                <div className='flex justify-end w-full'>
                    <AlertDialogCancel className='border-none hover:bg-gray-800  '>
                        <div className='w-full'>X</div>
                    </AlertDialogCancel>
                </div>

                <AlertDialogHeader>
                    <AlertDialogTitle />
                    <AlertDialogDescription />
                </AlertDialogHeader>

                <div className="w-full mt-[-40px] flex flex-col">
                    <div className="flex items-end md:px-4  relative">
                        <div className="absolute top-4">
                            <UserButton clickable={false} />
                        </div>
                        <EditorContent
                            className=" max-w-[100%] pl-14 max-h-[20rem] overflow-y-auto"
                            editor={editor}
                        />
                    </div>
                    <div className="flex justify-end w-full px-4  py-2 border-t border-stone-800">
                        <Button
                            onClick={onSubmit}
                            disabled={!input.trim() || mutation.isPending}
                            className="bg-button hover:bg-blue-700 text-[#fff] rounded-full px-10">
                            {mutation.isPending ? <><FaSpinner className="animate-spin" /></> : <h1>Post</h1>}
                        </Button>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
