import { useUploadThing } from "@/lib/uploadthing"
import { useState } from "react"
import { toast } from "sonner"

export interface AttachmentProps{
    file:File,
    mediaId?:string,
    isUploading:boolean
}

export default function useMediaUpload(){
    const [attachments,setAttachmenets]=useState<AttachmentProps[]>([])
    const [uploadProgress,setUploadProggress]=useState<number>()
    const {isUploading,startUpload}=useUploadThing("attachmets",{
        onBeforeUploadBegin(files){
            const renamefiles=files.map((file)=>{
                const extension=file.name.split(".").pop()
                return new File(
                    [file],
                    `attachment_${crypto.randomUUID()}.${extension}`,
                    {
                        type:file.type
                    }
                )
            }) 
           setAttachmenets(prev=>[
            ...prev,
            ...renamefiles.map(file=>({file,isUploading:true}))
           ])
            return renamefiles 
        },
        onUploadProgress:setUploadProggress,
        onClientUploadComplete(res){
            setAttachmenets(prev=>prev.map(a=>{
                const uploadres=res.find(r=>r.name === a.file.name)
                if(!uploadres) return a

                return {
                    ...a,
                    mediaId:uploadres.serverData.mediaId,
                    isUploading:false
                }
            }))
        },
        onUploadError(err){
            setAttachmenets(prev=>prev.filter(a=>!a.isUploading))
            toast.error(err.message)
        },
       
    })
    function handleStartUpload(files:File[]){
        if(isUploading){
            toast.error("Please wait for current upload to finish.")
        }
        if(attachments.length + files.length > 5){
            toast.error("only 4 attachments are required.")
        }
    startUpload(files)
    }
    function RemoveAttachments(fileName:string){
        setAttachmenets(prev=>prev.filter(a=>a.file.name !== fileName))
    }
    function reset(){
        setAttachmenets([])
        setUploadProggress(undefined)
    }
    return {
        handleStartUpload,
        attachments,
        isUploading,
        reset,
        uploadProgress,
        RemoveAttachments,
    }
}