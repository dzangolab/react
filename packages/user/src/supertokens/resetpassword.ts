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
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      toast.error(err.message);
    } else {
      toast.error("Oops! Something went wrong.");
    }
  }

  return { status };
};

export default resetPassword;
