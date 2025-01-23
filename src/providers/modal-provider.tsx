"use client"
import { Postmodal } from "@/app/_components/modals/createPost"
import { EditProfileModal } from "@/app/_components/modals/EditProfileModal"
import { Logoutmodal } from "@/app/_components/modals/logoutmodal"
import { useEffect, useState } from "react"

export const ModalProvider=()=>{
    const [isMounted,setisMounted]=useState(false)
    useEffect(()=>{
        setisMounted(true)
    },[])
    if(!isMounted){
        return null
    }
    return(
    <>
        <Logoutmodal/>
        <Postmodal/>
      
       
    </>)
}