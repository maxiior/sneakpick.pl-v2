import http from "api/http";
import { endpoints } from "routes";

export const fetchSteals = async (limit: number, offset: number) => {
  const { data } = await http.get(
    endpoints.GET_STEALS.replace("{0}", limit.toString()).replace(
      "{1}",
      offset.toString()
    )
  );
  return data;
};

export const addSteal = async (data: any) => {
  return await http.post(endpoints.POST_ADD_STEAL, data);
};
