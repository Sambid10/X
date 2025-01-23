"use client"
import { Avatar,AvatarFallback} from "@/components/ui/avatar";
import { useModal } from "@/hooks/use-modal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
export default function UserButton({clickable}:{
  clickable:boolean
}) {
  const {onOpen}=useModal()
  const session=useSession()
  const user=session.data?.user
  const img=user?.image
  
  return (
    <div 
    onClick={()=>(clickable && onOpen("logout"))}
    className={cn("flex xl:gap-3 cursor-pointer items-center justify-center xl:justify-normal  w-full rounded-xl transition-colors ease-in duration-200  ",{
      "hover:bg-[#121212]": clickable
    })}>
    <Avatar className="relative">
      {user &&   

         <img  src={`${img}` || "/avatar-placholder.png"}  alt="profile" className="object-center border brightness-90 border-gray-800 flex justify-center   w-full rounded-full"/>
    
     }
      {!user && session.status == "loading" &&  <AvatarFallback>CN</AvatarFallback>}
       
    </Avatar>
    <div className="flex-flex-col relative">
    {user && clickable && <div className="text-[1.15rem] text-gray-200 hidden xl:flex xl:flex-col "> 
      <h1>{user.name}</h1>
      <h1 className="text-sm text-gray-400">@{user.displayname}</h1>
      </div>} 
     <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
     {!user && clickable && session.status == "loading" && <LoaderCircle className="animate-spin text-button hidden xl:block"/> }

     </div>
     
    </div>
    </div>
  );
}
