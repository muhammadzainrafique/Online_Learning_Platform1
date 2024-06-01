import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseQuery = fetchBaseQuery({
    prepareHeaders:(headers, {getState})=>{
        const token = getState()?.auth?.token;
        if(token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers;
    },
    baseUrl:'http://localhost:5000',
    credentials:'include',
})
export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery,
    tagTypes:['Course', 'Users'],
    endpoints:builder => ({})
})