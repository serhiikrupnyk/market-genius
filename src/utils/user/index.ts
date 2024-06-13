import firebase_app, { db } from "@/firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { UserData } from "../../../types/users";

export const getUsersCollectionRef = () => collection(db, "users");
export const getUserRef = (uid: string) => doc(getUsersCollectionRef(), uid);
export const storage = getStorage(
  firebase_app,
  `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`
);

export const setUser = (uid: string, data: Partial<UserData>) =>
  setDoc(getUserRef(uid), data, { merge: true });
