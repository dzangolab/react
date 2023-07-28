import type { InvitationPayload, LoginCredentials } from "..";
import userBaseApi, { TagsEnum } from "./userBaseApi";
import { encodeURIParameter } from "../helpers";

import type { TRequestJSON } from "@dzangolab/react-ui";

import type { InvitationType, InvitationsResponse } from "../types/types";

const usersApi = userBaseApi.injectEndpoints({
  endpoints: (build) => ({
    inviteUser: build.mutation<
      InvitationType,
      { url: string; payload: InvitationPayload }
    >({
      query: ({ url, payload }) => {
        {
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
      { url: string; credentials: LoginCredentials }
    >({
      query: ({ url, credentials }) => {
        {
          return {
            url,
            method: "POST",
            body: credentials,
          };
        }
      },
    }),

    getInvitationByToken: build.query<InvitationType, { url: string }>({
      query: ({ url }) => {
        {
          return {
            url,
          };
        }
      },
    }),

    getInvitations: build.query<
      InvitationsResponse,
      { url: string; requestJSON: TRequestJSON | null }
    >({
      query: ({ url, requestJSON }) => {
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

    resendInvitation: build.mutation<InvitationsResponse, { url: string }>({
      query: ({ url }) => {
        return {
          url,
          method: "POST",
          body: {},
        };
      },
      transformResponse: (response: InvitationsResponse) => response,
    }),

    revokeInvitation: build.mutation<InvitationsResponse, { url: string }>({
      query: ({ url }) => {
        return {
          url,
          method: "PUT",
          body: {},
        };
      },

      transformResponse: (response: InvitationsResponse) => response,
      invalidatesTags: [TagsEnum.Invitations],
    }),
  }),
});

export const {
  useInviteUserMutation,
  useAcceptInvitationMutation,
  useGetInvitationByTokenQuery,
  useLazyGetInvitationsQuery,
  useResendInvitationMutation,
  useRevokeInvitationMutation,
} = usersApi;
export default usersApi;
