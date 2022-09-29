import { iImage } from "types/image";

export interface iItem {
  id: string;
  brand: string;
  category: string;
  colorway: string;
  condition: string;
  description: string;
  first_name: string;
  last_name: string;
  fit: string;
  images: iImage[];
  is_bumped: boolean;
  is_followed: boolean;
  kind: string;
  meet: boolean;
  name: string;
  owner: string;
  price: string;
  published: string;
  ship: boolean;
  size: string;
  total_bumps: number;
  for_trade: boolean;
  views: number;
}
