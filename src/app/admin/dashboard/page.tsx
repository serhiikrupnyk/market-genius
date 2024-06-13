"use client";
import { logout } from "@/firebase/auth/signOut";

function Page(): JSX.Element {
  const handleSignOut = async () => {
    await logout();
  };

  return (
    <div>
      Dashboard
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}

export default Page;
