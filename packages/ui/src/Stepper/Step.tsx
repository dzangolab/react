import { FC, MouseEvent, ReactNode } from "react";

export interface IStepEvent extends MouseEvent<HTMLElement> {
  label?: string;
  index?: number;
}

interface IStepProperties {
  isActive: boolean;
  isCurrent: boolean;
  activeStepIcon?: string | ReactNode;
  command?: (event: IStepEvent) => void;
  handleActiveIndex: (event: IStepEvent) => void;
  index: number;
  label?: string;
  lineStyle?: "solid" | "dashed";
  readOnly?: boolean;
  step?: number | string | ReactNode;
}

export const Step: FC<IStepProperties> = ({
  isActive,
  isCurrent,
  activeStepIcon,
  command,
  handleActiveIndex,
  index,
  label,
  lineStyle,
  readOnly,
  step,
}) => {
  const renderLabel = (label?: string) => {
    if (!label) {
      return null;
    }

    return (
      <span className={`step-label ${isActive && "active"} `}>{label}</span>
    );
  };

  const renderStep = (index: number, activeStepIcon?: string | ReactNode) => {
    return (
      <span
        className={`step-number ${isCurrent && "current"} ${
          isActive && "active"
        } `}
      >
        {isActive && isCurrent && activeStepIcon ? (
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

  const handleClick = (event: IStepEvent) => {
    handleActiveIndex(event);
    handleCommand(event);
  };

  return (
    <li
      className={`step ${lineStyle === "dashed" && "dashed"}`}
      key={index}
      onClick={(event) => {
        handleClick({ ...event, index, label: label });
      }}
    >
      {renderStep(index, activeStepIcon)}
      {renderLabel(label)}
    </li>
  );
};
