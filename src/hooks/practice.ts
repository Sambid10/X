import React, { useEffect } from "react"
type reftype=React.RefObject<HTMLElement>
type handlertype=(event:MouseEvent | TouchEvent)=>void
export const Practice=(ref:reftype,hanler:handlertype)=>{
    useEffect(()=>{
        const listener=(event:MouseEvent | TouchEvent)=>{
            if(!ref.current || ref.current.contains(event.target as Node )){
                return
            }
            hanler(event)
        }
        document.addEventListener("mousedown",listener)
        document.addEventListener("touchstart",listener)
        return()=>{
            document.removeEventListener("mousedown",listener)
            document.removeEventListener("touchstart",listener)
        }
    },[ref,hanler])
}