export class ImageValidators {
  static readonly NO_IMAGES_ERROR: string =
    "Wymagane jest conajmniej jedno zdjęcie.";

  static readonly FILE_TYPE_ERROR: string =
    "Nieprawidłowy typ pliku. Dopuszczalne rozszerzenia to jpeg, png, jpg.";

  static readonly IMAGE_SIZE_ERROR: string =
    "Rozmiar pliku jest za duży. Maksymalny rozmiar to 5 MB.";

  static readonly ALLOWED_IMAGE_TYPES: string[] = [
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  static isTypeValid = (image: File) => {
    return this.ALLOWED_IMAGE_TYPES.includes(image.type);
  };

  static isSizeValid = (image: File) => {
    return image.size <= 5 * 1024 * 1024;
  };

  static validate = (images: File[]) => {
    if (images.length === 0) return this.NO_IMAGES_ERROR;
    let error: boolean | string = false;

    images.forEach((e) => {
      if (!this.isTypeValid(e)) error = this.FILE_TYPE_ERROR;
      if (!this.isSizeValid(e)) error = this.IMAGE_SIZE_ERROR;
    });

    return error;
  };
}
