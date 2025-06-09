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
    views: number;
    mainImage: string;
    items: { name: string; image: string }[];
    description: string;
    comments: {
      userId: number;
      text: string;
      timestamp: string;
      likes: number[];
    }[];
  };
  createdEvents: number[];
  attendedEvents: number[];
}
