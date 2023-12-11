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
      completedStepIcon: <i className="pi pi-check" />,
      label: t("stepper.demo.label.personal"),
    },
    {
      completedStepIcon: "pi pi-check",
      label: t("stepper.demo.label.children"),
    },
    {
      completedStepIcon: "pi pi-check",
      label: t("stepper.demo.label.payment"),
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
