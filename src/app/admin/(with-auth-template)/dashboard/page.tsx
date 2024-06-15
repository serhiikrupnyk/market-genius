"use client";
import useUserData from "@/hooks/useUserData";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function Page(): JSX.Element {
  const { user, userData } = useUserData();
  useEffect(() => {
    if(!user) {
      redirect("/signin")
    }
  }, [])
  return (
    <div className="slot-pad h-screen">
      <div className="pl-5 pr-5">Welcome back {user?.displayName}</div>
    </div>
  );
}

export default Page;
