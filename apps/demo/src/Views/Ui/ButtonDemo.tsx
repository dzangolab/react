import { Button } from "@dzangolab/react-ui";

export const ButtonDemo = () => {
  return (
    <div className="buttons-wrapper">
      <Button
        size="small"
        variant="filled"
        severity="secondary"
        icon="pi pi-check"
      />
      <Button size="medium" variant="outlined" severity="secondary" />
      <Button size="large" severity="alternate" variant="outlined" />
      <Button variant="filled" disabled={true} />
    </div>
  );
};
