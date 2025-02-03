import { createSlice } from "@reduxjs/toolkit";

interface UserType {
    isLogin: boolean;
}

const initialState:UserType = {
    isLogin: false
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
    }
});


  export const { setIsLogin } = userSlice.actions;
  export default userSlice.reducer;