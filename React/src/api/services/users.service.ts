import http from "api/http";
import { endpoints } from "routes";
import { iNewEmail } from "types/NewEmail/newEmail";

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

export const sendEmailChangingMessage = async ({
  password,
}: {
  password: string;
}) => {
  try {
    return await http.post(endpoints.POST_EMAIL_UPDATE_MESSAGE, {
      password,
    });
  } catch (e) {
    throw e;
  }
};

export const setNewEmail = async (
  data: iNewEmail,
  token: string,
  uidb64: string
) => {
  return await http.put(
    endpoints.PUT_NEW_EMAIL.replace("{token}", token).replace(
      "{uidb64}",
      uidb64
    ),
    {
      password: data.password,
      new_email: data.newEmail,
    }
  );
};

export const activateNewEmail = async (uidb64: string, token: string) => {
  try {
    return await http.post(
      endpoints.POST_NEW_EMAIL_ACTIVATION.replace("{token}", token).replace(
        "{uidb64}",
        uidb64
      )
    );
  } catch (e) {
    throw e;
  }
};
