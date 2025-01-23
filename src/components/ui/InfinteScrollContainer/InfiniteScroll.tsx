"use client"
interface Props extends React.PropsWithChildren{
    onBottomReached:()=>void,
    className?:string,
}
import React from 'react'
import {useInView} from "react-intersection-observer"

export default function InfiniteScroll({children,className,onBottomReached}:Props) {
    const {ref}=useInView({
        rootMargin:"200px",
        onChange(inView){
            if(inView){
                onBottomReached()
            }
        }
    })
    return (
    <div className={className}>
        {children}
        <div ref={ref}/>
    </div>
  ) 
}
