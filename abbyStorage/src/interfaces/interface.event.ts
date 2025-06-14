export default interface Event {
  id: string;
  title: string;
  about: string;
  date: string; // ISO datum als string, bv. "2025-05-31"
  time: string; // tijd als string, bv. "10:00"
  place: string;
  achievements: string[];
  materials: string[];
  image: string;
  createdBy: string; // userId van de maker
  participants: string[]; // array van userIds
  status: "approved" | "pending" | "rejected"; // of alleen string als meerdere statussen mogelijk
  type?: string; // Added to support dynamic property
}
