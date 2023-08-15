import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { getIsFirstUser, signUpFirstUser } from "@/api/user";
import SignupForm from "@/components/SignupForm";
import { ROUTES } from "@/constants";
import { useConfig, useUser } from "@/hooks";

import { login } from "..";

import type { LoginCredentials } from "@/types";

const SignUpFirstUser = () => {
  const { t } = useTranslation("user");

  const appConfig = useConfig();
  const { setUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFirstUser, setIsFirstUser] = useState<boolean>(false);

  const [signUpFirstUserLoading, setSignUpFirstUserLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getIsFirstUser(appConfig?.apiBaseUrl || "")
      .then((response) => {
        setIsFirstUser(response.signUp);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (credentials: LoginCredentials) => {
    if (!isFirstUser) {
      return;
    }

    setSignUpFirstUserLoading(true);

    signUpFirstUser(credentials, appConfig?.apiBaseUrl || "")
      .then((response) => {
        setSignUpFirstUserLoading(false);
        setLoginLoading(true);
        toast.success(`${t("firstUser.signup.messages.success")}`);

        // TODO Sign up first-user should return authenticated user from api
        login(credentials)
          .then((result: any) => {
            if (result?.user) {
              setUser(result.user);
              toast.success(`${t("login.messages.success")}`);
            }
          })
          .catch((error: any) => {
            setLoginLoading(false);

            toast.error(t("firstUser.login.messages.error"));
            navigate(appConfig.user.routes?.login?.path || ROUTES.LOGIN);
          })
          .finally(() => {
            setLoginLoading(false);
          });
      })
      .catch(() => {
        setSignUpFirstUserLoading(false);
        toast.error(`${t("firstUser.signup.messages.error")}`);
      });
  };

  const renderPageContent = () => {
    if (isError) {
      return (
        <Card>
          <p>{t(`errors:errors.otherErrors`)}</p>
        </Card>
      );
    }

    if (!isFirstUser) {
      return (
        <Card>
          <p>{t(`firstUser.errors.notFirstUser`)}</p>
          <div className="links">
            <Link
              to={appConfig.user.routes?.login?.path || ROUTES.LOGIN}
              className="native-link"
            >
              {t("firstUser.links.login")}
            </Link>
          </div>
        </Card>
      );
    }

    return (
      <SignupForm
        email={""}
        handleSubmit={handleSubmit}
        loading={signUpFirstUserLoading}
      />
    );
  };

  return (
    <Page
      className="signup"
      title={t("firstUser.title")}
      loading={loading || loginLoading}
    >
      {renderPageContent()}
    </Page>
  );
};

export default SignUpFirstUser;
