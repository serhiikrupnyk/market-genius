"use client";
import useUserData from "@/hooks/useUserData";

function Page(): JSX.Element {
  const { user, userData } = useUserData();

  return (
    <div className="slot-pad h-screen">
      <div className="pl-5 pr-5">Welcome back {user?.displayName}</div>
    </div>
  );
}

export default Page;
