export const getIndexedFilters = (filters: string[]) => {
  return filters.map((category, index) => {
    return { id: index, text: category };
  });
};
