import { toast } from "react-toastify";

import client from "@/api/axios";

export const changeEmail = async (email: string, apiBaseUrl: string) => {
  try {
    const response = await client(apiBaseUrl).post(
      "/change-email",
      { email },
      {
        withCredentials: true,
      },
    );

    return response;
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    toast.error(errorMessage);
  }
};
