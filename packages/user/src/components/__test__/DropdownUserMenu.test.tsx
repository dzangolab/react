import { render, screen } from "@testing-library/react";
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
      profile: null,
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
          <DropdownUserMenu />
        </userContext.Provider>
      </MemoryRouter>
    ),
  };
};

test("user email is displayed", async () => {
  const { user } = setup();

  expect(screen.getByText(user.email)).toBeDefined();
});

test("test dropdown on clicking user email", async () => {
  const { user, userEvent } = setup();

  expect(screen.getByText(user.email)).toBeDefined();

  userEvent.click(screen.getByText(user.email));

  expect(await screen.findByText("userMenu.profile")).toBeDefined();

  await userEvent.click(screen.getByText(user.email));

  expect(screen.queryByText("userMenu.profile")).toBe(null);
});

test("test dropdown items", async () => {
  const { user, userEvent } = setup();

  expect(screen.getByText(user.email)).toBeDefined();

  userEvent.click(screen.getByText(user.email));

  expect(await screen.findByText("userMenu.profile")).toBeDefined();

  await userEvent.click(screen.getByText("userMenu.profile"));

  expect(screen.queryByText("userMenu.profile")).toBe(null);
});
