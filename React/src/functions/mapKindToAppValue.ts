export const mapKindToAppValue = (value: string) => {
  if (value === "man") return "męski";
  else if (value === "woman") return "damski";
  else return value;
};
