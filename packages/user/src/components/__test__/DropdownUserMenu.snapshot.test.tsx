import { render } from "@testing-library/react";
import React from "react";
import { expect, test, vi } from "vitest";

import { userContext } from "../../context/UserProvider";
import DropdownUserMenu from "../DropdownUserMenu";

test("Component matches snapshot", () => {
  const values = {
    setUser: vi.fn(),
    user: {
      id: "5",
      email: "test@gmail.com",
      timeJoined: 320,
      middleNames: null,
      lastLoginAt: 0,
      signedUpAt: 0,
      surname: "name",
      givenName: "test",
      roles: ["USER"],
    },
    loading: false,
  };

  const { container } = render(
    <userContext.Provider value={values}>
      <DropdownUserMenu />
    </userContext.Provider>,
  );

  expect(container).toMatchSnapshot();
});
