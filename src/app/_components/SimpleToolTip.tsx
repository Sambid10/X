import { Tooltip, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import React from 'react'


type Align= "center" | "end" | "start" | undefined
type Side="top" | "right" | "bottom" | "left" | undefined
export default function SimpleToolTip({children,title,align,side,className}:{
    children:React.ReactNode,
    title:string
    align?:Align
    side?:Side
    className?:string
}) {
  return (
    <TooltipProvider delayDuration={500}>
        <Tooltip >
        <TooltipTrigger asChild>
            {children}
        </TooltipTrigger>
        <TooltipContent className={cn("w-fit px-4 py-4 xl:hidden",className)} align={align} side={side}>
            {title}
        </TooltipContent>
        </Tooltip>
        
    </TooltipProvider>
  )
}
