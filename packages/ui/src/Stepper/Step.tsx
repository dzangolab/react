export const Step = ({
  active,
  label,
  step,
  command,
  index,
  handleActiveIndex,
}: any) => {
  const renderLabel = (label: string) => {
    if (label) {
      return (
        <span className={`step-label ${active === index && "active"} `}>
          {label}
        </span>
      );
    }

    return null;
  };

  const renderStep = (index: number) => {
    return (
      <span className="step-number" aria-current={active === index && "step"}>
        {step ? step : index + 1}
      </span>
    );
  };

  return (
    <li
      className="step"
      key={index}
      onClick={(event) => {
        handleActiveIndex({ ...event, index });
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
