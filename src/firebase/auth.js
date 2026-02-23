import app from "./firebaseConfig";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();