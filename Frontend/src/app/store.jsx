import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import authReducer from '../features/auth/authSlice'
import { authSlice } from '../features/auth/authSlice'

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        [authSlice.name]:authReducer
    },
    middleware:defaultMiddleware=> defaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})