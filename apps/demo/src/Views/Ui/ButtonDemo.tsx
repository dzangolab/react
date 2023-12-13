import { Button } from "@dzangolab/react-ui";

export const ButtonDemo = () => {
  return (
    <div className="buttons-wrapper">
      <Button variant="filled" severity="secondary" loading={true} />
      <Button variant="outlined" severity="secondary" />
      <Button severity="alternate" variant="outlined" loading={true} />
      <Button variant="filled" disabled={true} />
    </div>
  );
};
