import React from 'react'
import { Metadata } from 'next'
import SearchInput from '@/app/_components/SearchInput';
import BackButton from '@/app/_components/BackButton';
import SearchSelection from './SearchSelection';
import InitialPage from './InitialPage';
interface PageProps {
    searchParams: { q: string }
}
 
export async function generateMetadata({ searchParams }: PageProps):Promise<Metadata> {
    const {q}=await searchParams
    return {
        title:`Search results for "${q}"`
    };
}

export default async function page({ searchParams }: PageProps) {
    const {q}=await searchParams
    if(!q){
        return(
            <InitialPage searchinput={q}/>
        )
    }
    return (
        <div className=' pl-2 pr-4 w-full relative'>
            <div className='-ml-2 -mr-4'>
            <div className='flex gap-2 w-full pb-2 px-4 sticky top-0 pt-6 bg-black z-50'>
            <BackButton/>
            <SearchInput searchinput={q}/>
            </div>
            <SearchSelection searchinput={q}/>
            {/* <SearchUsersPage searchinput={q}/> */}
            {/* <SearchPostsPage searchinput={q}/> */}
            </div>
          
        </div>
    )
}
