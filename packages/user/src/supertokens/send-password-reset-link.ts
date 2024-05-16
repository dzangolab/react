import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "supertokens-web-js/recipe/thirdpartyemailpassword";

interface IPromise {
  status: string | undefined;
}

export const sendPasswordResetLink = async (
  email: string,
  appId?: number
): Promise<IPromise | undefined> => {
  let status: string | undefined;

  const data = {
    formFields: [
      {
        id: "email",
        value: email,
      },
    ],
  };

  if (appId) {
    data.formFields.push({
      id: "appId",
      value: appId.toString(),
    });
  }

  try {
    const response = await sendPasswordResetEmail(data);

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
