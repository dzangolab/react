import { useState } from "react";

type MenuItem = {
  label: string;
  command?: (event: any) => void;
};

interface IProperties {
  list?: MenuItem[];
  activeIndex?: number;
}

export const Stepper: React.FC<IProperties> = ({
  list = [
    { label: "Manish" },
    { label: "Gaurav" },
    { label: "Kriti" },
    { label: "suvash" },
  ],
  activeIndex = 0,
}) => {
  const handleActiveIndex = (index: number) => {
    setActive(index);
  };

  const [active, setActive] = useState(activeIndex);
  return (
    <ul className="stepper">
      {list.map((element, index) => {
        return (
          <li
            className="step"
            key={index}
            onClick={() => handleActiveIndex(index)}
          >
            <div className="label-wrapper">
              <span
                className="step-number"
                aria-current={active === index && "step"}
              >
                {index + 1}
              </span>
              <span className={`step-label ${active === index && "active"} `}>
                {element.label}
              </span>
            </div>
          </li>
        );
      })}
      <div className="line"></div>
    </ul>
  );
};
