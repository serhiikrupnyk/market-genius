import { useAuthContext } from "@/context/AuthContext";
import { User } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserData } from "../../types/users";
import { getUserRef } from "@/utils/user";

type UseUserReturnType = {
  user: User | null;
  userData: UserData | null;
};

const useUserData = (): UseUserReturnType => {
  const { user } = useAuthContext();

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const unsubscribe = onSnapshot(getUserRef(user.uid), (doc) => {
      setUserData(doc.data() as UserData);
    });

    return unsubscribe;
  }, [user]);

  return {
    user,
    userData,
  };
};

export default useUserData;
