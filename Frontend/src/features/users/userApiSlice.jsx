import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        newUser:builder.mutation({
            query:(data)=>({
                url:'/auth/register',
                method:'POST',
                body:data,
            })
        }),
        allUsers:builder.query({
            query:()=>'/user/getAll'
        }),
        getUser:builder.query({
            query:(userId)=>`user/${userId}`
        }),
        updateProfile:builder.mutation({
            query:({data, userId})=>({
                url:`/user/${userId}`,
                method:'PATCH',
                body:data
            })
        }),
        updateUserRole:builder.mutation({
            query:({data, userId})=>({
                url:`/user/updateRole/${userId}`,
                method:'PATCH',
                body:data,
            })
        }),
        changePassword:builder.mutation({
            query:({data, userId})=>({
                url:`/user/changePassword/${userId}`,
                method:'PATCH',
                body:data
            })
        }),
        addToPlaylist:builder.mutation({
            query:({data, userId})=>({
                url:`/user/addToPlaylist/${userId}`,
                method:'POST',
                body:data
            })
        }),
        removeFromPlaylist:builder.mutation({
            query:({data, userId})=>({
                url:`/user/removeFromPlaylist/${userId}`,
                method:'POST',
                body:data
            })
        }),
        changeProfilePhoto:builder.mutation({
            query:({data, userId})=>({
                url:``,
                method:'PATCH',
                body:data
            })
        }),

    })
})

export const {
    useNewUserMutation,
    useGetUserQuery,
    useAddToPlaylistMutation,
    useAllUsersQuery,
    useChangePasswordMutation,
    useChangeProfilePhotoMutation,
    useUpdateProfileMutation,
    useUpdateUserRoleMutation,
    useRemoveFromPlaylistMutation

} = userApiSlice