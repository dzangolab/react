import { RenderAdditionalFormFields } from "@dzangolab/react-form";
import React from "react";
import { InvitationAppOption, InvitationExpiryDateField, InvitationRoleOption } from "@/types";
interface IProperties {
    renderAdditionalFields?: RenderAdditionalFormFields;
    apps?: InvitationAppOption[];
    expiryDateField?: InvitationExpiryDateField;
    loading?: boolean;
    onCancel?: () => void;
    roles?: InvitationRoleOption[];
}
export declare const InvitationFormFields: React.FC<IProperties>;
export {};
//# sourceMappingURL=InvitationFormFields.d.ts.map