"use client"; 

import Link from "next/link"; 
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/toast";
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";

export default function HeaderActions() { 
  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        // Query client global user caching state flush operation clear
        queryClient.removeQueries({ queryKey: ["user"] });
        toast.add({
          title: "Logout successful",
          description: "You have successfully logged out.",
          type: "success",
        });
      },
    });
  };

  
  if (isLoading) {
    return <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />;
  }

  return (
    <div className="flex items-center gap-2">
      
      {!data ? (
        <>
          <Button nativeButton={false} render={<Link href="/login" />} variant="outline">
            User Login
          </Button>

          <Button nativeButton={false} render={<Link href="/request-connection" />}>
            Get Connection
          </Button>
        </>
      ) : (

        <>
          <Button nativeButton={false} render={<Link href="/profile" />} variant="ghost" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </Button>
          
          <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </>
      )}
    </div>
  );
}
