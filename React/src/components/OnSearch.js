import { useEffect } from "react";
import { fetchItems } from "store/items/actions";
import { useHistory } from "react-router-dom";
import { useFirstRender } from "hooks/useFirstRender";
import { routes } from "routes";
import { useSelector, useDispatch } from "react-redux";

const OnSearch = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  let search = "?";
  const { currentFilters } = useSelector((state) => state.filtersSlice);
  const { sorting, page, pagination } = useSelector(
    (state) => state.selectorsSlice.currentSelectors
  );

  const render = useFirstRender();

  useEffect(() => {
    if (render) {
      if (window.location.search) search = window.location.search;
      else search = routes.DEFAULT_SEARCH;
      history.push({
        pathname: "",
        search: search,
      });
    } else {
      if (currentFilters.categories !== "")
        search += routes.CATEGORY + currentFilters.categories;
      if (currentFilters.brands.length !== 0) {
        if (search !== "?") search += "&";
        search += routes.BRAND;
        currentFilters.brands.forEach((e, i, a) => {
          if (i === a.length - 1) search += e;
          else search += e + "+";
        });
      }
      if (currentFilters.types.length !== 0) {
        if (search !== "?") search += "&";
        search += "kind=";
        currentFilters.types.forEach((e, i, a) => {
          if (i === a.length - 1) search += e;
          else search += e + "+";
        });
      }
      if (currentFilters.conditions.length !== 0) {
        if (search !== "?") search += "&";
        search += "condition=";
        currentFilters.conditions.forEach((e, i, a) => {
          if (i === a.length - 1) search += e;
          else search += e + "+";
        });
      }
      if (currentFilters.fits.length !== 0) {
        if (search !== "?") search += "&";
        search += "fit=";
        currentFilters.fits.forEach((e, i, a) => {
          if (i === a.length - 1) search += e;
          else search += e + "+";
        });
      }
      if (currentFilters.colors.length !== 0) {
        if (search !== "?") search += "&";
        search += "colorway=";
        currentFilters.colors.forEach((e, i, a) => {
          if (i === a.length - 1) search += e;
          else search += e + "+";
        });
      }
      if (search !== "?") search += "&";
      search += "limit=" + pagination.toString();
      search += "&offset=" + ((page - 1) * pagination).toString();
      search += "&ordering=" + (sorting + 1).toString();

      history.push({
        pathname: "",
        search: search,
      });
    }

    dispatch(fetchItems(window.location.search.toLowerCase()));
  }, [currentFilters, sorting, page, pagination]);

  return null;
};

export default OnSearch;
