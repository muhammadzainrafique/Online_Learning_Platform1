import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading:true,
    token:null
}
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        userExist:(state, action)=>{
            const { accessToken } = action.payload;
            state.token = accessToken;
            state.loading = false;
        },
        userNotExist:(state, action)=>{
            state.token = null;
            state.loading = true;
        }
    }
})

export const {
    userExist,
    userNotExist
} = authSlice.actions
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;