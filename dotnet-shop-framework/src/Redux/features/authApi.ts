import { getLocalStorageItem } from "@/app/utils/storageService";
import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //Login
    signIn: builder.mutation({
      query: (loginData) => ({
        url: "login",
        method: "POST",
        data: loginData,
        params: {}, // Add empty params object
        headers: {}, // Add empty headers object
      }),
      invalidatesTags: ["user", "follower", "contents"],
    }),
    //Registration
    signUp: builder.mutation({
      query: (registrationData) => ({
        url: "user/add",
        method: "POST",
        data: registrationData,
        params: {},
        headers: {},
      }),
      invalidatesTags: ["user"],
    }),
    //Forget password
    forgetPassword: builder.mutation({
      query: (forgetData) => ({
        url: `users/forget-password`,
        method: "POST",
        data: forgetData,
        params: {},
        headers: {},
      }),
      invalidatesTags: ["user"]
    }),
    //verify email
    verifyEmail: builder.mutation({
      query: (verifyEmailData) => ({
        url: `users/verify-email`,
        method: "POST",
        data: verifyEmailData,
        headers:{
          "signUpToken": `signUpToken ${getLocalStorageItem("signUpToken")}`
        },
        params: {},
      }),
      invalidatesTags: ["user", "follower", "contents", "artists"]
    }),
    //verify otp
    verifyOtp: builder.mutation({
      query: (verifyOtpData) => ({
        url: `users/verify-otp`,
        method: "POST",
        data: verifyOtpData,
        headers:{},
        params: {},
      }),
      invalidatesTags: ["user"]
    }),
    //Reset Password
    resetPassword: builder.mutation({
      query: (resetPasswordData) => ({
        url: `users/reset-password`,
        method: "POST",
        data: resetPasswordData,
        headers:{
          "content-type": "application/json", // "Content-Type": "application/json" or "multipart/form-data
          "forget-password": `Forget-password ${getLocalStorageItem("forget-password-token")}`
        },
        params: {},
      }),
      invalidatesTags: ["user", "follower", "contents"]
    }),
    // Change Password
    changePassword: builder.mutation({
      query: (changePassData) => ({
        url: `users/change-password`,
        method: "PATCH",
        data: changePassData,
        headers: {
          "Authorization": `${getLocalStorageItem("token")}`
        },
        params: {},
      }),
      invalidatesTags: ["user"]
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useForgetPasswordMutation, useVerifyEmailMutation, useVerifyOtpMutation, useResetPasswordMutation, useChangePasswordMutation } = authApi;
