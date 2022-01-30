import { routes, endpoints } from "routes";

export const getUserPhoto = (photo: String) => {
  return routes.DOMAIN + endpoints.USER_IMAGES + photo;
};
