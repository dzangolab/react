import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export enum TagsEnum {
  Invitations = "invitations",
}

const staggeredBaseQuery = retry(
  fetchBaseQuery({ baseUrl: window.location.origin }),
  {
    maxRetries: 5,
  }
);

const userBaseApi = createApi({
  baseQuery: staggeredBaseQuery,
  keepUnusedDataFor: 30,
  tagTypes: Object.keys(TagsEnum),
  endpoints: (build) => ({}),
});

export default userBaseApi;
