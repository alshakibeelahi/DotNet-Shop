import { getLocalStorageItem } from "@/app/utils/storageService";
import { baseApi } from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //Get all users
    allUsers: builder.query({
      query: (userFilter) => ({
        url: `/users?limit=9&page=${userFilter.page}&type=${userFilter.type}&search=${userFilter.search}&userId=${getLocalStorageItem(
          "userId"
        )}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
      providesTags: ["artists"],
    }),
    //Get artists list
    artistDetails: builder.query({
      query: (artistFilterData) => ({
        url: `users/artist-details/${artistFilterData.id}?select=${artistFilterData.select}&userId=${getLocalStorageItem("userId")}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},

      }),
      providesTags: ["artists"],
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: `users/user-details`,
        method: "GET",
        data: {},
        params: {},
        headers: {
          Authorization: `${getLocalStorageItem("token")}`,
        },
      }),
      providesTags: ["artists"],
    }),
    updateImage: builder.mutation({
      query: (imageData) => ({
        url: `users/edit-image`,
        method: "PUT",
        data: imageData,
        params: {},
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${getLocalStorageItem("token")}`,
        },
      })
    }),
    updateProfile: builder.mutation({
      query: (updateData) => ({
        url: "users",
        method: "PUT",
        data: updateData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${getLocalStorageItem("token")}`,
        },
        params: {},
      }),
    })
  }),
});

export const { useAllUsersQuery, useArtistDetailsQuery, useUpdateImageMutation, useUpdateProfileMutation } = userApi;
