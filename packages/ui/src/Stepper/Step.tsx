import { FC, MouseEvent, ReactNode } from "react";

export interface IStepEvent extends MouseEvent<HTMLElement> {
  label?: string;
  index?: number;
}

interface IStepProperties {
  activeIndex: number;
  activeStepIcon?: string | ReactNode;
  command?: (event: IStepEvent) => void;
  handleActiveIndex: (event: IStepEvent) => void;
  index: number;
  label?: string;
  isLineDashed?: boolean;
  readOnly?: boolean;
  step?: number | string | ReactNode;
}

export const Step: FC<IStepProperties> = ({
  activeIndex,
  activeStepIcon,
  command,
  handleActiveIndex,
  index,
  label,
  isLineDashed,
  readOnly,
  step,
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

  const renderStep = (index: number, activeStepIcon?: string | ReactNode) => {
    return (
      <span
        className={`step-number ${activeIndex === index && "current"} ${
          activeIndex > index && "active"
        } `}
      >
        {activeIndex >= index && activeStepIcon ? (
          typeof activeStepIcon === "string" ? (
            <i className={activeStepIcon} />
          ) : (
            activeStepIcon
          )
        ) : step ? (
          step
        ) : (
          index + 1
        )}
      </span>
    );
  };

  const handleCommand = (event: IStepEvent) => {
    if (!readOnly && command) {
      command(event);
    }
  };

  return (
    <li
      className={`step ${isLineDashed && "dashed"}`}
      key={index}
      onClick={(event) => {
        handleActiveIndex({ ...event, index, label: label });
        handleCommand({ ...event, index, label: label });
      }}
    >
      {renderStep(index, activeStepIcon)}
      {renderLabel(label)}
    </li>
  );
};
