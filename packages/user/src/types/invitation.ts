import { useFormContext } from "@dzangolab/react-form";
import Zod from "zod";

import { ErrorResponse } from "./types";

export interface InvitationPayload {
  email: string;
  role: string;
  appId?: number;
}

export interface Invitation {
  acceptedAt: number;
  appId: number;
  createdAt: number;
  email: string;
  expiresAt: number;
  id: number;
  invitedById: string;
  payload: any;
  revokedAt: number;
  role: string;
  token?: string;
  updatedAt: number;
}

export interface InvitationRoleOption {
  name: string;
  id: number;
}

export interface InvitationAppOption {
  id: number;
  name: string;
  origin: string;
  supportedRoles: InvitationRoleOption[];
}

export interface AdditionalInvitationFields {
  renderFields: RenderAdditionalInvitationFields;
  schema: AdditionalInvitationSchema;
  defaultValues: AdditionalDefaultValues;
}

export type RenderAdditionalInvitationFields = (
  formContext: typeof useFormContext,
) => React.ComponentType;

export type AdditionalInvitationSchema = Zod.ZodObject<any>;

export type AdditionalDefaultValues = Record<string, any>;

export type AddInvitationResponse = Invitation | ErrorResponse;

export type ResendInvitationResponse = Invitation | ErrorResponse;

export type RevokeInvitationResponse = Invitation | ErrorResponse;

export type GetInvitationResponse = Invitation | ErrorResponse;

export type AccpetInvitationResponse = any | ErrorResponse;
