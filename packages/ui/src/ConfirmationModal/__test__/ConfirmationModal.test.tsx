import { describe } from "node:test";

import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { expect, test, vi } from "vitest";

import { ConfirmationModal } from "..";

const confirmationModalData = {
  header: "Confirmation required",
  message: "Are you sure?",
  closeIcon: "pi pi-times",
};

describe("Confirmation modal", () => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();

  test("should render the confirmation modal when visible is true", () => {
    render(
      <ConfirmationModal
        visible={true}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
      />,
    );

    expect(screen.getByText(confirmationModalData.header)).toBeInTheDocument();
    expect(screen.getByText(confirmationModalData.message)).toBeInTheDocument();
  });

  test("should not render the confirmation modal when visible is false", () => {
    render(
      <ConfirmationModal
        visible={false}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
      />,
    );

    expect(screen.queryByText(confirmationModalData.header)).toBeNull();
    expect(screen.queryByText(confirmationModalData.message)).toBeNull();
  });

  test("should render icon passed as ReactNode correctly", () => {
    render(
      <ConfirmationModal
        visible={true}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        icon={<span>!</span>}
      />,
    );
    expect(screen.getByText("!")).toBeInTheDocument();
  });

  test("should call accept function when 'Yes' button is clicked", () => {
    const hanldeAccept = vi.fn();
    render(
      <ConfirmationModal
        visible={true}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        accept={hanldeAccept}
        onHide={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByText("Yes"));
    expect(hanldeAccept).toHaveBeenCalled();
  });

  test("should call reject function when 'No' button is clicked", () => {
    const handleReject = vi.fn();
    render(
      <ConfirmationModal
        visible={true}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        reject={handleReject}
        onHide={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByText("No"));
    expect(handleReject).toHaveBeenCalled();
  });
});
