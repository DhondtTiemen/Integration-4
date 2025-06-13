import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "./firebase";

export async function getUserById(userId: string) {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
}

export async function updateBoxLikes(userId: string, likes: string[]) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { "box.likes": likes });
}

export async function updateBoxComments(userId: string, comments: any[]) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { "box.comments": comments });
}

export async function preloadCommentUsers(commentsArr: any[]) {
  const { doc, getDoc } = await import("firebase/firestore");
  const db = (await import("./firebase")).default;
  const uniqueUserIds = [...new Set(commentsArr.map((c) => c.userId))];
  const usersObj: Record<string, any> = {};
  await Promise.all(
    uniqueUserIds.map(async (id) => {
      const userRef = doc(db, "users", String(id));
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        usersObj[id] = { id: docSnap.id, ...docSnap.data() };
      }
    })
  );
  return usersObj;
}
export async function toggleLikeForBoxComment(
  userId: string,
  comment: any,
  likerId: string,
  commentsArr: any[]
) {
  // Zoek de juiste comment in de array
  const idx = commentsArr.findIndex(
    (c) =>
      c.userId === comment.userId &&
      c.timestamp === comment.timestamp &&
      c.text === comment.text
  );
  if (idx === -1) throw new Error("Comment not found");

  const likes = commentsArr[idx].likes || [];
  const likerIdStr = String(likerId);
  const likeIdx = likes.map(String).indexOf(likerIdStr);
  if (likeIdx === -1) {
    likes.push(likerIdStr);
  } else {
    likes.splice(likeIdx, 1);
  }
  commentsArr[idx].likes = likes;

  // Update Firestore
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { "box.comments": commentsArr });
}
