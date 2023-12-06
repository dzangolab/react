import { FC, MouseEvent, ReactNode } from "react";

export interface IStepEvent extends MouseEvent<HTMLElement> {
  label?: string;
  index?: number;
}

interface IStepProperties {
  activeIndex: number;
  step?: number | string | ReactNode;
  label?: string;
  command?: (event: IStepEvent) => void;
  index: number;
  handleActiveIndex?: (event: IStepEvent) => void;
}

export const Step: FC<IStepProperties> = ({
  activeIndex,
  label,
  step,
  command,
  index,
  handleActiveIndex,
}) => {
  const renderLabel = (label?: string) => {
    if (label) {
      return (
        <span className={`step-label ${activeIndex >= index && "active"} `}>
          {label}
        </span>
      );
    }

    return null;
  };

  const renderStep = (index: number) => {
    return (
      <span
        className="step-number"
        aria-current={activeIndex >= index && "step"}
      >
        {step ? step : index + 1}
      </span>
    );
  };

  return (
    <li
      className="step"
      key={index}
      onClick={(event) => {
        handleActiveIndex?.({ ...event, index, label: label });
        command?.({ ...event, index, label: label });
      }}
    >
      {renderStep(index)}
      {renderLabel(label)}
    </li>
  );
};
