import { toast } from "react-toastify";
import { submitNewPassword } from "supertokens-web-js/recipe/thirdpartyemailpassword";

interface IPromise {
  status: string | undefined;
}

const resetPassword = async (
  newPassword: string
): Promise<IPromise | undefined> => {
  let status: string | undefined;

  const data = {
    formFields: [
      {
        id: "password",
        value: newPassword,
      },
    ],
  };

  try {
    const response = await submitNewPassword(data);

    if (response.status === "OK") {
      status = response.status;
    } else {
      status = response.status;
      toast.error(status);
    }
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    toast.error(errorMessage);
  }

  return { status };
};

export default resetPassword;
