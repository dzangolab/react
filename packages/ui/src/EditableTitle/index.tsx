import { ChangeEvent, useState } from "react";

import { Input } from "..";

interface IProperties {
  title: string;
  onTitleChange: (title: string) => void;
}

export const EditableTitle = ({ title, onTitleChange }: IProperties) => {
  const [isEditModeOn, setEditModeOn] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTitleChange(event.target.value);
  };

  const renderContent = () => {
    if (isEditModeOn) {
      return (
        <Input
          value={title}
          onChange={handleChange}
          onBlur={() => setEditModeOn(false)}
        />
      );
    }

    return (
      <div className="title" onClick={() => setEditModeOn(true)}>
        {title}
      </div>
    );
  };

  return <>{renderContent()}</>;
};
