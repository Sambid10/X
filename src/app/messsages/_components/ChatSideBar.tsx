import BackButton from '@/app/_components/BackButton'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Users, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useCallback } from 'react'
import { ChannelList, ChannelPreviewMessenger, ChannelPreviewProps, ChannelPreviewUIComponentProps } from 'stream-chat-react'
import '../../globals.css'
interface ChatSideBarProps{
  open:boolean,
  onClose:()=>void
}
export default function ChatSideBar({onClose,open}:ChatSideBarProps) {
    const session=useSession()

   
    if(!session.data?.user.id) return null

    
    const ChannelPreviewCustom = useCallback(
      (props: ChannelPreviewUIComponentProps) => (
        <ChannelPreviewMessenger
          {...props}
          onSelect={() => {
            props.setActiveChannel?.(props.channel, props.watchers);
            onClose();
          }}
        />
      ),
      [onClose],
    );
  
  return (
    <div className={cn("custom-scrollbar size-full flex flex-col gap-4 lg:block relative h-full overflow-y-auto  lg:w-[35%] border-r border-gray-600",open ? "flex " : "hidden")}>
       <div className='h-2 absolute left-0 w-full bg-black top-0 z-20'/>
       <div className='flex gap-2 px-1 items-center pt-2 pb-2 sticky top-4 border-b border-gray-600  z-20 bg-black'>
        
        <BackButton/>
        <h1 className='text-2xl font-semibold text-gray-200'>Messages</h1>
        <Button size={"icon"}  title='Start new chat' className='ml-auto bg-black rounded-full hover:bg-gray-800'>
          <Users className='text-[#fff]'/>
        </Button>
       </div>
       <div className='mt-4'>
       <ChannelList
       
        filters={{
          type:"messaging",
          members:{$in:[session.data.user.id!]}
        }}
        showChannelSearch
        options={{state:true,presence:true,limit:8}}
        sort={{last_message_at:-1}}
        additionalChannelSearchProps={{
          searchForChannels:true,
          searchQueryParams:{
            channelFilters:{
              filters:{ members:{$in:[session.data.user.id!]}}
            }
          }
        }}
        Preview={ChannelPreviewCustom}
        />
       </div>
        
    </div>
  )
}
