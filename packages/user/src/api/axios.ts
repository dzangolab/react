import axios from "axios";
import { addAxiosInterceptors } from "supertokens-web-js/recipe/session";

addAxiosInterceptors(axios);

const client = (baseURL: string) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      post: {
        "Content-Type": "application/json",
      },
    },
  });
};

export default client;
