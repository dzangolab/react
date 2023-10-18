import { InputSwitch } from "primereact/inputswitch";
import React, { useState } from "react";

export const SwitchInput = () => {
  const [checked, setChecked] = useState(true);

  return (
    <InputSwitch
      checked={checked}
      onChange={() => setChecked((previous: boolean) => !previous)}
    />
  );
};
