import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/firebase";
import type User from "../interfaces/interface.user";

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const userRef = doc(db, "users", id);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as User;
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return null;
  }
};