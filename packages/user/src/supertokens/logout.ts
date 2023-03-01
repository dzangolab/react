import { toast } from "react-toastify";
import Session from "supertokens-web-js/recipe/session";

const logout = async () => {
  let success = false;
  try {
    await Session.signOut();

    success = true;
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    toast.error(errorMessage);
  }

  return success;
};

export default logout;
