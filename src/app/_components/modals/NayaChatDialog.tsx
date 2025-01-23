interface Props{
    onOpenChange:(open:boolean)=>void
    onChatCreated:()=>void
}

import { AlertDialog } from '@/components/ui/alert-dialog'
import React from 'react'

export default function NayaChatDialog({onChatCreated,onOpenChange}:Props) {
  return (
    <AlertDialog open onOpenChange={onOpenChange}>

    </AlertDialog>
  )
}
