import http from "api/http";
import { endpoints } from "routes";

export const addQuestion = async (data: any) => {
  return await http.post(endpoints.POST_ADD_QUESTION, data);
};

export const fetchQuestions = async (data: string, offset: number) => {
  try {
    return await http.get(
      endpoints.GET_ALL_QUESTIONS.replace("{filters}", data).replace(
        "{offset}",
        offset.toString()
      )
    );
  } catch (e) {
    throw e;
  }
};

export const bumpQuestion = async (id: string) => {
  try {
    return await http.post(endpoints.POST_BUMP_QUESTION.replace("{uuid}", id));
  } catch (e) {
    throw e;
  }
};

export const increaseQuestionViews = async (id: string) => {
  try {
    return await http.post(
      endpoints.POST_INCREASE_QUESTION_VIEWS.replace("{uuid}", id)
    );
  } catch (e) {
    throw e;
  }
};

export const fetchQuestion = async (id: string) => {
  return await http.get(endpoints.GET_QUESTION.replace("{id}", id));
};
