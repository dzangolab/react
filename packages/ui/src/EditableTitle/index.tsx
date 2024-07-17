import {
  ChangeEvent,
  HTMLAttributes,
  createElement,
  useEffect,
  useRef,
  useState,
} from "react";

import { Input } from "..";

interface IProperties extends HTMLAttributes<HTMLHeadElement> {
  titleLevel?: "h1" | "h2" | "h3";
  title: string;
  onTitleApply?: () => void;
  onTitleChange: (title: string) => void;
}

export const EditableTitle = ({
  titleLevel = "h1",
  title,
  onTitleApply,
  onTitleChange,
  ...others
}: IProperties) => {
  const [isEditModeOn, setEditModeOn] = useState<boolean>(false);
  const inputReference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditModeOn) {
      inputReference.current?.focus();
    }
  }, [isEditModeOn]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTitleChange(event.target.value);
  };

  const handleClick = () => {
    setEditModeOn(true);
  };

  const handleBlur = () => {
    setEditModeOn(false);
    onTitleApply?.();
  };

  const renderContent = () => {
    if (isEditModeOn) {
      return (
        <Input
          ref={inputReference}
          value={title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      );
    }

    return createElement(
      titleLevel,
      { className: "title", onClick: handleClick, ...others },
      title,
    );
  };

  return <>{renderContent()}</>;
};
