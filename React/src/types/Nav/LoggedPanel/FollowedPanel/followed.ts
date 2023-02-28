import { iImage } from "types/image";

export interface iFollowed {
  name: string;
  size: string;
  condition: string;
  price: string;
  id: string;
  images: iImage[];
}
