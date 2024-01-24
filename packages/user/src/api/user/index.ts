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
    `users/${id}/enable`,
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
    `users/${id}/disable`,
    {},
    { withCredentials: true },
  );

  if (response.data.status === "ERROR") {
    throw new Error(response.data.message);
  } else {
    return response;
  }
};

export const editUserProfile = async (
  credential: any,
  apiBaseUrl: string,
): Promise<{ data: UserType }> => {
  const response = await client(apiBaseUrl).put(`me`, credential, {
    withCredentials: true,
  });

  if (response.data.status === "ERROR") {
    throw new Error(response.data.message);
  } else {
    return response;
  }
};
