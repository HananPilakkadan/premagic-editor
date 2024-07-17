import axios from "axios";

const { REACT_APP_UNSPLASH_BASE_URL, REACT_APP_UNSPLASH_ACCESS_TOKEN } =
  process.env;

export const getAxiosInstance = async () => {
  console.log("koooi");
  const instance = axios.create({
    baseURL: REACT_APP_UNSPLASH_BASE_URL,
    // params: { lang },
    headers: {
      Accept: "application/json",
      Authorization: `Client-ID ${REACT_APP_UNSPLASH_ACCESS_TOKEN}`,
    },
  });
  instance.interceptors.request.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instance;
};
