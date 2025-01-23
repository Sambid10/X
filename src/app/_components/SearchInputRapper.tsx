"use client"
import React from 'react'
import SearchInput from './SearchInput'
import { usePathname } from 'next/navigation'

export default function SearchInputRapper() {
    const pathname=usePathname()
    const searchpage="/home/search" as string
    const querystring=pathname.split("/").pop()
    const searchpagefromhastag=`/hastag/${querystring}` as string

    console.log(pathname)
    if(pathname === searchpage) return null
    if(pathname === searchpagefromhastag) return null
    return(
        <SearchInput />
    )
} 
