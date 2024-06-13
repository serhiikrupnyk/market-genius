"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import firebase_app from "@/firebase/config";
import LoadSpinner from "@/components/LoadSpinner";
import { usePathname, useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
};

const auth = getAuth(firebase_app);

export const AuthContext = createContext<AuthContextType>({ user: null });

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
      // Set loading to false once authentication state is determined
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (
      user === null &&
      !pathname.includes("/signin") &&
      !pathname.includes("/signup") &&
      !pathname.includes("/forgot-password")
    ) {
      router.push("/signin");
    }
  }, [user, router]);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <LoadSpinner /> : children}
    </AuthContext.Provider>
  );
}
