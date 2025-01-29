import { createSlice } from "@reduxjs/toolkit"

interface SpaceType {
    spaceName: string;
    category: string;
}

const initialState:SpaceType = {
    spaceName: '',
    category: 'Home'
}

const spaceSlice = createSlice({
    name: 'spaces',
    initialState,
    reducers:{
        setSpace: (state, action) => {
            state.spaceName = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        }
    }
});

export const { setSpace, setCategory } = spaceSlice.actions;
export default spaceSlice.reducer;