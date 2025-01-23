import { Loader2 } from "lucide-react";
import Image from "next/image";
export default function Loading() {
  return(
  <div className="min-h-[100dvh] flex items-center justify-center">
    <Image
    className="animate-pulse"
    src={"/gmail.svg"}
    height={100}
    width={100}
    alt="pic"
    />
    </div>)
}