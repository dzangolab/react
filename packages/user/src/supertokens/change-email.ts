import { toast } from "react-toastify";

import client from "@/api/axios";

export const changeEmail = async (
  email: string,
  apiBaseUrl: string,
): Promise<boolean | undefined> => {
  let success = false;

  try {
    const response = await client(apiBaseUrl).post(
      "/change-email",
      { email },
      {
        withCredentials: true,
      },
    );
    console.log("response", response);

    if (response.data.status === "OK") {
      success = true;
    } else {
      console.log("message", response.data.status);
    }
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    toast.error(errorMessage);
  }

  return success;
};
