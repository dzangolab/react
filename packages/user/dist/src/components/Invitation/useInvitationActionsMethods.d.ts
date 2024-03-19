import { ResendInvitationResponse } from "../../types";
export declare const useInvitationActionsMethods: ({ onInvitationResent, onInvitationRevoked, }: {
    onInvitationResent?: ((response: ResendInvitationResponse) => void) | undefined;
    onInvitationRevoked?: ((response: ResendInvitationResponse) => void) | undefined;
}) => {
    onResendConfirm: (invitation: any) => void;
    onRevokeConfirm: (invitation: any) => void;
};
//# sourceMappingURL=useInvitationActionsMethods.d.ts.map