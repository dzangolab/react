import client from "../axios";

import type { LoginCredentials, UserType } from "../../types";

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
): Promise<UserType> => {
  const response = await client(apiBaseUrl).post(`signup/admin`, credential, {
    withCredentials: true,
  });

  if (response.data.status === "ERROR") {
    throw new Error(response.data.message);
  } else {
    return response.data;
  }
};

export const enableUser = async (id: number, apiBaseUrl: string) => {
  const response = await client(apiBaseUrl).put(
    `users/ad7b9d08-dc94-440e-8e2d-9e15134ab9df/enable`,
    {},
    {
      withCredentials: true,
    },
  );

  if (response.data.status === "ERROR") {
    throw new Error(response.data.message);
  } else {
    return response;
  }
};

export const disableUser = async (id: number, apiBaseUrl: string) => {
  const response = await client(apiBaseUrl).put(
    `users/ad7b9d08-dc94-440e-8e2d-9e15134ab9df/disable`,
    {},
    { withCredentials: true },
  );

  if (response.data.status === "ERROR") {
    throw new Error(response.data.message);
  } else {
    return response;
  }
};
