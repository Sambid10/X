"use client"
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import PlaceHolder from "@tiptap/extension-placeholder"
import UserButton from "../../UserButton"
import { Button } from "@/components/ui/button"
import "./style.css"
import { useRef, useState, useEffect } from "react"
import { FaSpinner } from "react-icons/fa"
import { useSubmitPostMutation } from "./mutation"
import { ImageIcon, LucideLoader2, SmileIcon, X } from "lucide-react"
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import useOnClickOutside from "@/customhooks/onClickOutside"
import { Loader2 } from "lucide-react"
import SimpleToolTip from "../../SimpleToolTip"
import SubmitCommentMutation from "./SubmitCommentmutation"
import useMediaUpload, { AttachmentProps } from "./useMediaUpload"
import { cn } from "@/lib/utils"
import { PostData } from "@/lib/types"



export default function PostEditor() {
    const mutation = useSubmitPostMutation()
    
    const Mediaref = useRef<HTMLInputElement>(null)
    const ref = useRef(null)
    const { RemoveAttachments, attachments, handleStartUpload, isUploading, reset, uploadProgress } =
        useMediaUpload()
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
    useOnClickOutside(ref, () => setShowEmojiPicker(false))
    const [isEditorLoading, setIsEditorLoading] = useState(true);
    useEffect(() => {
        setIsEditorLoading(false); // Set loading to false once the PostEditor is mounted
    }, []); // Empty dependency array to run once on mount

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
        immediatelyRender: false,
    })
    const input = editor?.getText({
        blockSeparator: "\n",
    }) || ""

    const onEmojiClick = (emojiData: EmojiClickData) => {
        if (editor) {
            editor.commands.insertContent(emojiData.emoji);
            editor.commands.focus();  // Ensure the editor is focused after insertion
        }
    }


    function onSubmit() {
        mutation.mutate({
            content: input,
            mediaIds: attachments.map(a => a.mediaId).filter(Boolean) as string[]
        }, {
            onSuccess: () => {
                editor?.commands.clearContent()
                reset()
            }
        })
    }

    return (
        <div className="flex flex-col gap-2 relative ">
            <div className="flex items-start  pt-4 " style={{ minHeight: '6rem' }}>
                <div className="w-[10%] h-full">
                    <UserButton clickable={false} />
                </div>
                {isEditorLoading ? (
                    <div className="absolute flex justify-center items-center w-full h-[6rem]">
                        <Loader2 className="animate-spin text-blue-500" />
                    </div>
                ) : (
                    <div className="w-[90%] h-full ">
                        <EditorContent
                            className="w-full min-h-[6rem] max-h-[20rem] overflow-y-auto "
                            editor={editor}
                        />

                        {!!attachments.length && (
                            <AttachmentPreviewsRapper
                                attachments={attachments}
                                removeAttachment={RemoveAttachments}
                            />
                        )}
                        <div className="relative flex items-center gap-1 border-t mt-1 border-gray-800">

                            <SimpleToolTip title={"Add Media's"} className="bg-gray-800/50 text-[#fff]" side="bottom">
                                <button
                                    disabled={isUploading || attachments.length >= 4}
                                    onClick={() => Mediaref.current?.click()}
                                    className="bg-[#000] w-fit hover:bg-gray-800/50 ease-in duration-200 transition-colors rounded-full px-1 py-1 flex justify-start  relative" >
                                    <h1 className=""><ImageIcon className="text-blue-400 text-3xl" /></h1>
                                </button>
                            </SimpleToolTip>
                            <SimpleToolTip title={"Show emoji"} className="bg-gray-800/50 text-[#fff]" side="bottom">
                                <button
                                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                                    className="bg-[#000] w-fit hover:bg-gray-800/50 ease-in duration-200 transition-colors rounded-full px-1 py-1 flex justify-start  relative" >
                                    <h1 className=""><SmileIcon className="text-blue-400 text-3xl" /></h1>
                                </button>

                            </SimpleToolTip>
                            <input
                                onChange={(e) => {
                                    const files = Array.from(e.target.files || [])
                                    if (files.length) {
                                        handleStartUpload(files)
                                        e.target.value = "";
                                    }
                                }}
                                ref={Mediaref} accept="image/*,video/*" multiple max={4} type="file" className="hidden" />
                            {showEmojiPicker && (
                                <div className="absolute top-8 z-[90]" ref={ref}>
                                    <EmojiPicker
                                        searchDisabled
                                        onEmojiClick={onEmojiClick} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>





            <div className="flex justify-end w-full px-4 mb-4">
                <Button
                    onClick={onSubmit}
                    disabled={!input.trim() || isUploading}
                    className="bg-button hover:bg-blue-700 text-[#fff] rounded-full ">
                    {mutation.isPending ? <><FaSpinner className="animate-spin" /></> : <h1>Post</h1>}

                </Button>
            </div>
        </div>)
}

interface AttachmentsPreviewProps {
    attachments: AttachmentProps[],
    removeAttachment: (filename: string) => void
}

function AttachmentPreviewsRapper({ attachments, removeAttachment }: AttachmentsPreviewProps) {
    return (
        <div className={cn("flex flex-col gap-2 ", attachments.length > 1 && "sm:grid sm:grid-cols-2")}>
            {attachments.map(a => (
                <AttachmentPreview
                    attachment={a}
                    onRemoveClick={() => removeAttachment(a.file.name)}
                    key={a.file.name} />
            ))}
        </div>
    )
}



interface AttachmentPreviewProps {
    attachment: AttachmentProps,
    onRemoveClick: () => void
}
const AttachmentPreview = ({ attachment, onRemoveClick }: AttachmentPreviewProps) => {
    const src = URL.createObjectURL(attachment.file)
    return <div className={cn("relative mx-auto  size-fit ", {
        "opacity-50": attachment.isUploading
    })}>
        {attachment.file.type.startsWith("image") ? (
            <img
                src={src}
                alt="Attachments-pics/vids"
                className="size-fit max-h-[30rem] rounded-xl"
            />
        ) : (
            <video

                controls className="size-fit max-h-[30rem] rounded-xl">
                <source src={src} type={attachment.file.type} />
            </video>

        )}
        {!attachment.isUploading && (
            <button onClick={onRemoveClick} className="absolute z-20 right-3 top-3 rounded-full bg-[#121212] p-1.5 text-[#fff] transition-colors hover:bg-gray-800 ease-in duration-200 border border-gray-800">
                <X size={20} />
            </button>
        )}
        {attachment.isUploading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                <Loader2 size={40} className="animate-spin text-blue-500 " />
            </div>

        )}
    </div>
}