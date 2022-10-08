import http from "api/http";
import { endpoints } from "routes";

export const addQuestion = async (data: any) => {
  return await http.post(endpoints.POST_ADD_QUESTION, data);
};

export const getAllQuestions = async () => {
  return await http.get(endpoints.GET_ALL_QUESTIONS);
};

export const bumpQuestion = async (id: string) => {
  try {
    return await http.post(endpoints.POST_BUMP_QUESTION.replace("{uuid}", id));
  } catch (e) {
    throw e;
  }
};
