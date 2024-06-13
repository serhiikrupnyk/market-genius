import { getUserRef, setUser } from "@/utils/user";
import { UserData } from "../../../types/users";
import firebase_app from "../config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { getDoc } from "firebase/firestore";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);
export const googleAuthProvider = new GoogleAuthProvider();

// Function to sign up a user with email and password
export default async function signInWithGoogle() {
  let result = null, // Variable to store the sign-up result
    error = null; // Variable to store any error that occurs

  try {
    result = await signInWithPopup(auth, googleAuthProvider); // Create a new user with email and password
    const user = result.user;
    const { displayName, email, uid } = user;
    const [firstName, lastName] = displayName
      ? displayName.split(" ")
      : ["", ""];
    const userData: UserData = {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      avatarUrl: "",
      phoneNumber: "",
      planStatus: "base",
    };
    const userDocRef = getUserRef(uid);
    const userDocSnapshot = await getDoc(userDocRef);
    
    if (!userDocSnapshot.exists()) {
      await setUser(uid, userData);
    }
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-up
  }

  return { result, error }; // Return the sign-up result and error (if any)
}
