export default interface Event {
  id: number;
  title: string;
  about: string;
  date: string; // ISO datum als string, bv. "2025-05-31"
  time: string; // tijd als string, bv. "10:00"
  place: string;
  materials: string[];
  images: string[];
  createdBy: number; // userId van de maker
  participants: number[]; // array van userIds
  status: "approved" | "pending" | "rejected"; // of alleen string als meerdere statussen mogelijk
  type?: string; // Added to support dynamic property
}
