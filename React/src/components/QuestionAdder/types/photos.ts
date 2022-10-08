import { Dispatch, SetStateAction } from "react";

export interface iPhotos {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  setImagesError: Dispatch<SetStateAction<boolean | string>>;
  imagesError: string;
}
