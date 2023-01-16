import { toast } from "react-toastify";
import { getAuthorisationURLWithQueryParamsAndSetState } from "supertokens-web-js/recipe/thirdpartyemailpassword";

const googleLogin = async (redirectUrl: string) => {
  try {
    const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
      authorisationURL: redirectUrl,
      providerId: "google",
    });

    window.location.assign(authUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    let errorMessage = "Oops! Something went wrong.";
    if (err.isSuperTokensGeneralError === true) {
      errorMessage = err.message;
    }
    toast.error(errorMessage);
  }
};

export default googleLogin;
