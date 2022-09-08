import http from "api/http";
import { endpoints } from "routes";

export const activation = async (uid: string, token: string) => {
  return await http.post(
    endpoints.ACCOUNT_ACTIVATION.replace("{uid}", uid).replace("{token}", token)
  );
};

export const sendPasswordResettingMessage = async (data: { email: string }) => {
  try {
    return await http.post(endpoints.PASSWORD_RESETTING_MESSAGE, {
      email: data.email,
    });
  } catch (e) {
    throw e;
  }
};

export const setNewPassword = async (
  data: {
    password: string;
    repeated_password: string;
  },
  uid: string,
  token: string
) => {
  try {
    return await http.put(
      endpoints.SET_NEW_PASSWORD.replace("{uid}", uid).replace(
        "{token}",
        token
      ),
      {
        password: data.password,
        repeated_password: data.repeated_password,
      }
    );
  } catch (e) {
    throw e;
  }
};
