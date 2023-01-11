import { useTranslation } from "@dzangolab/react-i18n";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { thirdPartySignInAndUp } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { useUserAppDispatch } from "@/redux/hooks";
import { getUser } from "@/redux/reducer/AuthSlice";

const AuthGoogleCallback = () => {
  const { t } = useTranslation("user");
  const dispatch = useUserAppDispatch();
  const navigate = useNavigate();

  const authCallback = async () => {
    try {
      const response = await thirdPartySignInAndUp();

      if (response.status === "OK") {
        dispatch(getUser());
        toast.success(`${t("authGoogleCallback.email.success")}`);
      } else {
        toast.error(`${t("authGoogleCallback.email.error")}`);
        navigate("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        toast.error(err.message);
      } else {
        toast.error(`${t("authGoogleCallback.message.error")}`);
      }

      navigate("/login");
    }
  };

  useEffect(() => {
    authCallback();
  }, []);

  return <>Loading .....</>;
};

export default AuthGoogleCallback;
