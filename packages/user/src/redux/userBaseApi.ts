import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
// import { getConfig } from "@dzangolab/react-config";

export enum TagsEnum {
  Invitations = "invitations",
}

const staggeredBaseQuery = retry(fetchBaseQuery({ baseUrl: "" }), {
  maxRetries: 5,
});
// console.log(getConfig());

const userBaseApi = createApi({
  baseQuery: staggeredBaseQuery,
  keepUnusedDataFor: 30,
  tagTypes: Object.keys(TagsEnum),
  endpoints: (build) => ({}),
});

export default userBaseApi;
