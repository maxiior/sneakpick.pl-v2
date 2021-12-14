import axios from "axios";
import { endpoints } from "routes";

const http = axios.create({
  baseURL: endpoints.HOST,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const originalRequest = error.config;

    // if (typeof error.response === "undefined") {
    //   alert(
    //     "A server/network error occurred. " +
    //       "Looks like CORS might be the problem. " +
    //       "Sorry about this - we will get it fixed shortly."
    //   );
    //   return Promise.reject(error);
    // }

    // if (
    //   error.response.status === 401 &&
    //   originalRequest.url === baseURL + "token/refresh/"
    // ) {
    //   window.location.href = "/login/";
    //   return Promise.reject(error);
    // }

    // if (
    //   error.response.data.code === "token_not_valid" &&
    //   error.response.status === 401 &&
    //   error.response.statusText === "Unauthorized"
    // ) {
    //   const refreshToken = localStorage.getItem("refresh_token");

    //   if (refreshToken) {
    //     const tokenParts = JSON.parse(
    //       Buffer.from(refreshToken.split(".")[1], "base64")
    //     );

    //     const now = Math.ceil(Date.now() / 1000);
    //     console.log(tokenParts.exp);

    //     if (tokenParts.exp > now) {
    //       return refresh(refreshToken)
    //         .then((response) => {
    //           localStorage.setItem("access_token", response.data.access);
    //           localStorage.setItem("refresh_token", response.data.refresh);

    //           http.defaults.headers["Authorization"] =
    //             "JWT " + response.data.access;
    //           originalRequest.headers["Authorization"] =
    //             "JWT " + response.data.access;

    //           return http(originalRequest);
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     } else {
    //       console.log("Refresh token is expired", tokenParts.exp, now);
    //       window.location.href = "/login/";
    //     }
    //   } else {
    //     console.log("Refresh token not available.");
    //     window.location.href = "/login/";
    //   }
    // }

    return Promise.reject(error);
  }
);

export default http;
