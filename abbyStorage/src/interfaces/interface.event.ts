export default interface Event {
  id: string;
  title: string;
  about: string;
  date: string; 
  time: string; 
  place: string;
  achievements: string[];
  materials: string[];
  image: string;
  createdBy: string; 
  participants: string[]; 
  status: string; 
  type?: string; 
  gallery?: string[];
}
