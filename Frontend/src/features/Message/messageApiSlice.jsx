import { apiSlice } from "../../app/api/apiSlice";

export const contactApiSlcie = apiSlice.injectEndpoints({
    endpoints:builder=>({
        newMessge:builder.mutation({
            query:(data)=>({
                url:'/message/new',
                method:'POST',
                body:data
            })
        })
    })
})

export const {
    useNewMessgeMutation
} = contactApiSlcie