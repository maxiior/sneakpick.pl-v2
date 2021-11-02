import { routes, endpoints } from "routes";

export const getPhoto = (photo: String) => {
  return routes.DOMAIN + endpoints.IMAGES + photo;
};
