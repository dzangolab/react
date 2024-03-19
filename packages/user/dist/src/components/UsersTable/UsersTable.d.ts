/// <reference types="react" />
import { AdditionalFormFields } from "@dzangolab/react-form";
import { TDataTableProperties, TRequestJSON, IButtonProperties } from "@dzangolab/react-ui";
import type { AddInvitationResponse, InvitationAppOption, InvitationRoleOption, InvitationExpiryDateField, UserType } from "@/types";
type VisibleColumn = "name" | "email" | "roles" | "signedUpAt" | "status" | "actions" | string;
export type UsersTableProperties = Partial<Omit<TDataTableProperties<UserType>, "data" | "visibleColumns" | "fetchData">> & {
    additionalInvitationFields?: AdditionalFormFields;
    apps?: Array<InvitationAppOption>;
    fetchUsers?: (arguments_: TRequestJSON) => void;
    invitationButtonOptions?: IButtonProperties;
    invitationExpiryDateField?: InvitationExpiryDateField;
    onInvitationAdded?: (response: AddInvitationResponse) => void;
    onUserEnabled?: (data: any) => void;
    onUserDisabled?: (data: any) => void;
    prepareInvitationData?: (data: any) => any;
    roles?: Array<InvitationRoleOption>;
    showInviteAction?: boolean;
    users: Array<UserType>;
    visibleColumns?: VisibleColumn[];
};
export declare const UsersTable: ({ additionalInvitationFields, apps, className, columns, fetchUsers, invitationButtonOptions, invitationExpiryDateField, onInvitationAdded, onUserDisabled, onUserEnabled, prepareInvitationData, roles, showInviteAction, totalRecords, users, visibleColumns, ...tableProperties }: UsersTableProperties) => import("react").JSX.Element;
export {};
//# sourceMappingURL=UsersTable.d.ts.map