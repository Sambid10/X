"use client"
import React from 'react'
import { useAnimate ,animate} from "framer-motion"
import Image from 'next/image'

const randomNumberbetn=(min:number,max:number)=>{
  return Math.floor(Math.random() * (max-min+1) +min)
}
type AnimateSequence=Parameters<typeof animate>[0]
export default function FolloButton() {
  const [scope, animate] = useAnimate()
  const onButtonClick = () => {
    const sparkles=Array.from({length:20})
    const sparklesanim:AnimateSequence=sparkles.map((_,index)=>[
      `.sparkle-${index}`,{
        x:randomNumberbetn(-50,100),
        y:randomNumberbetn(-50,50),
        scale:randomNumberbetn(0.5,1.2),
        opacity:1
      },{
        duration:0.4,
        at:"<"
      }
    ])
    const sparklesFadeOut:AnimateSequence=sparkles.map((_,index)=>[
      `.sparkle-${index}`,{
        opacity:0,
        scale:0
      },{
        duration:0.4,
        at:"<"
      }
    ])
    animate([
      ["button", { scale: 0.9 }, { duration: 0.1 }],
      ...sparklesanim,
      ["button", { scale: 1 }, { duration: 0.1 }],
      ...sparklesFadeOut,
    ])
  }
  return (
    <div
      ref={scope}
    >
      <button
        onClick={onButtonClick}
        className='rounded-full relative border-2 px-6 py-[0.4rem] bg-white border-blue-800 hover:bg-gray-200 text-[#000] transition-colors ease-in'>
        <span className='sr-only'>Follow</span>
        <span aria-hidden>
          Follow
        </span>
        <span aria-hidden className='absolute inset-0 block pointer-events-none -z-10'>
        {Array.from({ length: 20}).map((_, index) => (
          <Image
          className={`absolute opacity-0 left-1/2 top-1/2 sparkle-${index}`}
            key={index}
            src={"/star.svg"}
            height={10}
            width={10}
            alt='star'
          />
        ))}
        </span>
      </button>
    </div>

  )
}
