import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { SubPane } from "../../SubPane";
import Accordion from "../Accordion";

const values = {
  titleOne: "Topic 1",
  bodyOne: "Pane 1 content",
  iconOne: "icon1.jpg",
  titleTwo: "Topic 2",
  bodyTwo: "Pane 2 content",
  iconTwo: "icon2.jpg",
};

test("accordions are rendered", async () => {
  render(
    <Accordion activeIcon="arrow-down.jpg" inactiveIcon="arrow-up.jpg">
      <SubPane title={values.titleOne} icon={values.iconOne}>
        <p>{values.bodyOne}</p>
      </SubPane>
      <SubPane title={values.titleTwo} icon={values.iconTwo}>
        <p>{values.bodyTwo}</p>
      </SubPane>
    </Accordion>
  );

  expect(screen.getByText(values.titleOne)).toBeDefined();
  expect(screen.getByText(values.titleTwo)).toBeDefined();
});

test("correct accordion is open/active", async () => {
  render(
    <Accordion
      defaultActiveKey={1}
      activeIcon="arrow-down.jpg"
      inactiveIcon="arrow-up.jpg"
    >
      <SubPane title={values.titleOne} icon={values.iconOne}>
        <p>{values.bodyOne}</p>
      </SubPane>
      <SubPane title={values.titleTwo} icon={values.iconTwo}>
        <p>{values.bodyTwo}</p>
      </SubPane>
    </Accordion>
  );

  const accordionList = screen.getByTestId("accordion-list");
  const firstAccordion = accordionList.firstChild as HTMLLIElement;
  const lastAccordion = accordionList.lastChild as HTMLLIElement;

  expect(firstAccordion.classList.contains("active")).toBe(false);
  expect(lastAccordion.classList.contains("active")).toBe(true);

  fireEvent.click(screen.getByText(values.titleOne));

  expect(firstAccordion.classList.contains("active")).toBe(true);
  expect(lastAccordion.classList.contains("active")).toBe(false);
});
