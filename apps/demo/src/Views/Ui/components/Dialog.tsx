import { Button, Dialog } from "@dzangolab/react-ui";
import { useState } from "react";

export const DialogDemo = () => {
  const [visible, setVisible] = useState<boolean>();

  return (
    <>
      <Button label="Click here" onClick={() => setVisible(true)} />
      <Dialog visible={visible} />
    </>
  );
};
