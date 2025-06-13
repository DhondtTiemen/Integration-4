import type Post from "./interface.post";
import type Event from "./interface.event";

export default interface User {
  id: string;
  mail: string;
  password: string;
  name: string;
  bio: string;
  avatar: string;
  followers: string[];
  following: string[];
  achievements: string[];
  box: {
    boxNumber: number;
    createdAt: string;
    likes: string[];
    views: number;
    mainImage: string;
    items: { name: string; image: string }[];
    description?: string;
    comments: {
      userId: string;
      text: string;
      timestamp: string;
      likes: string[];
    }[];
  };
  posts: Post[];
  createdEvents: Event[];
  attendedEvents: Event[];
}
