import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Stepper } from "@dzangolab/react-ui";
import { useState } from "react";

const StepperDemo = () => {
  const { t } = useTranslation("ui");
  const [activeIndex, setActiveIndex] = useState(0);
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
      completedStepIcon: "pi pi-check",
      label: t("stepper.demo.label.confirmation"),
    },
  ];

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return t("stepper.demo.content.personal");
      case 1:
        return t("stepper.demo.content.children");
      case 2:
        return t("stepper.demo.content.payment");
      case 3:
        return t("stepper.demo.content.confirmation");
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < list.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <>
      <Stepper
        steps={list}
        activeIndex={activeIndex}
        readOnly={true}
        onChange={(event: any) => {
          setActiveIndex(event.index);
        }}
      />
      <div className="stepper-demo-content-wrapper">
        {renderStepContent(activeIndex)}
      </div>
      <div className="stepper-demo-button-wrapper">
        <Button onClick={handlePrevious} label="Previous" />
        <Button onClick={handleNext} label="Next" />
      </div>
    </>
  );
};

export default StepperDemo;
