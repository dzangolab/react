import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import Accordion from "../Accordion";
import Accordions from "../Accordions";

const values = {
  titleOne: "Accordion one",
  bodyOne: "Body text one",
  titleTwo: "Accordion two",
  bodyTwo: "Body text two",
};

test("accordion is rendered", async () => {
  render(
    <Accordions>
      <Accordion title={values.titleOne}>
        <p>{values.bodyOne}</p>
      </Accordion>
      <Accordion title={values.titleTwo}>
        <p>{values.bodyTwo}</p>
      </Accordion>
    </Accordions>
  );

  expect(screen.getByText(values.titleOne)).toBeDefined();
  expect(screen.getByText(values.bodyOne)).toBeDefined();
  expect(screen.getByText(values.titleTwo)).toBeDefined();
  expect(screen.getByText(values.bodyTwo)).toBeDefined();
});

test("correct accordion is open/active", async () => {
  render(
    <Accordions defaultActiveKey={1}>
      <Accordion title={values.titleOne}>
        <p>{values.bodyOne}</p>
      </Accordion>
      <Accordion title={values.titleTwo}>
        <p>{values.bodyTwo}</p>
      </Accordion>
    </Accordions>
  );

  const accordionList = screen.getByTestId("accordions");
  const firstAccordionDiv = accordionList.firstChild
    ?.firstChild as HTMLDivElement;
  const lastAccordionDiv = accordionList.lastChild
    ?.firstChild as HTMLDivElement;

  expect(firstAccordionDiv.classList.contains("active")).toBe(false);
  expect(lastAccordionDiv.classList.contains("active")).toBe(true);

  fireEvent.click(screen.getByText(values.titleOne));

  expect(firstAccordionDiv.classList.contains("active")).toBe(true);
  expect(lastAccordionDiv.classList.contains("active")).toBe(false);
});
