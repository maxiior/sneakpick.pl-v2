import { routes } from "routes";

export const onResetFilters = (history: any) => {
  history.push({
    pathname: "",
    search: routes.DEFAULT_SEARCH,
  });
  window.scrollTo(0, 0);
};
