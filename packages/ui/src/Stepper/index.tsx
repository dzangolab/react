import { useState } from "react";
import { Step } from "./Step";

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
    {
      label: "Manish",
      command: (event) => {
        console.log(event.label);
      },
    },
    {
      label: "Gaurav",
      command: (event) => {
        console.log(event.label);
      },
    },
    {
      label: "Kriti",
      command: (event) => {
        console.log(event.label);
      },
    },
    {
      label: "suvash",
      command: (event) => {
        console.log(event.label);
      },
    },
    {
      label: "Kriti",
      command: (event) => {
        console.log(event.label);
      },
    },
    {
      label: "suvash",
      command: (event) => {
        console.log(event.label);
      },
    },
  ],
  activeIndex = 0,
}) => {
  return (
    <ul className="stepper">
      {list.map((element, index) => {
        return (
          <Step
            key={index}
            {...element}
            index={index}
            activeIndex={activeIndex}
          />
        );
      })}
      <div className="line"></div>
    </ul>
  );
};
