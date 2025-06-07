export default interface Post {
  id: number;
  userId: number;
  timestamp: string;
  content: string;
  images: string[];
  location: string;
  likes: number[];
  eventId: number | string; // gebruik `string` als het soms leeg is: ""
  comments: {
    userId: number;
    text: string;
    timestamp: string;
  }[];
  bookmarks: number[];
  views: number;
}
