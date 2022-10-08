import { IImage } from "./image";

export interface IPost {
  category: string;
  description: string;
  first_name: string;
  id: string;
  images: IImage[];
  is_bumped: boolean;
  last_name: string;
  owner: string;
  published: string;
  title: string;
  total_bumps: number;
  views: number;
  profile_photo: string;
  item: string;
}
