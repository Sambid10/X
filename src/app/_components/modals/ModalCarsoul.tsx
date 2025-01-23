"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function ModalCarousel({
  children,
  totalItems,
  currentIndex,
  onNext,
  onPrevious,
}: {
  children: React.ReactNode[];
  totalItems: number;
  currentIndex: number;
  onNext?: () => void;
  onPrevious?: () => void;
}) {
  return (
    <Carousel className="w-full relative">
      <CarouselContent>
        {children.map((child, index) => (
          // Render the item only if it matches the currentIndex
          index === currentIndex && (
            <CarouselItem key={index}>
              <div className="p-0">
                <Card className="border-none max-h-fit relative bg-transparent px-2">
                  {child}
                </Card>
              </div>
            </CarouselItem>
          )
        ))}
      </CarouselContent>

     
    </Carousel>
  );
}
