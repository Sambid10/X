"use client"
import { Bookmark, DollarSign, Group, Pen, Settings, SettingsIcon, User2 } from "lucide-react"
import Image from "next/image"
import UserButton from "./UserButton"
import { IoHomeOutline } from "react-icons/io5";
import SidebarLinks from "./SidebarLinks"
import { FaBell, FaCalendar, FaFacebookMessenger, FaHome, FaRobot,FaSearch } from "react-icons/fa"
import { FcOrganization, FcSettings } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { IconType } from "react-icons";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { BsBookmark, BsPeople } from "react-icons/bs";
import { CiDollar } from "react-icons/ci";
import { cn } from "@/lib/utils";
export interface NavLinksInterface {
  title: string,
  url?: string,
  icon: IconType
}
export const items: NavLinksInterface[] = [
  {
    title: "Home",
    url:"/home",
    icon: IoHomeOutline ,
  },
  {
    title: "Explore",
    url:"/home/search",
    icon: FaSearch ,
  },
  {
    title: "Notifications",
    url:"/home/notification",
    icon: FaBell ,
  },
  {
    title: "Messages",
    url:"/messsages",
    icon: FaFacebookMessenger ,
  },
  {
    title: "Gorks",
    url:"#",
    icon: FaRobot ,
  },
  {
    title: "Bookmarks",
    url:"/home/bookmark",
    icon: BsBookmark ,
  },
  {
    title: "Communities",
    url:"#",
    icon: BsPeople ,
  },
  {
    title: "Premium",
    url:"/premium",
    icon: CiDollar ,
  },
  {
    title: "Verified Orgs",
    url:"#",
    icon: FcOrganization ,
  },
  // {
  //   title: "Profile",
  //   icon: <User2 />,
  // },
]

export default function AppSidebar({className}:{
  className?:string
}) {
  const { onOpen } = useModal()
  const session = useSession()
  return (
    <div className={cn("sticky top-0 w-[15%]  md:w-[12%] lg:w-[8%] xl:w-[20%]  border-r border-gray-600  max-h-[100dvh] overflow-y-auto custom-scrollbar  md:pr-4 lg:pr-0  xl:pl-2 ",className)}>

      <div className="flex flex-col justify-between py-6 h-full  w-full xl:pr-4 sm:pl-2 md:pl-0">
        <div className="flex flex-col items-center justify-start  w-full ">
          <div className="flex justify-center xl:justify-start  w-full">
          <Image
            src={"/gmail.svg"}
            height={40}
            alt="logo"
           
            width={40}
          />
          </div>
         
           <div className="w-full  mt-4">
          {items.map((link, i) =>
            <div key={i} className="">
              <SidebarLinks link={link} />
              {/* <div className="h-[4px] xl:h-[0px]" /> */}
            </div>
          )}
          <div className="flex justify-center w-full">
            <Button
              className="bg-[#000] text-center border-blue-200 border hover:bg-[#121212] h-[42px] mt-4 w-[42px] transition-colors ease-in   duration-200 text-[#fff] xl:w-full  xl:py-[1.25rem] py-0 rounded-full">
              <Link
                prefetch={true}
                href={`/home/user/${session.data?.user.displayname}`}
                className="w-full flex justify-center items-center">
                <User2 className="block xl:hidden" />
                <h1 className="font-semibold text-lg hidden xl:block">Profile</h1></Link></Button>
          </div>

          <div className="flex justify-center w-full">


            <Button
              onClick={() => onOpen("createPost")}
              className="bg-button hover:bg-[#1a6a9c] h-[42px] mt-4 w-[42px] transition-colors ease-in   duration-200 text-[#fff] xl:w-full  xl:py-[1.25rem] py-0 rounded-full">
              <Pen className="block xl:hidden" />
              <h1 className="font-semibold text-lg hidden xl:block">Post</h1></Button>
          </div>

        </div>
        </div>
       
        <div className="block">
          <UserButton clickable={true} />
        </div>
      </div>
    </div>

  )
}
