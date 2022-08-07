export const firstLetterUppercase = (str: String) => {
  if (str !== undefined) return str.charAt(0).toUpperCase() + str.slice(1);
  else return "";
};
