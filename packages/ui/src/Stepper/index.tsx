import { ReactNode } from "react";

import { IStepEvent, Step } from "./Step";

type StepItem = {
  activeStepIcon?: string | ReactNode;
  command?: (event: IStepEvent) => void;
  label?: string;
  step?: number | string | ReactNode;
};

interface IProperties {
  activeIndex?: number;
  onSelect?: (event: IStepEvent) => void;
  readOnly?: boolean;
  lineStyle?: "solid" | "dashed";
  stepList?: StepItem[];
}

export const Stepper: React.FC<IProperties> = ({
  lineStyle = "solid",
  activeIndex = 0,
  onSelect,
  readOnly = true,
  stepList = [],
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
            key={index}
            {...element}
            index={index}
            lineStyle={lineStyle}
            handleActiveIndex={handleActiveIndex}
            activeIndex={activeIndex}
            readOnly={readOnly}
          />
        );
      })}
    </ul>
  );
};
