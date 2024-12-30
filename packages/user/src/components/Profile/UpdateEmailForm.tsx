import { Provider } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { getMe } from "@/api/user";
import { useConfig } from "@/hooks";
import { changeEmail } from "@/supertokens";

import { UpdateEmailFormFields } from "./UpdateEmailFormFields";
import { UserType } from "../../types";

interface Properties {
  setModalVisible: (visible: boolean) => void;
  user: UserType | null;
  setUser: (user: UserType) => void;
}

type UpdateEmailFormData = {
  email: string;
};

export const UpdateEmailForm = ({
  user,
  setModalVisible,
  setUser,
}: Properties) => {
  const { t, i18n } = useTranslation("user");
  const [loading, setLoading] = useState(false);
  const config = useConfig();

  const emailValidationSchema = z.object({
    email: z.string().min(1, t("profile.accountInfo.messages.email")),
  });

  const handleSubmit = async (data: UpdateEmailFormData) => {
    setLoading(true);

    if (user?.thirdParty && Object.keys(user.thirdParty).length > 0) {
      toast.error(t("profile.accountInfo.messages.socialLoginError"));
      setLoading(false);
      return;
    }

    try {
      const response = await changeEmail(data.email, config.apiBaseUrl);
      switch (response?.status) {
        case "OK": {
          const user = await getMe(config.apiBaseUrl);
          setUser(user.data);
          toast.success(t("profile.accountInfo.messages.success"));
          break;
        }
        case "EMAIL_ALREADY_EXISTS_ERROR": {
          toast.error(t("profile.accountInfo.messages.alreadyExist"));
          break;
        }
        case "EMAIL_SAME_AS_CURRENT_ERROR": {
          toast.error(t("profile.accountInfo.messages.duplicate"));
          break;
        }
        case "EMAIL_INVALID_ERROR": {
          toast.error(t("profile.accountInfo.messages.invalid"));
          break;
        }
        case "EMAIL_FEATURE_DISABLED_ERROR": {
          toast.error(t("profile.accountInfo.messages.disabled"));
          break;
        }
        default: {
          toast.error(t("profile.accountInfo.messages.error"));
          break;
        }
      }

      setLoading(false);
    } catch (error) {
      toast.error(t("profile.accountInfo.messages.error"));

      setLoading(false);
    }
  };

  const formValues = {
    email: user?.email || "",
  };

  return (
    <Provider
      validationSchema={emailValidationSchema}
      onSubmit={handleSubmit}
      values={formValues}
      validationTriggerKey={i18n.language}
    >
      <UpdateEmailFormFields
        loading={loading}
        setModalVisible={setModalVisible}
      />
    </Provider>
  );
};
