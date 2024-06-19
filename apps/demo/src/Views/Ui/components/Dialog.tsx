import { Button, Dialog, Page } from "@dzangolab/react-ui";
import { useState } from "react";

export const DialogDemo = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Page title={"Dialog"}>
        <Button label="Click here" onClick={() => setVisible(true)} />
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          title="Modal demo"
        >
          <div>
            Hello world this is not my thing i have something to do and i don't
            go anywhere
          </div>
        </Dialog>
      </Page>
    </>
  );
};
