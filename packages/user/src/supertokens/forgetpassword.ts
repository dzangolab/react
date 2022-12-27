import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "supertokens-web-js/recipe/emailpassword";

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
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      toast.error(err.message);
    } else {
      toast.error("Oops! Something went wrong.");
    }
  }

  return { status };
};

export default forgetpassword;
