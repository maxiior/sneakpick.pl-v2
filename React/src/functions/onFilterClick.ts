import { mapKindToServerValue } from "./mapKindToServerValue";

export const onFilterClick = (
  filterType: string,
  value: string,
  input: string,
  history: any
) => {
  value = mapKindToServerValue(value);

  const properties = decodeURI(window.location.search.replace("?", ""));
  const splittedProperties = properties.split("&");

  const dict: { [key: string]: string } = {};

  splittedProperties.forEach((e) => {
    const prop: string[] = e.replace("__in", "").split("=");
    dict[prop[0]] = prop[1];
  });

  switch (input) {
    case "radio":
      if (!dict[filterType]) dict[filterType] = value;
      else {
        if (dict[filterType] === value) delete dict[filterType];
        else dict[filterType] = value;
      }
      break;

    case "checkbox":
      if (!dict[filterType]) dict[filterType] = value;
      else {
        let values: string[] = dict[filterType].split(",");
        let query: string = "";

        if (values.includes(value)) values = values.filter((e) => e !== value);
        else values.push(value);

        values.forEach((e, i) => {
          if (i == values.length - 1) query += e;
          else query += e + ",";
        });

        if (query === "") delete dict[filterType];
        else dict[filterType] = query;
      }
      break;
  }

  let search: string = "?";

  if (dict["category"]) {
    if (dict["category"] === "Sneakersy") delete dict["clotheSize"];
    else delete dict["shoesSize"];
  }

  Object.entries(dict).forEach((e, i) => {
    if (!["category", "limit", "offset", "ordering"].includes(e[0])) {
      if (i === Object.entries(dict).length - 1)
        search += e[0] + "__in=" + e[1];
      else search += e[0] + "__in=" + e[1] + "&";
    } else {
      if (i === Object.entries(dict).length - 1) search += e[0] + "=" + e[1];
      else search += e[0] + "=" + e[1] + "&";
    }
  });

  history.push({
    pathname: "",
    search: search,
  });
};
