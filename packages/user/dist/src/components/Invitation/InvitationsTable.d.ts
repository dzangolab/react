/// <reference types="react" />
import { AdditionalFormFields } from "@dzangolab/react-form";
import { TDataTableProperties, TRequestJSON, IButtonProperties } from "@dzangolab/react-ui";
import type { AddInvitationResponse, InvitationAppOption, InvitationRoleOption, InvitationExpiryDateField, ResendInvitationResponse, RevokeInvitationResponse, Invitation } from "../../types";
type VisibleColumn = "email" | "app" | "role" | "invitedBy" | "expiresAt" | "status" | "actions" | string;
export type InvitationsTableProperties = Partial<Omit<TDataTableProperties<Invitation>, "data" | "visibleColumns" | "fetchData">> & {
    additionalInvitationFields?: AdditionalFormFields;
    apps?: Array<InvitationAppOption>;
    fetchInvitations?: (arguments_: TRequestJSON) => void;
    invitationButtonOptions?: IButtonProperties;
    invitationExpiryDateField?: InvitationExpiryDateField;
    invitations: Array<Invitation>;
    onInvitationAdded?: (response: AddInvitationResponse) => void;
    onInvitationResent?: (data: ResendInvitationResponse) => void;
    onInvitationRevoked?: (data: RevokeInvitationResponse) => void;
    prepareInvitationData?: (data: any) => any;
    roles?: Array<InvitationRoleOption>;
    showAppColumn?: boolean;
    showInviteAction?: boolean;
    visibleColumns?: VisibleColumn[];
};
export declare const InvitationsTable: ({ additionalInvitationFields, apps, className, columns, fetchInvitations, invitationButtonOptions, invitationExpiryDateField, invitations, onInvitationAdded, onInvitationResent, onInvitationRevoked, prepareInvitationData, roles, showInviteAction, totalRecords, visibleColumns, ...tableOptions }: InvitationsTableProperties) => import("react").JSX.Element;
export {};
//# sourceMappingURL=InvitationsTable.d.ts.map