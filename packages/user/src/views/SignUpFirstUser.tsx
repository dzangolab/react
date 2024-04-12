import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "..";

import type { LoginCredentials } from "@/types";

import { getIsFirstUser, signUpFirstUser } from "@/api/user";
import SignupForm from "@/components/SignupForm";
import { ROUTES } from "@/constants";
import { useConfig, useUser } from "@/hooks";

export const SignUpFirstUser = ({
  centered = true,
}: {
  centered?: boolean;
}) => {
  const { t } = useTranslation("user");

  const appConfig = useConfig();
  const { setUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [signUpFirstUserLoading, setSignUpFirstUserLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getIsFirstUser(appConfig?.apiBaseUrl || "")
      .then((response) => {
        if (!response?.signUp) {
          navigate(appConfig.user.routes?.login?.path || ROUTES.LOGIN);
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (credentials: LoginCredentials) => {
    setSignUpFirstUserLoading(true);

    signUpFirstUser(credentials, appConfig?.apiBaseUrl || "")
      .then(() => {
        setSignUpFirstUserLoading(false);
        setLoginLoading(true);
        toast.success(`${t("firstUser.signup.messages.success")}`);

        // TODO Sign up first-user should return authenticated user from api
        login(credentials)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((result: any) => {
            if (result?.user) {
              setUser(result.user);
              toast.success(`${t("login.messages.success")}`);
            }
          })
          .catch(() => {
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
      centered={centered}
    >
      {renderPageContent()}
    </Page>
  );
};
