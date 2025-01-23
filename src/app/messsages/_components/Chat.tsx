"use client"
import { useChatContext } from 'stream-chat-react'
import React, { useState } from 'react'
import useInitializeChatClient from '../hooks/useInitializeChatClient'
import { Loader2 } from 'lucide-react'
import { Chat as StreamChat,Streami18n } from "stream-chat-react"
import ChatSidebar from './ChatSideBar'
import ChatChannel from './ChatChannel'

export default function Chat() {
    
    const i18nInstance = new Streami18n({
        language: "en",
        translationsForLanguage: {
          "Nothing yet...": "Be the first one to say Hi!!",
        },
      });
    const [sidebarOpen,setSidebarOpen]=useState(true)
    const chatClient = useInitializeChatClient()
    if (!chatClient) {
        return <Loader2 className='mx-auto my-3 animate-spin' />
    }
    return (
        
        <div className='h-full w-full '>
            <div className=" absolute  left-0 top-0 bottom-0  flex w-full">
                <StreamChat
                    defaultLanguage='en'
                    i18nInstance={i18nInstance}
                    theme="str-chat__theme-dark"
                    client={chatClient}
                >
                    <ChatSidebar
                        open={sidebarOpen}
                        onClose={()=>setSidebarOpen(false)}
                        />  
                 
                        <ChatChannel
                         open={!sidebarOpen}
                        openSidebar={()=>setSidebarOpen(true)}
                        />
                </StreamChat>
            </div>
        </div>
    )
}   
