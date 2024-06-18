import { useTranslation } from "@dzangolab/react-i18n";
import { Button, ConfirmationModal, Dialog, Page } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../components/Demo";

export const ConfirmationModalDemo = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Button label="Click here" onClick={() => setVisible(true)} />
      <Dialog visible={visible} onHide={() => setVisible(false)} />
    </>
  );
};
