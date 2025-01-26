import { Space } from "@/constants/name.const";
import { createSlice } from "@reduxjs/toolkit"

interface SpaceType {
    spaceName: string
}

const initialState:SpaceType = {
    spaceName: ''
}

const spaceSlice = createSlice({
    name: 'spaces',
    initialState,
    reducers:{
        setSpace: (state, action) => {
            state.spaceName = action.payload;
        }
    }
});

export const { setSpace } = spaceSlice.actions;
export default spaceSlice.reducer;