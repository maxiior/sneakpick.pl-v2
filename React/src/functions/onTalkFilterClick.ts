export const onTalkFilterClick = (
  filterType: string,
  value: string,
  searchParams: any,
  setSearchParams: Function
) => {
  if (filterType === "ordering") searchParams.set(filterType, value);
  else {
    if (searchParams.get(filterType) !== value)
      searchParams.set(filterType, value);
    else searchParams.delete(filterType);
  }

  setSearchParams(searchParams);
};
