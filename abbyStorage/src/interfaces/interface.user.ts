export default interface User {
  id: number;
  mail: string;
  password: string;
  name: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  achievements: string[];
  box: {
    boxNumber: number;
    createdAt: string;
    likes: number;
    comments: number;
    views: number;
    mainImage: string;
    items: { name: string; image: string }[];
  };
  createdEvents: number[];
  attendedEvents: number[];
  posts: number[];
}
