import { Button } from "@dzangolab/react-ui";

export const ButtonDemo = () => {
  return (
    <div className="buttons-wrapper">
      <Button variant="filled" severity="danger" />
      <Button variant="outlined" severity="success" />
      <Button severity="secondary" />
      <Button />
    </div>
  );
};
