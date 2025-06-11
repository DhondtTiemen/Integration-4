export default interface Post {
  id: string;
  userId: string;
  timestamp: string;
  content: string;
  images: string[];
  location: string;
  likes: string[];
  eventId: string; // gebruik `string` als het soms leeg is: ""
  comments: {
    userId: string;
    text: string;
    timestamp: string;
    likes: string[];
  }[];
  views: number;
}
