import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Data, Message } from "@dzangolab/react-ui";
import React, { useState } from "react";

import { useConfig, useUser } from "@/hooks";

import { UpdateEmailModal } from "./UpdateEmailModal";

export const AccountInfo = () => {
  const { t } = useTranslation("user");
  const { user, setUser } = useUser();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const config = useConfig();
  const canUpdateEmail = config.features?.updateEmail;

  return (
    <div className="account-info">
      <Data
        label={t("profile.accountInfo.label")}
        value={
          <>
            {user?.email}
            {canUpdateEmail && (
              <Button
                variant="textOnly"
                label={t("profile.button.update")}
                severity="secondary"
                size="small"
                iconLeft="pi pi-pencil"
                onClick={() => setModalVisible(true)}
              ></Button>
            )}
          </>
        }
      />
      {canUpdateEmail && (
        <UpdateEmailModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          user={user}
          setUser={setUser}
        />
      )}
    </div>
  );
};
