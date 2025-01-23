import { NavLinksInterface } from "@/app/_components/AppSidebar";
import { IoHomeOutline, IoPeople } from "react-icons/io5";
import { FaBell, FaFacebookMessenger, FaSearch } from "react-icons/fa"
export const NavbarLinks: NavLinksInterface[] = [
    {
      title: "Home",
      url: "#",
      icon: IoHomeOutline ,
    },
    {
      title: "Explore",
      url: "#",
      icon: FaSearch ,
    },
    {
      title: "Notifications",
      url: "#",
      icon: FaBell ,
    },
    {
      title: "Messages",
      url: "#",
      icon: FaFacebookMessenger ,
    },
    {
      title: "People",
      url: "#",
      icon: IoPeople ,
    },
  ]
  export type TabType = "for-you" | "following"