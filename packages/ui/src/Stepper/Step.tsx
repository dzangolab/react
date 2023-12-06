export const Step = ({
  active,
  label,
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

  //   const renderStep = () => {};

  console.log("Hello");

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
        <span className="step-number" aria-current={active === index && "step"}>
          {index + 1}
        </span>
        {renderLabel(label)}
      </div>
    </li>
  );
};
