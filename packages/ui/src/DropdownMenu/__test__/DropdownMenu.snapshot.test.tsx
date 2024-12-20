import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import DropdownMenu from "..";

test("Component matches snapshot", () => {
  const menuItems = [
    {
      icon: "pi pi-lock",
      label: "user title",
    },
    {
      icon: "pi pi-user",
      label: "user profile",
    },
  ];

  const { container } = render(<DropdownMenu menu={menuItems} />);
  expect(container).toMatchSnapshot();
});
