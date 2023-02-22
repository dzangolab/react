import { render } from "@testing-library/react";
import { test } from "vitest";

import Home from ".";

test("Empty rendered", async () => {
  render(<Home />);
});
