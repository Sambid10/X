import React from 'react'
import BackButton from '@/app/_components/BackButton'
import SearchInput from '@/app/_components/SearchInput'
import { FollowReccomendation, TrendingTopics } from '@/app/_components/RightSideBar'
export default function InitialPage({searchinput}:{
    searchinput:string
}) {
  return (
    <div className=' pl-2 pr-4 w-full relative'>
    <div className='-ml-2 -mr-4'>
    <div className='flex gap-2 w-full pb-6 px-4 sticky top-0 pt-6 bg-black z-50 border-b border-gray-600'>
    <BackButton/>
    <SearchInput searchinput={searchinput}/>
    </div>
    <div className='h-[0rem]'/>
    <TrendingTopics className={'rounded-none  py-2'}/>
   
    <FollowReccomendation className={'rounded-none '} showbio={true}/>
    </div>
</div>
  )
}
