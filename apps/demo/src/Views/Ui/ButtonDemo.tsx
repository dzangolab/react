import { Button } from "@dzangolab/react-ui";

export const ButtonDemo = () => {
  return (
    <div className="buttons-wrapper">
      <Button
        variant="filled"
        severity="secondary"
        loading={true}
        loadingIcon={<i className="pi pi-spin pi-spinner" />}
      />
      <Button
        size="small"
        variant="outlined"
        severity="secondary"
        loading={true}
        loadingIcon={<i className="pi pi-spin pi-spinner" />}
      />
      <Button
        severity="alternate"
        variant="outlined"
        loading={true}
        loadingIcon={<i className="pi pi-spin pi-spinner" />}
      />
      <Button variant="filled" disabled={true} />
    </div>
  );
};
