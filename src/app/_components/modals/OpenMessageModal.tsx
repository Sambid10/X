"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { UserInputPage, UserData } from "@/lib/types";
import SearchedUserProfile from "@/app/(protected)/home/search/SearchedUserProfile";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const OpenMessageModal = ({ open, setOpen }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [user, setUser] = useState<UserInputPage | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  // Fetch users when the debounced search value changes
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      if (debouncedSearch.trim() !== "") {
        try {
          const response = await fetch(`/api/user/${debouncedSearch}`);
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    loadUsers();
  }, [debouncedSearch]);

  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(false)}>
      <AlertDialogContent className="w-[80%] md:w-[60%] lg:w-[40%] border-none  p-0">
        <div className="sticky top-0 bg-black z-10 pt-4">
        <AlertDialogTitle className="px-4 text-2xl text-gray-200">New Message</AlertDialogTitle>
        <div className="relative  ">
          <Input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search People"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "h-12 pl-12 border-b  border-gray-600 border-t-0  border-l-0 border-r-0 rounded-none focus-visible:ring-0",
              isFocused && "border-blue-500"
            )}
          />
          <Search
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 text-gray-200 transition-colors",
              isFocused && "text-blue-500"
            )}
          />
        </div>
        </div>
       
        {loading && (
          <div className="flex justify-center w-full">
            <Loader2 className="animate-spin text-blue-500" />
          </div>
        )}
        <div className="min-h-[30rem] -mt-4">
          {!loading && user && (
            <div>
              {user.users.length > 0 ? (
                user.users.map((user: UserData, index: number) => (
                  <SearchedUserProfile
                    user={user}
                    key={index}
                    className=" py-4"
                  />
                ))
              ) : (
                <div className="text-center mt-4 text-xl text-gray-200">
                  No users found
                  
                </div>
              )}
            </div>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
