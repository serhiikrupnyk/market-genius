import firebase_app from "../config";
import {
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

export default async function sendPasswordReset(email: string) {
  let result = null, // Variable to store the sign-up result
    error = null; // Variable to store any error that occurs

  try {
    result = await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3000"
    });
  } catch (e) {
    error = e;
  }

  return { result, error }; // Return the result and error (if any)
}
