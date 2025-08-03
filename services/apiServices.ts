import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const session = await getSession();
  const token = session?.user?.accessToken;

  if (!token) {
    return {
      error: {
        status: 401,
        data: { message: 'Unauthorized: No access token' },
      },
    };
  }

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://akil-backend.onrender.com/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  });

  return rawBaseQuery(args, api, extraOptions);
};

export const bookmarkApi = createApi({
  reducerPath: 'bookmarkApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addBookmark: builder.mutation<any, { eventId: string }>({
      query: ({ eventId }) => ({
        url: `bookmarks/${eventId}`,
        method: 'POST',
        body: {},
      }),
    }),
    removeBookmark: builder.mutation<any, { eventId: string }>({
      query: ({ eventId }) => ({
        url: `bookmarks/${eventId}`,
        method: 'DELETE',
      }),
    }),
    getBookmarks: builder.query<any, void>({
      query: () => 'bookmarks',
    }),
  }),
});

export const {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  useGetBookmarksQuery,
} = bookmarkApi;
