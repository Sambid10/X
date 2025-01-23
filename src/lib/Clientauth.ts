import { useSession } from 'next-auth/react'

export default function useCurrentauth() {
    const session=useSession()
    return session.data?.user
}
