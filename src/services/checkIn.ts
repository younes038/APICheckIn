import { User } from './user';

export class CheckIn {
  id: number;
  created_at: string;
  lat: number;
  lng: number;
  weather: any;
  image_path: string;
  user: User;
}