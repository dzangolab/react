import { AcceptInvitationResponse, AddInvitationResponse, GetInvitationResponse, LoginCredentials, ResendInvitationResponse, RevokeInvitationResponse } from "@/types";
export declare const addInvitation: (invitationData: any, apiBaseUrl: string) => Promise<AddInvitationResponse>;
export declare const resendInvitation: (id: number, apiBaseUrl: string) => Promise<ResendInvitationResponse>;
export declare const revokeInvitation: (id: number, apiBaseUrl: string) => Promise<RevokeInvitationResponse>;
export declare const getInvitationByToken: (token: string, apiBaseUrl: string) => Promise<GetInvitationResponse>;
export declare const acceptInvitation: (token: string, credential: LoginCredentials, apiBaseUrl: string) => Promise<AcceptInvitationResponse>;
//# sourceMappingURL=index.d.ts.map