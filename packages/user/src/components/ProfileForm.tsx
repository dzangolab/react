import { Provider } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { ProfileFormFields } from "./ProfileFormFields";
import { useUser } from "..";

import { editUserProfile } from "@/api/user";
import { getHomeRoute } from "@/helpers";
import { useConfig } from "@/hooks";
import { EditProfileType } from "@/types/types";

export const ProfileForm = () => {
  const { t } = useTranslation("user");
  const { user, setUser } = useUser();
  const appConfig = useConfig();
  const navigate = useNavigate();
  const homeRoute: string =
    getHomeRoute(user, appConfig?.layout, appConfig?.user) || "/";

  const profileValidationSchema: any = z.object({
    givenName: z.string().nonempty({
      message: t("profile.form.validations.firstName"),
    }),

    surname: z.string().nonempty({
      message: t("profile.form.validations.lastName"),
    }),
  });

  const navigateHome = useCallback(() => {
    if (homeRoute === "profile") {
      navigate("/");
    } else {
      navigate(homeRoute);
    }
  }, []);

  const handleCancel = useCallback(() => {
    navigateHome();
  }, []);

  const handleSubmit = async (data: EditProfileType) => {
    editUserProfile(data, appConfig?.apiBaseUrl)
      .then((response) => {
        if ("data" in response) {
          toast.success(t("profile.toastMessages.success"));
          setUser(response.data);
        } else {
          toast.error(t("profile.toastMessages.error"));
        }
      })
      .catch(() => {
        toast.error(t("profile.toastMessages.error"));
      })
      .finally(() => {
        navigateHome();
      });
  };

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
