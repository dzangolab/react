import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { SubPane } from "../../components/SubPane";
import TabbedPanel from "../TabbedPanel";

test("Component matches snapshot", () => {
  const { container } = render(
    <TabbedPanel>
      <SubPane icon="icon1.jpg" title="Topic 1">
        Pane 1 content
      </SubPane>
      <SubPane icon="icon2.jpg" title="Topic 2">
        Pane 2 content
      </SubPane>
    </TabbedPanel>,
  );

  expect(container).toMatchSnapshot();
});
