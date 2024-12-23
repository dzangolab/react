import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Data } from "@dzangolab/react-ui";
import React, { useState } from "react";

import { useConfig, useUser } from "@/hooks";

import { ChangeEmailModal } from "./ChangeEmailModal";

export const AccountInfo = () => {
  const { t } = useTranslation("user");
  const { user, setUser } = useUser();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const config = useConfig();

  return (
    <div className="change-email">
      <Data
        label={t("profile.form.email.label")}
        value={
          <>
            {user?.email}
            {config.features?.updateEmail && (
              <Button
                variant="textOnly"
                label={t("profile.button.edit")}
                severity="secondary"
                size="small"
                iconLeft="pi pi-pencil"
                onClick={() => setModalVisible(true)}
              ></Button>
            )}
          </>
        }
      />
      <ChangeEmailModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        user={user}
      />
    </div>
  );
};
