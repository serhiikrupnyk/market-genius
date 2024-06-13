import firebase_app from "../config";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebase_app);

export async function logout() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
