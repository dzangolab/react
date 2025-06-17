import { toast } from "react-toastify";
import { getAuthorisationURLWithQueryParamsAndSetState } from "supertokens-web-js/recipe/thirdpartyemailpassword";

export const facebookLogin = async (redirectUrl: string) => {
  try {
    const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
      authorisationURL: redirectUrl,
      providerId: "facebook",
    });

    window.location.assign(authUrl);
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    toast.error(errorMessage);
  }
};
