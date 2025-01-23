import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import React, { useRef } from 'react'
interface Props{
    src:string,
    cropAspectRatio:number,
    onCropped:(blob:Blob | null)=>void
    onClose:()=>void
}
import "cropperjs/dist/cropper.css"
import {ReactCropperElement,Cropper} from "react-cropper"
export default function CropImageModal(
    {cropAspectRatio,onClose,onCropped,src
}:Props) {
    const cropperRef=useRef<ReactCropperElement>(null)
    function crop(){
        const cropper=cropperRef.current?.cropper
        if(!cropper) return
        cropper.getCroppedCanvas().toBlob((blob)=>onCropped(blob),"image/webp")
        onClose()
    }
  return (
    <AlertDialog open onOpenChange={onClose}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                Crop Image?
                </AlertDialogTitle>
                </AlertDialogHeader>
            <Cropper
            src={src}
            aspectRatio={cropAspectRatio}
            ref={cropperRef}
            className='mx-auto size-fit'
            />
            <DialogFooter>
                <Button 
                onClick={onClose}
                className='hover:bg-[#121212] rounded-full border border-blue-200 bg-[#000] text-[#fff] ease-in duration-200 '>
                    Cancel
                </Button>
                <Button 
                onClick={crop}
                className='bg-gray-50 rounded-full hover:bg-gray-200 ease-in duration-200 '>
                    Confirm
                </Button>
            </DialogFooter>

        </AlertDialogContent>
    </AlertDialog>
  )
}
