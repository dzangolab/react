import { Provider } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ProfileFormFields } from "./ProfileFormFields";
import { setUserData, useUser } from "..";

import { editUserProfile } from "@/api/user";
import { getHomeRoute } from "@/helpers";
import { useConfig } from "@/hooks";
import { useCallback } from "react";
import { z } from "zod";

type UserProfileType = {
  email: string;
  givenName?: string;
  surname?: string;
};

export const ProfileForm = () => {
  const { t } = useTranslation("user");
  const { user, setUser } = useUser();
  const appConfig = useConfig();
  const navigate = useNavigate();
  const homeRoute: string =
    getHomeRoute(user, appConfig?.layout, appConfig?.user) || "/";

  const profileValidationSchema: any = z.object({
    givenName: z.string().nonempty({
      message: t("thing.form.validations.name.required"),
    }),

    surname: z.string().nonempty({
      message: t("thing.form.validations.name.required"),
    }),
  });

  const navigateHome = () => {
    if (homeRoute === "profile") {
      navigate("/");
    } else {
      navigate(homeRoute);
    }
  };

  const handleSubmit = async (data: UserProfileType) => {
    editUserProfile(data, appConfig.apiBaseUrl).then((response) => {
      if ("data" in response) {
        toast.success(t("profile.toastMessages.success"));
        setUserData(response.data);
        setUser(response.data);
        navigateHome();
      } else {
        toast.error(t("profile.toastMessages.error"));
      }
    });
  };

  const handleCancel = useCallback(() => {
    navigateHome();
  }, []);

  return (
    <Provider
      validationSchema={profileValidationSchema}
      onSubmit={handleSubmit}
      defaultValues={{
        email: user?.email,
        givenName: user?.givenName,
        surname: user?.surname,
      }}
    >
      <ProfileFormFields handleCancel={handleCancel} />
    </Provider>
  );
};
