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
      activeStepIcon: <i className="pi pi-check" />,
      label: t("stepper.demo.label.personal"),
      command: (event: any) => {
        toast.info(event.label);
      },
    },
    {
      activeStepIcon: "pi pi-check",
      label: t("stepper.demo.label.children"),
      command: (event: any) => {
        toast.info(event.label);
      },
    },
    {
      activeStepIcon: "pi pi-check",
      label: t("stepper.demo.label.payment"),
      command: (event: any) => {
        toast.info(event.label);
      },
    },
    {
      label: t("stepper.demo.label.confirmation"),
    },
  ];

  return (
    <>
      <Stepper
        stepList={list}
        activeIndex={activeIndex}
        readOnly={false}
        onChange={(event: any) => {
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
