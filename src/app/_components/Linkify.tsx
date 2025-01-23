import Link from "next/link";
import React from "react";
import {LinkIt, LinkItUrl} from "react-linkify-it"
interface LinkifyProps {
    children: React.ReactNode;
  }
export const Linkify=({children}:LinkifyProps)=>{
return(
    <LinkHashtag>
    <LinkItUrl>
     {children}
    </LinkItUrl>
</LinkHashtag>    
   
)
}

export const LinkUrl=({children}:LinkifyProps)=>{
    return(
        <LinkItUrl >
            <h1 className="text-blue-400 hover:underline underline-offset-2">{children}</h1>
        </LinkItUrl>
    )
}
export const LinkHashtag=({children}:LinkifyProps)=>{
    return(
        <LinkIt
        regex={/(#[a-zA-Z0-9]+)/}
        component={(match,key)=>(
            <Link
            href={`/hastag/${match.slice(1)}`}
            key={key}
            className="text-blue-400 hover:underline"
            >
                {match}
            </Link>
        )}
        >
        {children}
        </LinkIt>
    )
}