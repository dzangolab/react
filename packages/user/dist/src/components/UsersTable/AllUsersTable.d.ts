/// <reference types="react" />
import { AdditionalFormFields } from "@dzangolab/react-form";
import { TDataTableProperties, TRequestJSON, IButtonProperties } from "@dzangolab/react-ui";
import type { AddInvitationResponse, InvitationAppOption, InvitationRoleOption, ResendInvitationResponse, RevokeInvitationResponse, ExtendedUser } from "@/types";
type VisibleColumn = "name" | "email" | "roles" | "signedUpAt" | "app" | "invitedBy" | "status" | "actions" | string;
export type AllUsersTableProperties = Partial<Omit<TDataTableProperties<ExtendedUser>, "data" | "visibleColumns" | "fetchData">> & {
    additionalInvitationFields?: AdditionalFormFields;
    apps?: Array<InvitationAppOption>;
    fetchUsers?: (arguments_: TRequestJSON) => void;
    invitationButtonOptions?: IButtonProperties;
    onInvitationAdded?: (response: AddInvitationResponse) => void;
    onInvitationResent?: (data: ResendInvitationResponse) => void;
    onInvitationRevoked?: (data: RevokeInvitationResponse) => void;
    onUserDisabled?: (data: any) => void;
    onUserEnabled?: (data: any) => void;
    prepareInvitationData?: (data: any) => any;
    roles?: Array<InvitationRoleOption>;
    showInviteAction?: boolean;
    showAppColumn?: boolean;
    users: Array<ExtendedUser>;
    visibleColumns?: VisibleColumn[];
};
export declare const AllUsersTable: ({ additionalInvitationFields, apps, className, columns, fetchUsers, invitationButtonOptions, onInvitationAdded, onInvitationResent, onInvitationRevoked, onUserDisabled, onUserEnabled, prepareInvitationData, roles, showInviteAction, totalRecords, users, visibleColumns, ...tableOptions }: AllUsersTableProperties) => import("react").JSX.Element;
export {};
//# sourceMappingURL=AllUsersTable.d.ts.map