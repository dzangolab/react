import { ReactNode } from "react";

import { IStepEvent, LineStyleType, Step } from "./Step";

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
  stepList?: StepItem[];
}

export const Stepper: React.FC<IProperties> = ({
  lineStyle = "solid",
  activeIndex = 0,
  onChange,
  readOnly = true,
  stepList = [],
}) => {
  const handleIndexChange = (event: IStepEvent) => {
    if (!readOnly && onChange) {
      onChange(event);
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
            lineStyle={lineStyle}
            handleIndexChange={handleIndexChange}
            isCompleted={activeIndex > index ? true : false}
            isActive={activeIndex === index ? true : false}
          />
        );
      })}
    </ul>
  );
};
