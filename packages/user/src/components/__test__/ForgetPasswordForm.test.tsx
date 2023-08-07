import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { expect, test, vi } from "vitest";

import ForgetPasswordForm from "../ForgetPasswordForm";

const setup = (component: React.ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(component),
  };
};

test("validation error message is displayed when input field is empty", async () => {
  const handleSubmit = vi.fn();
  const { user } = setup(<ForgetPasswordForm handleSubmit={handleSubmit} />);

  const submitButton = screen.getByText("forgetPassword.form.actions.submit");

  expect(
    screen.getByLabelText("forgetPassword.form.email.label"),
  ).toBeDefined();

  act(() => {
    user.click(submitButton);
  });

  await waitFor(() => {
    expect(screen.getByText("validation.messages.email")).toBeDefined();
  });

  expect(handleSubmit).toHaveBeenCalledTimes(0);
});

test("validation error message is displayed for invalid email", async () => {
  const handleSubmit = vi.fn();
  const { user } = setup(<ForgetPasswordForm handleSubmit={handleSubmit} />);

  const emailInput = screen.getByLabelText("forgetPassword.form.email.label");
  const submitButton = screen.getByText("forgetPassword.form.actions.submit");

  expect(
    screen.getByLabelText("forgetPassword.form.email.label"),
  ).toBeDefined();

  await act(async () => {
    await user.type(emailInput, "test.com");
  });

  userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("validation.messages.validEmail")).toBeDefined();
  });

  expect(handleSubmit).toHaveBeenCalledTimes(0);
});

test("form is successfully submitted", async () => {
  const handleSubmit = vi.fn();
  const { user } = setup(<ForgetPasswordForm handleSubmit={handleSubmit} />);

  const emailInput = screen.getByLabelText("forgetPassword.form.email.label");
  const submitButton = screen.getByText("forgetPassword.form.actions.submit");

  expect(
    screen.getByLabelText("forgetPassword.form.email.label"),
  ).toBeDefined();

  await act(async () => {
    await user.type(emailInput, "test@test.com");

    await user.click(submitButton);
  });

  await waitFor(() => {
    expect(screen.queryByText("validation.messages.email")).toBeNull();
  });

  await waitFor(() => {
    expect(screen.queryByText("validation.messages.validEmail")).toBeNull();
  });

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
