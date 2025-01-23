"use client"
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react"
export function ImageCarousel({ children, totalItems,currentIndex ,onNext,onPrevious}: {
  children: React.ReactNode[]
  totalItems: number,
  currentIndex?:number,
  onNext?: () => void;
  onPrevious?: () => void;
}) {
 
  return (
    <Carousel className="w-full relative">
      <CarouselContent>
        {children.map((child,index) => (
          <CarouselItem key={index} >
            <div className="p-0">
              <Card className="border-none max-h-fit relative bg-transparent px-2 ">
                  {child}
                 
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {totalItems > 1 && 
      <>
      <CarouselPrevious className="absolute left-3 top-1/2" />
      <CarouselNext className="absolute right-3 top-1/2"  /></>  
      }
    </Carousel>
  )
}
