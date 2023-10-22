import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    places: [],
    error: null,
};

const paidLeaveSchedulesSlice = createSlice({
    name: 'paidLeaveSchedules',
    initialState,
    reducers: {
        paidLeaveSchedulesFetchSuccess: (state, action) => {
            state.isLoading = false;
            state.places = action.payload;
            state.error = null;
        },
        paidLeaveSchedulesFetchFailure: (state, action) => {
            state.isLoading = false;
            state.places = [];
            state.error = action.payload;
        },
    },
});

export const { paidLeaveSchedulesFetchSuccess, paidLeaveSchedulesFetchFailure } = paidLeaveSchedulesSlice.actions;
export default paidLeaveSchedulesSlice.reducer;