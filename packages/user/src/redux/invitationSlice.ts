import { TRequestJSON } from "@dzangolab/react-ui";

import type { InvitationPayload, LoginCredentials } from "..";

export type UsersType = {
  id: number;
  givenName: string;
  middleNames: string;
  surname: string;
};

export type InvitationType = {
  id: number;
  email: string;
  invitedBy: UsersType;
  expiresAt: string;
  role: string;
};

interface InvitationsResponse {
  totalCount: number;
  data: InvitationType[];
}

const encodeURIParameter = <T>(argument: T) => {
  return !argument ? undefined : JSON.stringify(argument);
};

const invitationApi: any = {};

const getInvitationApi = (baseApi: any) => {
  const api = baseApi.injectEndpoints({
    endpoints: (build: any) => ({
      // inviteUser: build.mutation<any, InvitationPayload>({
      inviteUser: build.mutation({
        query: (payload: InvitationPayload) => {
          {
            const url = `invitations`;

            return {
              url,
              method: "POST",
              body: payload,
            };
          }
        },
      }),

      acceptInvitation: build.mutation({
        // acceptInvitation: build.mutation<InvitationType, any>({
        query: ({
          token,
          ...credential
        }: LoginCredentials & { token: string }) => {
          {
            const url = `invitations/token/${token}`;

            return {
              url,
              method: "POST",
              body: credential,
            };
          }
        },
      }),

      getInvitationByToken: build.query({
        // getInvitationByToken: build.query<InvitationType, any>({
        query: ({ token }: { token: string }) => {
          {
            const url = `invitations/token/${token}`;

            return {
              url,
            };
          }
        },
      }),

      getInvitations: build.query({
        // getInvitations: build.query<InvitationsResponse, any>({
        query: (requestJSON: TRequestJSON | null) => {
          const url = `invitations`;

          return {
            url,
            params: {
              filters: encodeURIParameter(requestJSON?.filter),
              limit: encodeURIParameter(requestJSON?.limit),
              offset: encodeURIParameter(requestJSON?.offset),
              sort: encodeURIParameter(requestJSON?.sort),
            },
          };
        },
        transformResponse: (response: InvitationsResponse) => response,
        providesTags: ["invitations"],
      }),

      // resendInvitation: build.mutation<InvitationsResponse, any>({
      resendInvitation: build.mutation({
        query: (id: string) => {
          return {
            url: `invitations/${id}/resend`,
            method: "POST",
            body: {},
          };
        },
        transformResponse: (response: InvitationsResponse) => response,
      }),

      // revokeInvitation: build.mutation<InvitationsResponse, any>({
      revokeInvitation: build.mutation({
        query: (id: string) => {
          return {
            url: `invitations/${id}/revoke`,
            method: "POST",
            body: {},
          };
        },

        transformResponse: (response: InvitationsResponse) => response,
        invalidatesTags: ["invitations"],
      }),
    }),
  });

  const {
    useLazyGetUsersQuery,
    useInviteUserMutation,
    useAcceptInvitationMutation,
    useGetInvitationByTokenQuery,
    useLazyGetInvitationsQuery,
    useResendInvitationMutation,
    useRevokeInvitationMutation,
  } = api;

  invitationApi["useLazyGetUsersQuery"] = useLazyGetUsersQuery;
  invitationApi["useInviteUserMutation"] = useInviteUserMutation;
  invitationApi["useAcceptInvitationMutation"] = useAcceptInvitationMutation;
  invitationApi["useGetInvitationByTokenQuery"] = useGetInvitationByTokenQuery;
  invitationApi["useLazyGetInvitationsQuery"] = useLazyGetInvitationsQuery;
  invitationApi["useResendInvitationMutation"] = useResendInvitationMutation;
  invitationApi["useRevokeInvitationMutation"] = useRevokeInvitationMutation;

  return api;
};

export const {
  useLazyGetUsersQuery,
  useInviteUserMutation,
  useAcceptInvitationMutation,
  useGetInvitationByTokenQuery,
  useLazyGetInvitationsQuery,
  useResendInvitationMutation,
  useRevokeInvitationMutation,
} = invitationApi;
export default getInvitationApi;
