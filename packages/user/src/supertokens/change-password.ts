import client from "@/api/axios";
import { toast } from "react-toastify";

const changePassword = async (
  oldPassword: string,
  newPassword: string,
  apiBaseUrl: string
): Promise<void> => {
  const data = {
    formFields: [
      {
        id: "oldPassword",
        value: oldPassword,
      },
      {
        id: "password",
        value: newPassword,
      },
    ],
  };

  try {
    const response = await client(apiBaseUrl).post("/change_password", data, {
      withCredentials: true,
    });

    console.log(response);
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      toast.error(err.message);
    } else {
      toast.error("Oops! Something went wrong.");
    }
  }
};

export default changePassword;
