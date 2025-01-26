//Redux Toolkit을 사용하여 전역 상태 관리를 설정합니다.

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  posts: any[];
  status: "idle" | "loading" | "failed";
}

const initialState: PostState = {
  posts: [],
  status: "idle",
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<any[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
