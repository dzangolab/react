import { ErrorResponse } from "./types";

export interface InvitationPayload {
  email: string;
  role: string;
}

export interface Invitation {
  id: number;
  email: string;
  role: string;
}

export type AddInvitationResponse = Invitation | ErrorResponse;

export type ResendInvitationResponse = Invitation | ErrorResponse;

export type RevokeInvitationResponse = Invitation | ErrorResponse;

export type GetInvitationResponse = Invitation | ErrorResponse;

export type AccpetInvitationResponse = any | ErrorResponse;
