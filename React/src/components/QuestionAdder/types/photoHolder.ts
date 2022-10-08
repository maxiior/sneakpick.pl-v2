import { Dispatch, SetStateAction } from "react";

export interface iPhotoHolder {
  index: number;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  setImagesError: Dispatch<SetStateAction<boolean | string>>;
}
