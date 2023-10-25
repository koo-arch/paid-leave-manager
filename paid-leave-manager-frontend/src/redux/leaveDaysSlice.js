import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    days: [],
    error: null,
};

const leaveDaysSlice = createSlice({
    name: 'leaveDays',
    initialState,
    reducers: {
        leaveDaysFetchSuccess: (state, action) => {
            state.isLoading = false;
            state.days = action.payload;
            state.error = null;
        },
        leaveDaysFetchFailure: (state, action) => {
            state.isLoading = false;
            state.days = [];
            state.error = action.payload;
        },
    },
});

export const { leaveDaysFetchSuccess, leaveDaysFetchFailure } = leaveDaysSlice.actions;
export default leaveDaysSlice.reducer;