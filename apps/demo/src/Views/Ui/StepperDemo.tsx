import { useTranslation } from "@dzangolab/react-i18n";
import { Stepper } from "@dzangolab/react-ui";
import { useState } from "react";
import { toast } from "react-toastify";

const StepperDemo = () => {
  const { t } = useTranslation("ui");
  const [activeIndex, setActiveIndex] = useState(-1);
  const list = [
    {
      step: "a",
      activeStep: "pi pi-times",
      label: "Manish",
      command: (event: any) => {
        toast.info(event.label);
      },
    },
    {
      activeStep: "pi pi-check",
      label: "Gaurav",
      command: (event: any) => {
        toast.info(event.label);
      },
    },
    {
      label: "Kriti",
      command: (event: any) => {
        toast.info(event.label);
      },
    },
    {
      label: "suvash",
      command: (event: any) => {
        toast.info(event.label);
      },
    },
  ];

  return (
    <>
      <Stepper
        stepList={list}
        activeIndex={activeIndex}
        readOnly={false}
        onSelect={(event: any) => {
          setActiveIndex(event.index);
        }}
      />
      <div className="stepper-demo-message">
        {t("stepper.demo.message", { page: activeIndex + 1 })}
      </div>
    </>
  );
};

export default StepperDemo;
