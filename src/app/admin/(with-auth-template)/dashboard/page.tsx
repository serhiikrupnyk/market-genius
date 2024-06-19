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
    <div className="pt-16 h-screen">
      <div className="pl-5 pr-5 pt-5 pb-5">Welcome back {user?.displayName}</div>
    </div>
  );
}

export default Page;
