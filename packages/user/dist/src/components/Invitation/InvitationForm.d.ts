import { AdditionalFormFields } from "@dzangolab/react-form";
import React from "react";
import type { AddInvitationResponse, InvitationAppOption, InvitationRoleOption, InvitationExpiryDateField } from "@/types";
interface Properties {
    additionalInvitationFields?: AdditionalFormFields;
    apps?: InvitationAppOption[];
    expiryDateField?: InvitationExpiryDateField;
    onCancel?: () => void;
    onSubmitted?: (response: AddInvitationResponse) => void;
    prepareData?: (rawFormData: any) => any;
    roles?: InvitationRoleOption[];
}
export declare const InvitationForm: ({ additionalInvitationFields, apps, expiryDateField, onSubmitted, onCancel, prepareData, roles, }: Properties) => React.JSX.Element;
export {};
//# sourceMappingURL=InvitationForm.d.ts.map