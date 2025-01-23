"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { UserInputPage, UserData } from "@/lib/types";
import SearchedUserProfile from "../(protected)/home/search/SearchedUserProfile";
import { Loader2 } from "lucide-react";
import useOnClickOutside from "@/customhooks/onClickOutside";
import Link from "next/link";
import { ta } from "date-fns/locale";
interface Hashtag {
  hashtag: string;
  count: number;
}
export default function SearchInput({ searchinput }: { searchinput?: string }) {
  const router = useRouter();
  const [input, setSearchinput] = useState("");
  const [hastag,sethastag]=useState<Hashtag[] | null>(null)
  const reference = useRef<HTMLDivElement>(null);
  const [inputclicked, setInputClicked] = useState(false);
  const [user, setUser] = useState<UserInputPage | null>();
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(input, 500);

  // Close the dropdown when clicking outside
  useOnClickOutside(reference, () => setInputClicked(false));

  // Fetch users on debounced search
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      if (debouncedSearch.trim() !== "") {
        try {
          const response = await fetch(`/api/user/${debouncedSearch}`);
          const data = await response.json();
        
          const response1=await fetch(`/api/searchhastag/${debouncedSearch}`)
          const data2=await response1.json()
          sethastag(data2)
          setUser(data);

        } catch (err) {
          console.error(err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    loadUser();
  }, [debouncedSearch]);

  const handleInputSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();

    if (!q) return;
    (form.q as HTMLInputElement).blur()
    setInputClicked(false)
    router.push(`/home/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div ref={reference} className="relative w-full">
      <form
        className="w-full"
        onSubmit={handleInputSearch}
        method="GET"
        action="/search"
      >
        <Input
          autoComplete="off"
          defaultValue={searchinput}
          onChange={(e) => setSearchinput(e.currentTarget.value)}
          
          onFocus={() => setInputClicked(true)}
          className="rounded-full px-10 focus:bg-black relative h-12 w-full focus-visible:ring-blue-600 bg-[#121212] border border-gray-700"
          name="q"
          placeholder={"Search"}
        />
        <SearchIcon
          size={22}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200"
        />
      </form>
      {inputclicked && (
        <div
          className="absolute top-full left-0 z-[99] mt-2 shadow-lg w-full bg-black rounded-2xl overflow-hidden border border-gray-600"
        >
          <div className="min-h-[20rem]">
            {loading && (
              <Loader2 className="animate-spin text-blue-500 flex justify-center items-center h-[20rem] mx-auto " />
            )}
            {!loading && !user && <h1 className="text-gray-400 text-base text-center pt-4">Try searching for people, lists, or keywords</h1>}
            {!loading && hastag &&
                hastag.map((tag) => (
                    <Link 
                    href={`/hastag/${tag.hashtag.split('#').pop()}`}
                    key={tag.hashtag} className="flex items-center h-12 hover:bg-[#121212] transition-all ease-in duration-200">
                        <div className="px-4 flex items-center h-full gap-4">
                        <SearchIcon/>
                        {tag.hashtag} 
                        </div>
                      
                    </Link>
                ))}
            {!loading && user && (
              <div>
                {user.users.length > 0 ? (
                  user.users.map((user: UserData, index: number) => (
                    <SearchedUserProfile
                      user={user}
                      key={index}
                      className="py-4"
                    />
                  ))
                ) : (
                  <div className="text-center pt-4 text-base text-gray-200">
                    No users found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
