import { Button } from "@dzangolab/react-ui";

export const ButtonDemo = () => {
  return (
    <div className="buttons-wrapper">
      <Button variant="filled" severity="secondary" />
      <Button variant="outlined" severity="secondary" />
      <Button severity="alternate" variant="filled" />
      <Button variant="filled" />
    </div>
  );
};
