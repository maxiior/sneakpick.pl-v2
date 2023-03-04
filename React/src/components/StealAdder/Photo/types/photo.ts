import { Dispatch, SetStateAction } from "react";

export interface iPhoto {
  image: File;
  imageError?: string;
  setImage: Dispatch<SetStateAction<File>>;
  setImageError: Dispatch<SetStateAction<string>>;
}
