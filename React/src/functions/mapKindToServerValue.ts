export const mapKindToServerValue = (value: string) => {
  if (value === "męski") return "man";
  else if (value === "damski") return "woman";
  else return value;
};
