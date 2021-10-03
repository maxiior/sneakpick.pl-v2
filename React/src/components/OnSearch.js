import { connect } from "react-redux";
import { fetchItems as fetchItemsAction } from "actions/WTB";
import { useHistory } from "react-router-dom";
import { useFirstRender } from "hooks/useFirstRender";
import { routes } from "routes";
import { useSelector } from "react-redux";

const OnSearch = ({
  currentPagination,
  currentPage,
  fetchItems,
  currentSorting,
}) => {
  let history = useHistory();
  let search = "?";
  const { currentFilters } = useSelector((state) => state.filtersSlice);

  if (useFirstRender()) {
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
    search += "limit=" + currentPagination.toString();
    search += "&offset=" + ((currentPage - 1) * currentPagination).toString();
    search += "&ordering=" + (currentSorting + 1).toString();

    history.push({
      pathname: "",
      search: search,
    });
  }

  fetchItems(window.location.search);
  return null;
};

const mapStateToProps = ({ itemsSelectorReducer }) => {
  return {
    currentPagination: itemsSelectorReducer.currentPagination,
    currentPage: itemsSelectorReducer.currentPage,
    currentSorting: itemsSelectorReducer.currentSorting,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchItems: (limit, offset, search) =>
    dispatch(fetchItemsAction(limit, offset, search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnSearch);
