import { getLocalStorageItem } from "@/app/utils/storageService";
import { baseApi } from "../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //Get all products
    allProducts: builder.query({
      query: (productFilters) => ({
        url: `product/all`,
        method: "GET",
        data: {},
        params: {},
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["products"],
    }),
    //Add product
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "product/add",
        method: "POST",
        data: productData,
        headers:{
          "Content-Type": "multipart/form-data", // "Content-Type": "application/json" or "multipart/form-data"
          "Authorization": `${getLocalStorageItem("token")}`
        },
        params: {},
      }),
      invalidatesTags: ["products"]
    }),
    //Delete product
    deleteProduct: builder.mutation({
      query: (productData) => ({
        url: `products/${productData.id}`,
        method: "DELETE",
        data: {},
        params: {},
        headers: {
          "Authorization": `${getLocalStorageItem("token")}`
        },
      }),
      invalidatesTags: ["products"]
    }),
  }),
});

export const { useAllProductsQuery, useAddProductMutation, useDeleteProductMutation } = productApi;
