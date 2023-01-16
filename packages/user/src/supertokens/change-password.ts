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
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      toast.error(err.message);
    } else {
      toast.error("Oops! Something went wrong.");
    }
  }

  return success;
};

export default changePassword;
