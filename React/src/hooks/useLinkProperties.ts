import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "./useAppDispatch";
import { resetAllStates, changeState } from "store/filters/actions";
import { useAppSelector } from "./useAppSelector";
import { mapKindToAppValue } from "functions/mapKindToAppValue";
import { fetchItems } from "store/items/actions";
import { useHistory } from "react-router-dom";
import { routes } from "routes";

export const useLinkProperties = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();
  const filterTypes: { [key: string]: { name: string; input: string } } =
    useAppSelector((state) => state.filtersSlice.filterTypes);

  useEffect(() => {
    dispatch(resetAllStates());
    const properties = decodeURI(window.location.search.replace("?", ""));
    const splittedProperties = properties.split("&");

    var arr: any = [];

    try {
      splittedProperties.forEach((e) => {
        const prop: string[] = e.replace("__in", "").split("=");

        let values: string[] = prop[1].split(",");
        let query: string = "";

        values.forEach((e, i) => {
          if (i == values.length - 1) query += mapKindToAppValue(e);
          else query += mapKindToAppValue(e) + ",";
        });

        if (
          !["limit", "offset", "ordering"].includes(prop[0]) &&
          filterTypes[prop[0]]
        ) {
          arr.push({
            filterType: filterTypes[prop[0]].name,
            id: query,
            input: filterTypes[prop[0]].input,
          });
        }
      });

      dispatch(changeState(arr));
      const search = window.location.search
        .toLowerCase()
        .replace("shoessize", "size")
        .replace("clothesize", "size");
      dispatch(fetchItems(search));
    } catch (e) {
      history.push({
        pathname: "",
        search: routes.DEFAULT_SEARCH,
      });
      dispatch(fetchItems(routes.DEFAULT_SEARCH));
    }
  }, [location.search]);
};
