import { getLocalStorageItem } from "@/app/utils/storageService";
import { baseApi } from "../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //Add order
    addOrder: builder.mutation({
      query: (orderData) => ({
        url: "order/add",
        method: "POST",
        data: orderData,
        headers:{
          "Authorization": `${getLocalStorageItem("token")}`
        },
        params: {},
      }),
      invalidatesTags: ["orders"]
    }),
    //Get all orders
    allOrders: builder.query({
      query: (orderFilters) => ({
        url: `orders/list?limit=${orderFilters.limit}&page=${orderFilters.page}&profile=${orderFilters.profile}`,
        method: "GET",
        data: {},
        params: {},
        headers: {
          "Authorization": `${getLocalStorageItem("token")}`
        },
      }),
      providesTags: ["orders"],
    }),
    //Get order Details
    getOrderDetails: builder.query({
      query: (orderFilters) => ({
        url: `orders/${orderFilters.id}`,
        method: "GET",
        data: {},
        params: {},
        headers: {
          "Authorization": `${getLocalStorageItem("token")}`
        },
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const { useAddOrderMutation, useAllOrdersQuery, useGetOrderDetailsQuery } = orderApi;
