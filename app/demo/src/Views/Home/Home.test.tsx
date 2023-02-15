import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Home from ".";

test("Empty rendered", async () => {
  render(<Home />);
});
