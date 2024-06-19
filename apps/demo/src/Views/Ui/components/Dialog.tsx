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
          <div>Hello world</div>
        </Dialog>
      </Page>
    </>
  );
};
