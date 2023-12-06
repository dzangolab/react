import { Stepper } from "@dzangolab/react-ui";
import { useState } from "react";

const StepperDemo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const list = [
    {
      label: "Manish",
      command: (event: any) => {
        console.log(event.label);
      },
    },
    {
      label: "Gaurav",
      command: (event: any) => {
        console.log(event.label);
      },
    },
    {
      label: "Kriti",
      command: (event: any) => {
        console.log(event.label);
      },
    },
    {
      label: "suvash",
      command: (event: any) => {
        console.log(event.label);
      },
    },
    {
      label: "Kriti",
      command: (event: any) => {
        console.log(event.label);
      },
    },
    {
      label: "suvash",
      command: (event: any) => {
        console.log(event.label);
      },
    },
  ];

  return (
    <Stepper
      list={list}
      activeIndex={activeIndex}
      readOnly={false}
      onSelect={(event: any) => {
        console.log(event);
        setActiveIndex(event.index);
      }}
    />
  );
};

export default StepperDemo;
