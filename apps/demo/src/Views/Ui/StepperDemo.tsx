import { Stepper } from "@dzangolab/react-ui";
import { useState } from "react";

const StepperDemo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const list = [
    {
      label: "Manish is my name and it is my name",
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
      stepList={list}
      activeIndex={3}
      // readOnly={false}
      onSelect={(event: any) => {
        console.log(event);
        setActiveIndex(event.index);
      }}
    />
  );
};

export default StepperDemo;
