import ky from 'ky'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { StreamChat } from 'stream-chat'

export default function useInitializeChatClient() {
    const session = useSession()
    const [chatClient, setChatClient] = useState<StreamChat | null>(null)
    const previousUserID=useRef<string | null>(null)
    useEffect(() => {
        // Exit early if there's no session data
        if (!session.data) return;
       
        const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!)
        client.connectUser(
            {
                id: session.data.user.id!,
                username: session.data?.user.name,
                name: session.data?.user.displayname,
                image: session.data?.user.image,
            },
            async () =>
                ky.get('/api/get-token')
                    .json<{ token: string }>()
                    .then((data) => data.token)
        )
            .then(() => setChatClient(client))
            .catch((error) => console.error('Failed to connect user', error))

        return () => {
            setChatClient(null)
            client.disconnectUser()
                .then(() => console.log('Connection closed'))
                .catch((error) => console.error('Failed to disconnect user', error))
        }
    }, [
        session.data?.user.id,
        session.data?.user.name,
        session.data?.user.displayname,
        session.data?.user.image,
    ])

    return chatClient
}
