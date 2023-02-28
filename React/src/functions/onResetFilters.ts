import { routes } from "routes";

export const onResetFilters = (navigate: any) => {
  navigate({
    pathname: "",
    search: routes.DEFAULT_SEARCH,
  });
  window.scrollTo(0, 0);
};
