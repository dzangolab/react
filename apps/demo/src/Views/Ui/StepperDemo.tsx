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

  console.log(activeIndex);

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <p>Hello world</p>
          </>
        );
      case 1:
        return (
          <>
            <p>Hello my name</p>
          </>
        );
      case 2:
        return (
          <>
            <p>Hello any other</p>
          </>
        );
      case 3:
        return (
          <>
            <p>Hello any more </p>
          </>
        );
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
      {getStepContent(activeIndex)}
      <div>
        <Button
          onClick={() =>
            setActiveIndex((previous) => {
              if (previous > 0) {
                return previous - 1;
              }

              return 0;
            })
          }
          label="Previous"
        />
        <Button
          onClick={() =>
            setActiveIndex((previous) => {
              if (previous < list.length) {
                return previous + 1;
              }

              return list.length;
            })
          }
          label="Next"
        />
      </div>
    </>
  );
};

export default StepperDemo;
