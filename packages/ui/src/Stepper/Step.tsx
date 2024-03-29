import { FC, MouseEvent, ReactNode } from "react";

export interface IStepEvent extends MouseEvent<HTMLElement> {
  label?: string;
  index?: number;
}

export type AlignType = "start" | "center" | "end";

export type LineStyleType = "solid" | "dashed";

interface IStepProperties {
  isCompleted: boolean;
  isActive: boolean;
  completedStepIcon?: string | ReactNode;
  onClick: (event: IStepEvent) => void;
  index: number;
  label?: string;
  lineStyle?: LineStyleType;
  align?: AlignType;
  step?: number | string | ReactNode;
}

export const Step: FC<IStepProperties> = ({
  isCompleted,
  isActive,
  completedStepIcon,
  onClick,
  index,
  label,
  lineStyle,
  align,
  step,
}) => {
  const renderLabel = (label?: string) => {
    if (!label) {
      return null;
    }

    return (
      <span className={`step-label ${isActive ? "active" : ""} `}>{label}</span>
    );
  };

  const renderStep = (
    index: number,
    completedStepIcon?: string | ReactNode,
  ) => {
    const renderContent = () => {
      if (isCompleted && completedStepIcon) {
        if (typeof completedStepIcon !== "string") return completedStepIcon;
        return <i className={completedStepIcon} />;
      }

      return step || index + 1;
    };

    return (
      <span
        className={`step-number ${isActive ? "active" : ""} ${
          isCompleted ? "completed" : ""
        } `}
      >
        {renderContent()}
      </span>
    );
  };

  const handleClick = (event: IStepEvent) => {
    onClick(event);
  };

  return (
    <li
      className={`step ${align} ${lineStyle}`}
      key={index}
      onClick={(event) => {
        handleClick({ ...event, index, label: label });
      }}
    >
      {renderStep(index, completedStepIcon)}
      {renderLabel(label)}
    </li>
  );
};
