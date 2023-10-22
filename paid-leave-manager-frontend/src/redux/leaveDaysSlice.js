import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    places: [],
    error: null,
};

const leaveDaysSlice = createSlice({
    name: 'leaveDays',
    initialState,
    reducers: {
        leaveDaysFetchSuccess: (state, action) => {
            state.isLoading = false;
            state.places = action.payload;
            state.error = null;
        },
        leaveDaysFetchFailure: (state, action) => {
            state.isLoading = false;
            state.places = [];
            state.error = action.payload;
        },
    },
});

export const { leaveDaysFetchSuccess, leaveDaysFetchFailure } = leaveDaysSlice.actions;
export default leaveDaysSlice.reducer;