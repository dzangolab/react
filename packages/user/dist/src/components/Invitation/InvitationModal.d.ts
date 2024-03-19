import { AdditionalFormFields } from "@dzangolab/react-form";
import { IButtonProperties } from "@dzangolab/react-ui";
import React from "react";
import { AddInvitationResponse, InvitationAppOption, InvitationRoleOption, InvitationExpiryDateField } from "@/types";
interface Properties {
    additionalInvitationFields?: AdditionalFormFields;
    apps?: InvitationAppOption[];
    expiryDateField?: InvitationExpiryDateField;
    invitationButtonOptions?: IButtonProperties;
    onSubmitted?: (response: AddInvitationResponse) => void;
    prepareData?: (data: any) => any;
    roles?: InvitationRoleOption[];
}
export declare const InvitationModal: ({ additionalInvitationFields, apps, expiryDateField, invitationButtonOptions, onSubmitted, prepareData, roles, }: Properties) => React.JSX.Element;
export {};
//# sourceMappingURL=InvitationModal.d.ts.map