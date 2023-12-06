import { useState } from "react";

export const Step = ({ label, command, index, activeIndex }: any) => {
  const handleActiveIndex = (event: any) => {
    console.log(event);
    setActive(event.index);
  };

  const [active, setActive] = useState(activeIndex);

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
        <span className={`step-label ${active === index && "active"} `}>
          {label}
        </span>
      </div>
    </li>
  );
};
