import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    places: [],
    error: null,
};

const daysLeftSlice = createSlice({
    name: 'daysLeft',
    initialState,
    reducers: {
        daysLeftFetchSuccess: (state, action) => {
            state.isLoading = false;
            state.places = action.payload;
            state.error = null;
        },
        daysLeftFetchFailure: (state, action) => {
            state.isLoading = false;
            state.places = [];
            state.error = action.payload;
        },
    },
});

export const { daysLeftFetchSuccess, daysLeftFetchFailure } = daysLeftSlice.actions;
export default daysLeftSlice.reducer;