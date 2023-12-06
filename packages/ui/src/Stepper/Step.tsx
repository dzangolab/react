import { FC, ReactNode } from "react";

export interface MyEvent extends React.MouseEvent<HTMLElement> {
  label?: string;
}
interface IStepProperties {
  activeIndex?: number;
  step?: number | string | ReactNode;
  label: string;
  command?: (event: MyEvent) => void;
  index: number;
  handleActiveIndex?: (event: any) => void;
}

export const Step: FC<IStepProperties> = ({
  activeIndex,
  label,
  step,
  command,
  index,
  handleActiveIndex,
}) => {
  const renderLabel = (label: string) => {
    if (label) {
      return (
        <span className={`step-label ${activeIndex === index && "active"} `}>
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
        aria-current={activeIndex === index && "step"}
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
        handleActiveIndex?.({ ...event, index });
        command?.({ ...event, label: label });
      }}
    >
      <div className="label-wrapper">
        {renderStep(index)}
        {renderLabel(label)}
      </div>
    </li>
  );
};
