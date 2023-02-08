import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { SubPane } from "../../SubPane";
import TabbedPanel from "../TabbedPanel";

const values = {
  titleOne: "Topic 1",
  bodyOne: "Pane 1 content",
  iconOne: "icon1.jpg",
  titleTwo: "Topic 2",
  bodyTwo: "Pane 2 content",
  iconTwo: "icon2.jpg",
};

test("tabs are rendered", async () => {
  render(
    <TabbedPanel>
      <SubPane title={values.titleOne} icon={values.iconOne}>
        <p>{values.bodyOne}</p>
      </SubPane>
      <SubPane title={values.titleTwo} icon={values.iconTwo}>
        <p>{values.bodyTwo}</p>
      </SubPane>
    </TabbedPanel>
  );

  expect(screen.getByText(values.titleOne)).toBeDefined();
  expect(screen.getByText(values.titleTwo)).toBeDefined();
});

test("correct tab is rendered", async () => {
  render(
    <TabbedPanel>
      <SubPane title={values.titleOne} icon={values.iconOne}>
        <p>{values.bodyOne}</p>
      </SubPane>
      <SubPane title={values.titleTwo} icon={values.iconTwo}>
        <p>{values.bodyTwo}</p>
      </SubPane>
    </TabbedPanel>
  );

  fireEvent.click(screen.getByText(values.titleOne));
  expect(screen.getByText(values.bodyOne)).toBeDefined();

  fireEvent.click(screen.getByText(values.titleTwo));
  expect(screen.getByText(values.bodyTwo)).toBeDefined();
});
