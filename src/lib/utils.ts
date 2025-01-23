import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import cache from "react"
import { db } from "./db"
import { getUserDataSelect } from "./types"
import { notFound } from "next/navigation"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatpostsNumber(n:number):string{
  return Intl.NumberFormat('en-Us',{
    notation:"compact",
    maximumFractionDigits:1
  }).format(n)
}

export const getUserInfo = (async (username: string) => {
  const user = await db.user.findFirst({
      where: {
          displayname: {
              equals: username,
              mode: "insensitive"
          }
      },
      select: getUserDataSelect(username)
  })
  if (!user) notFound()
  return user
})
