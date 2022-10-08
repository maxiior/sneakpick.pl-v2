import { routes } from "routes";

export const getPhoto = (photo: string, endpoint: string) => {
  return routes.DOMAIN + endpoint + photo;
};
