import { ReactNode, useState } from "react";
import { Step } from "./Step";

type StepItem = {
  step?: number | string | ReactNode;
  label: string;
  command?: (event: any) => void;
};

interface IProperties {
  stepList?: StepItem[];
  activeIndex?: number;
  onSelect?: (event: any) => void;
  readOnly?: boolean;
}

export const Stepper: React.FC<IProperties> = ({
  stepList = [],
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
      {stepList.map((element, index) => {
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
