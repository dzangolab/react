import { useTranslation } from "@dzangolab/react-i18n";
import { Card, CardBody, Page } from "@dzangolab/react-ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getIsFirstUser, signUpFirstUser } from "@/api/user";
import SignupForm from "@/components/SignupForm";
import { useConfig, useUser } from "@/hooks";
import { DEFAULT_PATHS } from "@/router/router";

import { login } from "..";

import type { LoginCredentials } from "@/types";

export const SignUpFirstUser = ({
  centered = true,
}: {
  centered?: boolean;
}) => {
  const { t } = useTranslation("user");

  const config = useConfig();
  const { setUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [signUpFirstUserLoading, setSignUpFirstUserLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getIsFirstUser(config.apiBaseUrl)
      .then((response) => {
        if (!response?.signUp) {
          navigate(config.customPaths?.login || DEFAULT_PATHS.LOGIN);
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

    signUpFirstUser(credentials, config.apiBaseUrl)
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
            navigate(config.customPaths?.login || DEFAULT_PATHS.LOGIN);
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
          <CardBody>
            <p>{t(`errors:errors.otherErrors`)}</p>
          </CardBody>
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
