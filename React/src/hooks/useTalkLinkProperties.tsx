import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "./useAppDispatch";
import { resetAllStates, changeState } from "store/filters/actions";
import { useAppSelector } from "./useAppSelector";
import { mapKindToAppValue } from "functions/mapKindToAppValue";
import { fetchItems } from "store/items/actions";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import { changeSelector } from "store/selectors/actions";
// import { useSearchParams } from "react-router-dom";

export const useTalkLinkProperties = () => {
  // const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();
  const filterTypes: { [key: string]: { name: string; input: string } } =
    useAppSelector((state) => state.filtersSlice.filterTypes);

  useEffect(() => {
    dispatch(resetAllStates());
    const properties = decodeURI(window.location.search.replace("?", ""));
    const splittedProperties = properties.split("&");

    var filters: any = [];
    var selectors: any = [];
    var limit = "";

    try {
      splittedProperties.forEach((e) => {
        const prop: string[] = e
          .replace("__in", "")
          .replace("__lte", "")
          .split("=");

        if (prop[0] === "limit") limit = prop[1];

        let values: string[] = prop[1].split(",");
        let query: string = "";

        values.forEach((e, i) => {
          if (i == values.length - 1) query += mapKindToAppValue(e);
          else query += mapKindToAppValue(e) + ",";
        });

        if (
          !["limit", "page", "ordering"].includes(prop[0]) &&
          filterTypes[prop[0]]
        ) {
          filters.push({
            filterType: filterTypes[prop[0]].name,
            id: query,
            input: filterTypes[prop[0]].input,
          });
        } else if (["limit", "ordering", "page"].includes(prop[0]) && prop[1]) {
          selectors.push({
            selectorType: prop[0],
            value: prop[1],
          });
        }
      });

      let search = "?";

      splittedProperties.forEach((e, i) => {
        const prop: string[] = e.split("=");

        if (prop[0] === "page")
          search +=
            "offset=" + ((parseInt(prop[1]) - 1) * parseInt(limit)).toString();
        else {
          search += prop[0] + "=" + prop[1];
        }

        if (i !== splittedProperties.length - 1) search += "&";
      });

      dispatch(changeState(filters));
      dispatch(changeSelector(selectors));

      dispatch(
        fetchItems(
          search
            .toLowerCase()
            .replace("shoessize", "size")
            .replace("clothesize", "size")
        )
      );
    } catch (e) {
      history.push({
        pathname: "",
        search: routes.DEFAULT_SEARCH,
      });
      dispatch(fetchItems(routes.DEFAULT_SEARCH));
    }
  }, [location.search]);
};
