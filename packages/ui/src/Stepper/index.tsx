import { ReactNode } from "react";

import { IStepEvent, LineStyleType, ListAlignmentType, Step } from "./Step";

type StepItem = {
  activeStepIcon?: string | ReactNode;
  label?: string;
  step?: number | string | ReactNode;
};

interface IProperties {
  activeIndex?: number;
  onChange?: (event: IStepEvent) => void;
  readOnly?: boolean;
  lineStyle?: LineStyleType;
  steps: StepItem[];
  listalignment?: ListAlignmentType;
}

export const Stepper: React.FC<IProperties> = ({
  listalignment = "center",
  lineStyle = "solid",
  activeIndex = 0,
  onChange,
  readOnly = true,
  steps = [],
}) => {
  const onClick = (event: IStepEvent) => {
    if (!readOnly && onChange) {
      onChange(event);
    }
  };

  return (
    <ul className="stepper">
      {steps.map((element, index) => {
        return (
          <Step
            key={index}
            {...element}
            index={index}
            lineStyle={lineStyle}
            onClick={onClick}
            isCompleted={activeIndex > index ? true : false}
            isActive={activeIndex === index ? true : false}
            listalignment={listalignment}
          />
        );
      })}
    </ul>
  );
};
