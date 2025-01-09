import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Tag } from "..";

describe("Tag", () => {
  test("should match snapshot with default props", () => {
    const { container } = render(<Tag />);
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with custom className", () => {
    const { container } = render(<Tag className="tag-item" />);
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with custom color set", () => {
    const { container } = render(<Tag color="green" />);
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with fullWidth set to true", () => {
    const { container } = render(<Tag fullWidth={true} />);
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with rounded set to true", () => {
    const { container } = render(<Tag rounded={true} />);
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with custom icon", () => {
    const { container } = render(<Tag icon="pi pi-times" />);
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with custom label", () => {
    const { container } = render(<Tag label="test tag" />);
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with custom style", () => {
    const { container } = render(<Tag style={{ color: "red" }} />);
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with custom renderContent", () => {
    const { container } = render(
      <Tag
        renderContent={() => {
          return (
            <>
              <i className="tag-item"></i>
            </>
          );
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with all props set", () => {
    const { container } = render(
      <Tag
        className="tag-item"
        color="green"
        fullWidth={true}
        icon="pi pi-times"
        label="Custom Label"
        rounded={true}
        style={{ color: "red" }}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
