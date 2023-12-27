import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Stepper, Page } from "@dzangolab/react-ui";
import { useState } from "react";

import "./index.css";

export const StepperDemo = () => {
  const [t] = useTranslation("ui");

  const [activeIndex, setActiveIndex] = useState(0);
  const list = [
    {
      step: "a",
      completedStepIcon: <i className="pi pi-check" />,
      label: "Personal",
    },
    {
      completedStepIcon: "pi pi-check",
      label: "Children",
    },
    {
      completedStepIcon: "pi pi-check",
      label: "Payment",
    },
    {
      completedStepIcon: "pi pi-check",
      label: "Confirmation",
    },
  ];

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return "Please enter personal details";
      case 1:
        return "Please enter family details";
      case 2:
        return "Please enter payment details";
      case 3:
        return "Do you wish to continue?";
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
    <Page title={t("v2.stepper.title")}>
      <Stepper
        steps={list}
        activeIndex={activeIndex}
        readOnly={true}
        onChange={(event: any) => {
          setActiveIndex(event.index);
        }}
        align="start"
      />
      <div className="demo-stepper-content-wrapper">
        {renderStepContent(activeIndex)}
      </div>
      <div className="demo-stepper-button-wrapper">
        <Button onClick={handlePrevious} label="Previous" variant="outlined" />
        <Button onClick={handleNext} label="Next" />
      </div>
    </Page>
  );
};
