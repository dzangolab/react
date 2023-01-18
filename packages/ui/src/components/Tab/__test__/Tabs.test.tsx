import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import Tab from "../Tab";
import Tabs from "../Tabs";

const values = {
  titleOne: "Tab one",
  bodyOne: "Body text one",
  titleTwo: "Tab two",
  bodyTwo: "Body text two",
};

test("tabs are rendered", async () => {
  render(
    <Tabs>
      <Tab title={values.titleOne}>
        <p>{values.bodyOne}</p>
      </Tab>
      <Tab title={values.titleTwo}>
        <p>{values.bodyTwo}</p>
      </Tab>
    </Tabs>
  );

  expect(screen.getByText(values.titleOne)).toBeDefined();
  expect(screen.getByText(values.titleTwo)).toBeDefined();
});

test("correct tab is rendered", async () => {
  render(
    <Tabs>
      <Tab title={values.titleOne}>
        <p>{values.bodyOne}</p>
      </Tab>
      <Tab title={values.titleTwo}>
        <p>{values.bodyTwo}</p>
      </Tab>
    </Tabs>
  );

  expect(screen.getByText(values.bodyOne)).toBeDefined();

  fireEvent.click(screen.getByText(values.titleTwo));

  expect(screen.getByText(values.bodyTwo)).toBeDefined();
});
