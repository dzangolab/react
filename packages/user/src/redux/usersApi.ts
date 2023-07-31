import userBaseApi, { TagsEnum } from "./userBaseApi";
import { encodeURIParameter } from "../helpers";

import type { InvitationPayload, LoginCredentials } from "..";
import type { InvitationType, InvitationsResponse } from "../types/types";
import type { TRequestJSON } from "@dzangolab/react-ui";

const usersApi: any = {};

const createUsersApi = (baseApi: typeof userBaseApi) => {
  const api = baseApi.injectEndpoints({
    endpoints: (build) => ({
      // inviteUser: build.mutation<
      //   InvitationType,
      //   { url: string; payload: InvitationPayload }
      // >({
      //   query: ({ url, payload }) => {
      //     {
      //       console.log(url);
      //       return {
      //         url,
      //         method: "POST",
      //         body: payload,
      //       };
      //     }
      //   },
      //   transformResponse: (response: InvitationType) => response,
      // }),
      // acceptInvitation: build.mutation<
      //   InvitationType & { status: string; message: string },
      //   { url: string; credentials: LoginCredentials }
      // >({
      //   query: ({ url, credentials }) => {
      //     {
      //       return {
      //         url,
      //         method: "POST",
      //         body: credentials,
      //       };
      //     }
      //   },
      // }),
      // getInvitationByToken: build.query<InvitationType, { url: string }>({
      //   query: ({ url }) => {
      //     {
      //       return {
      //         url,
      //       };
      //     }
      //   },
      // }),
      // getInvitations: build.query<
      //   InvitationsResponse,
      //   { url: string; requestJSON: TRequestJSON | null }
      // >({
      //   query: ({ url, requestJSON }) => {
      //     return {
      //       url,
      //       params: {
      //         filters: encodeURIParameter(requestJSON?.filter),
      //         limit: encodeURIParameter(requestJSON?.limit),
      //         offset: encodeURIParameter(requestJSON?.offset),
      //         sort: encodeURIParameter(requestJSON?.sort),
      //       },
      //     };
      //   },
      //   transformResponse: (response: InvitationsResponse) => response,
      //   providesTags: [TagsEnum.Invitations],
      // }),
      // resendInvitation: build.mutation<InvitationsResponse, { url: string }>({
      //   query: ({ url }) => {
      //     return {
      //       url,
      //       method: "POST",
      //       body: {},
      //     };
      //   },
      //   transformResponse: (response: InvitationsResponse) => response,
      // }),
      // revokeInvitation: build.mutation<InvitationsResponse, { url: string }>({
      //   query: ({ url }) => {
      //     return {
      //       url,
      //       method: "PUT",
      //       body: {},
      //     };
      //   },
      //   transformResponse: (response: InvitationsResponse) => response,
      //   invalidatesTags: [TagsEnum.Invitations],
      // }),

      inviteUser: build.mutation<InvitationType, InvitationPayload>({
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
        transformResponse: (response: InvitationType) => response,
      }),

      acceptInvitation: build.mutation<
        InvitationType & { status: string; message: string },
        any
      >({
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

      getInvitationByToken: build.query<InvitationType, any>({
        query: ({ token }: { token: string }) => {
          {
            const url = `invitations/token/${token}`;

            return {
              url,
            };
          }
        },
      }),

      getInvitations: build.query<InvitationsResponse, any>({
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
        providesTags: [TagsEnum.Invitations],
      }),

      resendInvitation: build.mutation<InvitationsResponse, any>({
        query: (id) => {
          return {
            url: `invitations/resend/${id}`,
            method: "POST",
            body: {},
          };
        },
        transformResponse: (response: InvitationsResponse) => response,
      }),

      revokeInvitation: build.mutation<InvitationsResponse, any>({
        query: (id) => {
          return {
            url: `invitations/revoke/${id}`,
            method: "PUT",
            body: {},
          };
        },

        transformResponse: (response: InvitationsResponse) => response,
        invalidatesTags: [TagsEnum.Invitations],
      }),
    }),
  });

  usersApi["useAcceptInvitationMutation"] = api.useAcceptInvitationMutation;
  usersApi["useGetInvitationByTokenQuery"] = api.useGetInvitationByTokenQuery;
  usersApi["useGetInvitationsQuery"] = api.useGetInvitationsQuery;
  usersApi["useInviteUserMutation"] = api.useInviteUserMutation;
  usersApi["useLazyGetInvitationByTokenQuery"] =
    api.useLazyGetInvitationByTokenQuery;
  usersApi["useResendInvitationMutation"] = api.useResendInvitationMutation;
  usersApi["useRevokeInvitationMutation"] = api.useRevokeInvitationMutation;
  usersApi["useLazyGetInvitationsQuery"] = api.useLazyGetInvitationsQuery;

  return api;
};

export { createUsersApi };
export const {
  useInviteUserMutation,
  useAcceptInvitationMutation,
  useGetInvitationByTokenQuery,
  useLazyGetInvitationsQuery,
  useResendInvitationMutation,
  useRevokeInvitationMutation,
} = usersApi;
