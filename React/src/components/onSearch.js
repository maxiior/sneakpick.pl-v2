import { connect } from "react-redux";
import { fetchItems as fetchItemsAction } from "actions/WTB";
import { useHistory } from "react-router-dom";
import { useRef } from "react";

const useFirstRender = () => {
  const ref = useRef(true);
  const firstRender = ref.current;
  ref.current = false;
  return firstRender;
};

const OnSearch = ({
  currentPagination,
  currentPage,
  currentFilters,
  fetchItems,
}) => {
  let history = useHistory();
  let search = "?";

  console.log(useFirstRender());

  if (useFirstRender()) {
    history.push({
      pathname: "",
      search: window.location.search,
    });
  } else if (
    currentFilters.categories === "" &&
    currentFilters.brands.length === 0 &&
    currentFilters.types.length === 0 &&
    currentFilters.conditions.length === 0 &&
    currentFilters.fits.length === 0 &&
    currentFilters.colors.length === 0 &&
    window.location.search !== ""
  ) {
    history.push({
      pathname: "",
      search: "",
    });
  } else {
    if (currentFilters.categories !== "")
      search += "category=" + currentFilters.categories;
    if (currentFilters.brands.length !== 0) {
      search += "&brand=";
      currentFilters.brands.forEach((e, i, a) => {
        if (i === a.length - 1) search += e;
        else search += e + "+";
      });
    }
    if (currentFilters.types.length !== 0) {
      search += "&kind=";
      currentFilters.types.forEach((e, i, a) => {
        if (i === a.length - 1) search += e;
        else search += e + "+";
      });
    }
    if (currentFilters.conditions.length !== 0) {
      search += "&condition=";
      currentFilters.conditions.forEach((e, i, a) => {
        if (i === a.length - 1) search += e;
        else search += e + "+";
      });
    }
    if (currentFilters.fits.length !== 0) {
      search += "&fit=";
      currentFilters.fits.forEach((e, i, a) => {
        if (i === a.length - 1) search += e;
        else search += e + "+";
      });
    }
    if (currentFilters.colors.length !== 0) {
      search += "&colorway=";
      currentFilters.colors.forEach((e, i, a) => {
        if (i === a.length - 1) search += e;
        else search += e + "+";
      });
    }

    history.push({
      pathname: "",
      search: search,
    });
  }

  fetchItems(
    currentPagination,
    (currentPage - 1) * currentPagination,
    window.location.search
  );
  return null;
};

const mapStateToProps = ({ filtersReducer, itemsSelectorReducer }) => {
  return {
    currentFilters: filtersReducer.currentFilters,
    currentPagination: itemsSelectorReducer.currentPagination,
    currentPage: itemsSelectorReducer.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchItems: (limit, offset, search) =>
    dispatch(fetchItemsAction(limit, offset, search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnSearch);
