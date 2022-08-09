import { CATEGORIES } from "constants/categories";

export const getCategoriesIndexed = () => {
  return CATEGORIES.map((category, index) => {
    return { id: index, text: category };
  });
};
