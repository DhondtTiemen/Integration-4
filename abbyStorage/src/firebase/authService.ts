import { getDocs, collection } from "firebase/firestore";

import db from "./firebase.ts";
import type User from "../interfaces/interface.user.ts";

/**
 * Converts a partial Firestore user document into a complete User object
 * with safe fallback values.
 */
function normalizeUser(id: string, data: Partial<User>): User {
  return {
    id,
    name: data.name || "",
    mail: data.mail || "",
    password: data.password || "",
    avatar: data.avatar || "",
    bio: data.bio || "",
    followers: data.followers || [],
    following: data.following || [],
    achievements: data.achievements || [],
    box: data.box || {
      boxNumber: 0,
      createdAt: "",
      likes: [],
      views: 0,
      mainImage: "",
      items: [],
      description: "",
      comments: []
    },
    posts: data.posts || [],
  };
}

export async function loginUser(email: string, password: string): Promise<User | null> {
  const querySnap = await getDocs(collection(db, "users"));

  for (const doc of querySnap.docs) {
    const data = doc.data() as Partial<User>;
    const user = normalizeUser(doc.id, data);

    if (user.mail === email && user.password === password) {
      return user;
    }
  }

  return null;
}