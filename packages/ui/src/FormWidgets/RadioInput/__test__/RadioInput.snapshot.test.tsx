import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { RadioInput } from "..";

const options = [
  { label: "One", value: "1" },
  { label: "Two", value: "2" },
  { label: "Three", value: "3" },
];

describe("RadioInput", () => {
  test("should match snapshot with options", () => {
    const { container } = render(<RadioInput options={options} />);
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with disabled set to true", () => {
    const { container } = render(
      <RadioInput options={options} disabled={true} />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with custom className", () => {
    const { container } = render(
      <RadioInput options={options} className="custom-class" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with a custom label", () => {
    const { container } = render(
      <RadioInput options={options} label="Custom label" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with a custom name", () => {
    const { container } = render(
      <RadioInput options={options} name="radioInput" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with all props set", () => {
    const { container } = render(
      <RadioInput
        className="radio-input"
        name="radioInput"
        label="Custom Label"
        options={options}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
