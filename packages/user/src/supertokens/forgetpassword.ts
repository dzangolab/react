import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "supertokens-web-js/recipe/thirdpartyemailpassword";

interface IPromise {
  status: string | undefined;
}

const forgetpassword = async (email: string): Promise<IPromise | undefined> => {
  let status: string | undefined;

  const data = {
    formFields: [
      {
        id: "email",
        value: email,
      },
    ],
  };

  try {
    const response = await sendPasswordResetEmail(data);

    if (response.status === "OK") {
      status = response.status;
    } else {
      status = response.status;
      toast.error(status);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    let errorMessage = "Oops! Something went wrong.";
    if (err.isSuperTokensGeneralError === true) {
      errorMessage = err.message;
    }
    toast.error(errorMessage);
  }

  return { status };
};

export default forgetpassword;
