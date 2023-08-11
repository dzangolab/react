import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getIsFirstUser, signUpFirstUser } from "@/api/user";
import SignupForm from "@/components/SignupForm";
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

        // TODO Sign up first-user should return authenticated user from api
        login(credentials)
          .then((result: any) => {
            if (result?.user) {
              setUser(result.user);
              toast.success(`${t("login.messages.success")}`);
            }
          })
          .catch((error: any) => {
            const errorMessage = t("errors:errors.otherErrors");

            if (error.name) {
              throw error as Error;
            }
            setLoginLoading(true);

            toast.error(error.message || errorMessage);
          })
          .finally(() => {
            setLoginLoading(false);
          });
      })
      .catch(() => {
        setSignUpFirstUserLoading(false);
        toast.error(`${t("errors.errorSignUpFirstUser")}`);
      });
  };

  const renderPageContent = () => {
    if (isError) {
      return (
        <Card>
          <p>{t(`errors.errorFetchingIsFirstUser`)}</p>
        </Card>
      );
    }

    if (!isFirstUser) {
      return (
        <Card>
          <p>{t(`errors.signUpFirstUser`)}</p>
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
      title={t("signup.title")}
      loading={loading || loginLoading}
    >
      {renderPageContent()}
    </Page>
  );
};

export default SignUpFirstUser;
