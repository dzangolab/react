import { describe } from "node:test";

import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { expect, test, vi } from "vitest";

import Modal from "..";

describe("Modal", () => {
  test("should render modal when visible is true", () => {
    render(
      <Modal visible={true} onHide={vi.fn()}>
        Modal content
      </Modal>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("should not render modal when visible is false", () => {
    render(
      <Modal visible={false} onHide={vi.fn()}>
        Modal content
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  test("should call onHide when the close button is clicked", () => {
    const handleHide = vi.fn();

    render(
      <Modal visible={true} onHide={handleHide}>
        Modal content
      </Modal>,
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(handleHide).toHaveBeenCalled();
  });

  test("should display header content correctly", () => {
    render(
      <Modal visible={true} header="Modal header" onHide={vi.fn()}>
        Modal content
      </Modal>,
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Modal header");
  });
});
