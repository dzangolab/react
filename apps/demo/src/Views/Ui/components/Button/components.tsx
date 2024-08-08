import { Button } from "@dzangolab/react-ui";
import { useState } from "react";

const Basic = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  const [clicked, setClicked] = useState(false);

  if (isString) {
    return `<div className="container">
     <Button label="Click me" onClick={() => setClicked(true)} />
</div>`;
  }

  return (
    <div className="container">
      <Button label="Click me" onClick={() => setClicked(true)} />
      {clicked && <span>{new Date().toLocaleString()}</span>}
    </div>
  );
};

const Severity = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<div className="container">
      <Button label="Primary" severity="primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Alternate" severity="alternate" />
      <Button label="Success" severity="success" />
      <Button label="Danger" severity="danger" />
      <Button label="Warning" severity="warning" />
</div>`;
  }

  return (
    <div className="container">
      <Button label="Primary" severity="primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Alternate" severity="alternate" />
      <Button label="Success" severity="success" />
      <Button label="Danger" severity="danger" />
      <Button label="Warning" severity="warning" />
    </div>
  );
};

const Size = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<div className="container">
      <Button label="Small" size="small" variant="filled" severity="primary" />
      <Button
        label="Medium"
        size="medium"
        variant="filled"
        severity="primary"
      />
      <Button label="Large" size="large" variant="filled" severity="primary" />
</div>`;
  }

  return (
    <div className="container">
      <Button label="Small" size="small" variant="filled" severity="primary" />
      <Button
        label="Medium"
        size="medium"
        variant="filled"
        severity="primary"
      />
      <Button label="Large" size="large" variant="filled" severity="primary" />
    </div>
  );
};

const Variant = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<div className="container">
      <Button label="Default" size="medium" />
      <Button label="Outlined" size="medium" variant="outlined" />
      <Button label="Text only" size="medium" variant="textOnly" />
</div>`;
  }

  return (
    <div className="container">
      <Button label="Default" size="medium" />
      <Button label="Outlined" size="medium" variant="outlined" />
      <Button label="Text only" size="medium" variant="textOnly" />
    </div>
  );
};

const Icon = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<div className="container">
      <Button variant="textOnly" severity="secondary" iconLeft="pi pi-user" />
      <Button variant="filled" iconRight="pi pi-user" />
      <Button
        label="Secondary"
        variant="filled"
        severity="secondary"
        iconLeft="pi pi-check"
      />
      <Button
        label="Alternate"
        variant="filled"
        severity="alternate"
        iconRight="pi pi-times"
      />
      <Button
        label="Alternate"
        size="medium"
        severity="alternate"
        variant="outlined"
        loading={true}
        iconLeft="pi pi-spin pi-spinner"
      />
</div>`;
  }

  return (
    <div className="container">
      <Button variant="textOnly" severity="secondary" iconLeft="pi pi-user" />
      <Button variant="filled" iconRight="pi pi-user" />
      <Button
        label="Secondary"
        variant="filled"
        severity="secondary"
        iconLeft="pi pi-check"
      />
      <Button
        label="Alternate"
        variant="filled"
        severity="alternate"
        iconRight="pi pi-times"
      />
      <Button
        label="Alternate"
        size="medium"
        severity="alternate"
        variant="outlined"
        loading={true}
        iconLeft="pi pi-spin pi-spinner"
      />
    </div>
  );
};

const Link = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<div className="container">
      <Button label="Home" to="/" />
      <Button label="Back" severity="secondary" to="/ui" />
</div>`;
  }

  return (
    <div className="container">
      <Button label="Home" to="/" />
      <Button label="Back" severity="secondary" to="/ui" />
    </div>
  );
};

export { Basic, Severity, Size, Variant, Icon, Link };
