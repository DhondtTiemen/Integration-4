import type Post from "./interface.post";

export default interface User {
  id?: string;
  mail?: string;
  password?: string;
  name?: string;
  bio?: string;
  aboutMe?:string;
  avatar?: string;
  followers?: string[];
  following?: string[];
  achievements?: string[];
  box?: {
    boxNumber: number;
    createdAt: string;
    likes: string[];
    views: number;
    mainImage: string;
    items: [];
    description?: string;
    comments: {
      userId: string;
      text: string;
      timestamp: string;
      likes: string[];
    }[];
  };
  posts?: Post[];
}
