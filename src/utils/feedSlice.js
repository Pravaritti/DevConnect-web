import { createSlice } from "@reduxjs/toolkit";

const feedSlice= createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeFeed: (state, action) => null,
    },
});

export const { addFeed }= feedSlice.actions;
export const feedReducer= feedSlice.reducer;