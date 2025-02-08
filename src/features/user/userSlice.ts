// import { createSlice } from "@reduxjs/toolkit";
// import { logoutApi } from "./userApi";
// import { QueryClient } from "@tanstack/react-query";

// interface UserType {
//     isLogin: boolean;
// }

// const initialState:UserType = {
//     isLogin: false
// }

// const userSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers:{
//         setIsLogin: (state, action) => {
//             state.isLogin = action.payload;
//         },
//         logout: (state) => {
//             state.isLogin = false;
//             localStorage.removeItem("accessToken"); // 로컬 스토리지 토큰 삭제 
//             logoutApi(); // 🔄 백엔드 로그아웃 API 호출
//         }
//     }
// });


//   export const { setIsLogin, logout } = userSlice.actions;
//   export default userSlice.reducer;