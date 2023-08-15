import client from "../axios";

import type { ErrorResponse, LoginCredentials } from "@/types";

export const getIsFirstUser = async (
  apiBaseUrl: string,
): Promise<{
  signUp: boolean;
}> => {
  const response = await client(apiBaseUrl).get(`signup/admin`);

  if (response.data.status === "ERROR") {
    throw new Error(response.data.message);
  } else {
    return response.data;
  }
};

export const signUpFirstUser = async (
  credential: LoginCredentials,
  apiBaseUrl: string,
): Promise<any> => {
  const response = await client(apiBaseUrl).post(`signup/admin`, credential, {
    withCredentials: true,
  });

  if (response.data.status === "ERROR") {
    throw new Error(response.data.message);
  } else {
    return response.data;
  }
};
