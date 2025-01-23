import { useEffect, useState } from "react"

export const useDebounce=<T>(value:T,delay:500)=>{
    const [debounceValue,setdebounceValue]=useState<T>(value)
   useEffect(()=>{
    const timeout=setTimeout(()=>{
        setdebounceValue(value)
    },delay)
    return ()=>clearTimeout(timeout)
   },[value,delay])
   return debounceValue
}