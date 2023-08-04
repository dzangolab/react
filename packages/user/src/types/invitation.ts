export interface InvitationPayload {
  email: string;
  role: string;
}

export interface Invitation {
  email: string;
  role: string;
}

export type AddInvitationResponse = Invitation | undefined;
