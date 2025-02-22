import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/" }),
  tagTypes: ["Chat", "User"],
  endpoints: (builder) => ({
    myChart: builder.query({
      query: () => ({
        url: "chat/my",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (searchTerm) => ({
        url: `user/search?name=${searchTerm}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
        query: (data) => {
          return {
            url: "user/request",
            method: "POST",
            credentials: "include",
            body: data,
          };
        },
        invalidatesTags: ["User"],
      }),   
      
  }),
});

export default api;
export const {
  useMyChartQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} = api; 
