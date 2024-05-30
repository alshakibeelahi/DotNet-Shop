import { getBaseUrl } from '@/app/utils'
import { clearLocalStorageItems } from '@/app/utils/storageService'
import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }) => async ({ url, method, data, params, headers }: { url: string, method: string, data: any, params: any, headers: any }) => {
  try {
    console.log('baseUrl', baseUrl)
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
      headers
    })
    return { data: result.data }
  } catch (axiosError: any) {
    const err = axiosError
    if (err.response?.status === 401) {
      clearLocalStorageItems()
      window.location.href = '/login'
    }
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    }
  }
}

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: ['artists', 'radios', 'recordLabels', 'events', 'partyPotraits', 'theFeedbackDrone', 'user', 'follower', 'contents', 'dashboardContents', 'products', 'orders'],
})

