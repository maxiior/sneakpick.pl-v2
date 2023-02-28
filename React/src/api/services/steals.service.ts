import http from "api/http";
import { endpoints } from "routes";

export const fetchSteals = async (offset: number) => {
  const { data } = await http.get(
    endpoints.GET_STEALS.replace("{0}", offset.toString())
  );
  return data;
};
