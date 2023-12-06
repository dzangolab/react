import { ReactNode, useState } from "react";
import { Step } from "./Step";

type StepItem = {
  step?: number | string | ReactNode;
  label: string;
  command?: (event: any) => void;
};

interface IProperties {
  list?: StepItem[];
  activeIndex?: number;
  onSelect?: (event: any) => void;
  readOnly?: boolean;
}

export const Stepper: React.FC<IProperties> = ({
  list = [],
  activeIndex = 0,
  onSelect,
  readOnly = true,
}) => {
  const handleActiveIndex = (event: any) => {
    if (!readOnly && onSelect) {
      onSelect(event);
    }
  };

  return (
    <ul className="stepper">
      {list.map((element, index) => {
        return (
          <Step
            key={index}
            {...element}
            index={index}
            handleActiveIndex={handleActiveIndex}
            activeIndex={activeIndex}
          />
        );
      })}
      <div className="line"></div>
    </ul>
  );
};
