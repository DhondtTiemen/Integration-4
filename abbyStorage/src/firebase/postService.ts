import { collection, doc, getDocs, query, updateDoc, getDoc } from "firebase/firestore";
import db from "../firebase/firebase";
import type PostType from "../interfaces/interface.post";
import type { Ref } from "vue";

export async function fetchPosts(): Promise<PostType[]> {
  try {
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);

    const postList: PostType[] = [];
    querySnapshot.forEach((doc) => {
      postList.push({ id: doc.id, ...doc.data() } as PostType);
    });

    return postList.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error("Error fetching posts data:", error);
    return [];
  }
}

/**
 * Haalt een enkele post op uit Firestore aan de hand van ID
 * @param postId - De ID van de post
 * @returns Een post object of null als deze niet gevonden is
 */
export async function getPostById(postId: string): Promise<PostType | null> {
  try {
    const postDoc = await getDoc(doc(db, "posts", postId));
    if (postDoc.exists()) {
      return { id: postDoc.id, ...postDoc.data() } as PostType;
    }
    return null;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return null;
  }
}

/**
 * Check if a user has liked a post
 * @param likes - lijst van userId's die de post geliket hebben
 * @param userId - de id van de gebruiker (string of null)
 * @returns true als de userId voorkomt in de likes array
 */
export function hasUserLikedPost(likes: string[], userId: string | null): boolean {
  return userId !== null && likes.includes(String(userId));
}

/**
 * Toggle like status van een gebruiker op een post en update Firestore
 * @param postId - ID van de post
 * @param userId - ID van de gebruiker (string of number)
 * @param likesRef - een Vue Ref die de lijst met likes bevat
 */
export async function toggleLikeForPost(
  postId: string,
  userId: string | number,
  likesRef: Ref<string[]>
) {
  const userIdStr = String(userId);
  const idx = likesRef.value.indexOf(userIdStr);

  if (idx === -1) {
    likesRef.value.push(userIdStr);
  } else {
    likesRef.value.splice(idx, 1);
  }

  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    likes: [...likesRef.value],
  });
}

/**
 * Check if a user has liked a comment
 * @param commentLikes - lijst van userId's die de comment geliket hebben
 * @param userId - de id van de gebruiker (string of null)
 * @returns true als de userId voorkomt in de likes array
 */
export function hasUserLikedComment(commentLikes: string[], userId: string | null): boolean {
  return userId !== null && commentLikes.includes(String(userId));
}

/**
 * Toggle like status van een gebruiker op een comment en update Firestore
 * @param postId - ID van de post
 * @param comment - comment object to identify the comment
 * @param userId - ID van de gebruiker (string of number)
 * @param commentsRef - een Vue Ref die de lijst met comments bevat
 */
export async function toggleLikeForComment(
  postId: string,
  comment: any,
  userId: string | number,
  comments: any[]
) {
  const userIdStr = String(userId);
  const index = comments.findIndex(
    (c) =>
      c.userId === comment.userId &&
      c.timestamp === comment.timestamp &&
      c.text === comment.text
  );
  const commentToUpdate = comments[index];
  commentToUpdate.likes = commentToUpdate.likes || [];

  const idx = commentToUpdate.likes.map(String).indexOf(userIdStr);
  if (idx === -1) {
    commentToUpdate.likes.push(userIdStr);
  } else {
    commentToUpdate.likes.splice(idx, 1);
  }

  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    comments: [...comments],
  });
}

/**
 * Fetch unique users associated with a list of comments
 * @param comments - list of comment objects with userId
 * @returns an object mapping userIds to user data
 */
export async function fetchCommentAuthors(comments: any[]): Promise<Record<string, any>> {
  const uniqueUserIds = [...new Set(comments.map((c) => c.userId))];
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

/**
 * Add a new comment to a post and update it in Firestore
 * @param postId - ID of the post to comment on
 * @param comment - the comment object to be added
 * @param commentsRef - a Vue Ref to the existing list of comments
 */
export async function addCommentToPost(
  postId: string,
  comment: any,
  comments: any[] // geen Ref<>
): Promise<any[]> {
  comments.push(comment);

  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    comments: [...comments],
  });

  return comments;
}