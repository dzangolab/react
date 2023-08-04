import { toast } from "react-toastify";

import { AddInvitationResponse, Invitation, LoginCredentials } from "@/types";

import client from "../axios";

export const addInvitation = async (
  invitationData: any,
  apiBaseUrl: string
): Promise<AddInvitationResponse> => {
  try {
    const response = await client(apiBaseUrl).post(
      "/invitations",
      invitationData,
      {
        withCredentials: true,
      }
    );

    if (response.data.status === "OK") {
      return response.data.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    toast.error(errorMessage);
  }
};

export const resendInvitation = async (
  id: number,
  apiBaseUrl: string
): Promise<Invitation | undefined> => {
  try {
    const response = await client(apiBaseUrl).post(
      `invitations/resend/${id}`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.data.status === "OK") {
      return response.data.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    toast.error(errorMessage);
  }
};

export const revokeInvitation = async (
  id: number,
  apiBaseUrl: string
): Promise<Invitation | undefined> => {
  try {
    const response = await client(apiBaseUrl).put(
      `invitations/revoke/${id}`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.data.status === "OK") {
      return response.data.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    toast.error(errorMessage);
  }
};

export const getInvitationByToken = async (
  token: string,
  apiBaseUrl: string
): Promise<Invitation | undefined> => {
  try {
    const response = await client(apiBaseUrl).post(
      `invitations/token/${token}`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.data.status === "OK") {
      return response.data.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    toast.error(errorMessage);
  }
};

export const acceptInvitation = async (
  token: string,
  credential: LoginCredentials,
  apiBaseUrl: string
): Promise<Invitation | undefined> => {
  try {
    const response = await client(apiBaseUrl).put(
      `invitations/token/${token}`,
      credential,
      {
        withCredentials: true,
      }
    );

    if (response.data.status === "OK") {
      return response.data.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    toast.error(errorMessage);
  }
};
