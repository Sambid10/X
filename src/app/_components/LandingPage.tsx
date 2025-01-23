"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { DEFAULT_REDIRECT_URL } from '@/routes';
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
import { toast } from 'sonner';
const Links = [
  {
    id: 1,
    name: "About",
    href: "#",
  },
  {
    id: 2,
    name: "Download our X app",
    href: "#",
  },
  {
    id: 3,
    name: "Help Center",
    href: "#",
  },
  {
    id: 4,
    name: "Terms of Service",
    href: "#",
  },
  {
    id: 5,
    name: "Privacy Policy",
    href: "#",
  },
  {
    id: 6,
    name: "Cookie Policy",
    href: "#",
  },
  {
    id: 7,
    name: "Accessibility",
    href: "#",
  },
  {
    id: 8,
    name: "Ads info",
    href: "#",
  },
  {
    id: 9,
    name: "Blog",
    href: "#",
  },
  {
    id: 10,
    name: "Careers",
    href: "#",
  },
  {
    id: 11,
    name: "Brand Resources",
    href: "#",
  },
  {
    id: 12,
    name: "Advertising",
    href: "#",
  },
  {
    id: 13,
    name: "Marketing",
    href: "#",
  },
  {
    id: 14,
    name: "Email for Business",
    href: "#",
  },
  {
    id: 15,
    name: "Developers",
    href: "#",
  },
  {
    id: 16,
    name: "Directory",
    href: "#",
  },
  {
    id: 17,
    name: "Settings",
    href: "#",
  },
];

export default function LandingPage() {
  const { setTheme } = useTheme()
  const [isPending,startTransition]=useTransition()
  const onSignin=(provider:"google" | "github")=>{
    startTransition(async()=>{
        await signIn(provider,{
        redirectTo:DEFAULT_REDIRECT_URL,
      })
    })
    
  }
  return (
    <div className='min-h-screen py-6 flex-col flex gap-4 justify-center items-center px-6  md:px-0 relative'>
      <div className='absolute right-4 top-4'>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className='dark:border-gray-600 border-[#121212] border' size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      </div>
     
      <div className=' flex justify-center items-center w-full mx-auto max-w-7xl mt-12 md:px-20 lg:px-0'>
        <div className='flex flex-col gap-16 w-full '>
          <div className='lg:flex-row flex flex-col gap-4 lg:gap-0 '>
            <div className=' lg:w-[50%]  flex justify-center lg:justify-center items-center '>
              <div className='relative lg:h-[400px] lg:w-[400px] h-[50px] w-[50px]'>
                <Image
                  src={"/gmail.svg"}
                  alt='lol'
                  fill
                />
              </div>
            </div>
            <div className='w-[70%]  lg:w-[50%] flex justify-center items-center'>
              <div className='flex flex-col gap-12 md:gap-14 md:px-14 lg:px-0 sm:px-12'>
                <h1
                  style={{ lineHeight: "90%" }}
                  className='font-bold text-[3.5rem] md:text-[4.1rem] lg:text-[4.5rem] dark:text-gray-200'>Happening Now
                </h1>
                <h2 className='text-xl md:text-2xl lg:text-3xl dark:text-gray-200 font-semibold'> Join now!
                </h2>
                <div className='flex flex-col gap-2 w-[100%] lg:w-[60%]  md:px-0'>
                 
                  <Button
                  disabled={isPending}
                    onClick={()=>signIn("google")}
                    
                    variant={`default`}
                    className='flex items-center gap-2 rounded-full md:py-5 justify-center font-medium text-lg ' >
                   
                    <FcGoogle className='text-sm md:text-lg' />
                    <h1 className='text-sm md:text-lg'>Sign up with Google</h1>
                  </Button>
                  <div className='flex justify-center items-center'>
                    <span className='border-t flex-grow border-gray-400' />
                    <span className='mx-2 text-gray-400'>or</span>
                    <span className='border-t flex-grow border-gray-400' />
                  </div>
                  <Button
                   disabled={isPending}
                   
                    onClick={()=>{onSignin("github")}}
                    
                    variant={`default`} className=' rounded-full  md:py-5 flex items-center gap-2 mb-1 justify-center font-medium text-lg'>
                    <FaGithub className='text-sm md:text-lg' />
                    <h1 className='text-sm md:text-lg'>Sign up with Github</h1>
                  </Button>
                 
                
                  <h1 className='text-xs mt-[-6px]'>
                    By signing up, you agree to the
                    <Link  className='text-[#0c6196]' href={"/"}>{""} Terms of Service</Link>
                    {""} and
                    <Link className='text-[#0c6196]' href={"/"}>
                      {""} Privacy Policy,</Link>
                    {""} including
                    <Link className='text-[#0c6196]' href={"/"}>
                      {""} Cookie Use.</Link>
                  </h1>
                </div>
                <div className=' flex flex-col gap-8 md:gap-12 w-[100%] lg:w-[60%]  md:px-0 '>
                  <h1 className='text-xl font-semibold'>Don't Have an Account?</h1>
                  <Button
                  
                  disabled={isPending}
                    onClick={()=>{
                      toast.error("Sorry this is currently unavailable.",
                        {
                        duration:2000,
                        richColors:true
                      })
                    }}
                 
                    className='flex items-center gap-2 rounded-full cursor-not-allowed md:py-5 justify-center font-medium text-lg bg-[#1DA1F2] hover:bg-[#1a6a9c] text-[#fff]' variant={'secondary'}>
                    <h1 className='text-sm md:text-lg'>Create an Account</h1>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:gap-4 gap-2  w-full mt-12">
        <div
          className="flex flex-wrap gap-4 w-full justify-center">
          {Links.map((link) => (
            <Link
              key={link.id}
              className=""  // Full width on small screens, auto on larger screens
              href={`${link.href}`}
            >
              <h1 className="hover:underline dark:hover:text-[#fff] hover:text-[#000] transition-colors ease-in duration-200 text-xs text-gray-600">
                {link.name}
              </h1>
            </Link>
          ))}
        </div>
        <h1 className="text-center text-xs text-gray-600">© 2024 G-mail Corp.</h1>
      </div>
    </div>
  )
}