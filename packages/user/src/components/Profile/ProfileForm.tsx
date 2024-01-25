import { Provider } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { ProfileFormFields } from "./ProfileFormFields";

import { updateUserProfile } from "@/api/user";
import { useConfig, useUser } from "@/hooks";
import { UpdateProfileInputType } from "@/types";

export const ProfileForm = () => {
  const { t } = useTranslation("user");
  const { user, setUser } = useUser();
  const appConfig = useConfig();
  const [submitting, setSubmitting] = useState(false);

  const profileValidationSchema: any = z.object({
    givenName: z.string().nonempty({
      message: t("profile.form.validations.firstName.required"),
    }),

    surname: z.string().nonempty({
      message: t("profile.form.validations.lastName.required"),
    }),
  });

  const handleSubmit = async (data: UpdateProfileInputType) => {
    setSubmitting(true);
    updateUserProfile(data, appConfig?.apiBaseUrl)
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
        setSubmitting(false);
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
      <ProfileFormFields submitting={submitting} user={user} />
    </Provider>
  );
};
