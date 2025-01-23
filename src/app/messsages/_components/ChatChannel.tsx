import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, Ghost, Icon, Menu } from 'lucide-react'
import React from 'react'
import { Channel ,ChannelHeader,ChannelHeaderProps,ChannelList,MessageInput,MessageList,Window} from 'stream-chat-react'
interface Props{
  open:boolean,
  openSidebar:()=>void
}
export default function ChatChannel({open,openSidebar}:Props) {
  return (
    <div className={cn(' lg:block w-full  lg:w-[75%]   xl:flex xl:flex-1 h-[100dvh] overflow-y-auto ',!open && "hidden")}>
    
        <Channel>
            <Window>
                <CustomChannelHeader openSidebar={openSidebar}/>
                <MessageList />
                <MessageInput/>
            </Window>
        </Channel>
    </div>
  )
}

interface CustomChannelHeaderProps extends ChannelHeaderProps{
  openSidebar:()=>void
}
function CustomChannelHeader({openSidebar,...props}:CustomChannelHeaderProps){
  return (
    <div className='pl-1 flex items-center   mt-[0.55rem] w-full border-b border-gray-600'>
    
        <Button variant={'ghost'} size={'icon'} onClick={openSidebar} className=' xl:hidden rounded-full hover:bg-gray-800 '>
          <ChevronLeft className='size-5'/>
        </Button>
      
      <ChannelHeader {...props}/>
    </div>
    
  )
}
