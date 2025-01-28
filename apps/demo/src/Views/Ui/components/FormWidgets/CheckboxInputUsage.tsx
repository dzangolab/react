import { CheckboxInput } from "@dzangolab/react-ui";
import React, { useState } from "react";

const SingleCheckboxDemo = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  const [checked, setChecked] = useState(false);

  if (isString) {
    return ` <CheckboxInput
      name="single-checkbox"
      inputLabel="Accept Terms and Conditions"
      checked={checked}
      onChange={(newChecked) => setChecked(newChecked as boolean)}
    />`;
  }

  return (
    <CheckboxInput
      name="single-checkbox"
      inputLabel="Accept Terms and Conditions"
      checked={checked}
      onChange={(newChecked) => setChecked(newChecked as boolean)}
    />
  );
};

const MultiCheckboxDemo = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const options = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
  ];

  if (isString) {
    return `const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const options = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
  ];

  return (
    <CheckboxInput
      name="multi-checkbox"
      label="Choose Options"
      direction="horizontal"
      options={options}
      value={selectedValues}
      onChange={(newValues) => setSelectedValues(newValues as number[])}
    />);`;
  }

  return (
    <CheckboxInput
      name="multi-checkbox"
      label="Choose Options"
      direction="horizontal"
      options={options}
      value={selectedValues}
      onChange={(newValues) => setSelectedValues(newValues as number[])}
    />
  );
};

const DisabledDemo = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  const options = [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
  ];

  if (isString) {
    return `const options = [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
  ];

  return (
    <CheckboxInput
      name="disabled-checkbox"
      label="Disabled Options"
      options={options}
      value={["opt2"]}
      disabled
      helperText="These checkboxes are disabled."
    />
  );`;
  }

  return (
    <CheckboxInput
      name="disabled-checkbox"
      label="Disabled Options"
      options={options}
      value={["opt2"]}
      disabled
      helperText="These checkboxes are disabled."
    />
  );
};

export { SingleCheckboxDemo, MultiCheckboxDemo, DisabledDemo };
