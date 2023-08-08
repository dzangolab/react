import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";

import { userContext } from "../../context/UserProvider";
import DropdownUserMenu from "../DropdownUserMenu";

const setup = () => {
  const values = {
    setUser: vi.fn(),
    user: {
      id: "5",
      email: "test@gmail.com",
      timeJoined: 320,
      middleNames: null,
      lastLoginAt: 0,
      signedUpAt: 0,
      surname: null,
      givenName: null,
      roles: ["USER"],
    },
    loading: false,
  };

  return {
    user: values.user,
    userEvent: userEvent.setup(),
    ...render(
      <MemoryRouter>
        <userContext.Provider value={values}>
          <DropdownUserMenu label={values.user.email} />
        </userContext.Provider>
      </MemoryRouter>,
    ),
  };
};

test("user email is displayed", async () => {
  const { user } = setup();

  expect(screen.getByText(user.email)).toBeDefined();
});

test("test dropdown on clicking user email", async () => {
  const { user, userEvent, getByRole } = setup();

  const ul = getByRole("list");

  expect(screen.getByText(user.email)).toBeDefined();
  expect(ul.getAttribute("data-aria-hidden")).toBe("true");

  await act(async () => {
    await userEvent.click(screen.getByText(user.email));
  });

  expect(ul.getAttribute("data-aria-hidden")).toBe("false");
  expect(await screen.findByText("userMenu.logout")).toBeDefined();

  await act(async () => {
    await userEvent.click(screen.getByText(user.email));
  });

  expect(ul.getAttribute("data-aria-hidden")).toBe("true");
});
