import { toast } from "react-toastify";

import client from "@/api/axios";

const changePassword = async (
  oldPassword: string,
  newPassword: string,
  apiBaseUrl: string
): Promise<boolean | undefined> => {
  let success = false;

  try {
    const response = await client(apiBaseUrl).post(
      "/change_password",
      { oldPassword, newPassword },
      {
        withCredentials: true,
      }
    );

    if (response.data.status === "OK") {
      success = true;
    } else {
      toast.error(response.data.message);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    let errorMessage = "Oops! Something went wrong.";
    if (err.isSuperTokensGeneralError === true) {
      errorMessage = err.message;
    }
    toast.error(errorMessage);
  }

  return success;
};

export default changePassword;
