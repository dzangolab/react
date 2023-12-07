import { ReactNode } from "react";

import { IStepEvent, Step } from "./Step";

type StepItem = {
  activeStep?: string | ReactNode;
  step?: number | string | ReactNode;
  label: string;
  command?: (event: IStepEvent) => void;
};

interface IProperties {
  activeStepIcon?: string | ReactNode;
  stepList?: StepItem[];
  activeIndex?: number;
  onSelect?: (event: IStepEvent) => void;
  readOnly?: boolean;
}

export const Stepper: React.FC<IProperties> = ({
  stepList = [],
  activeIndex = 0,
  onSelect,
  readOnly = true,
}) => {
  const handleActiveIndex = (event: IStepEvent) => {
    if (!readOnly && onSelect) {
      onSelect(event);
    }
  };

  return (
    <ul className="stepper">
      {stepList.map((element, index) => {
        return (
          <Step
            key={element.label}
            {...element}
            index={index}
            handleActiveIndex={handleActiveIndex}
            activeIndex={activeIndex}
          />
        );
      })}
    </ul>
  );
};
