import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    places: [],
    error: null,
};

const placeOfWorkSlice = createSlice({
    name: 'placeOfWork',
    initialState,
    reducers: {
        placeOfWorkFetchSuccess: (state, action) => {
            state.isLoading = false;
            state.places = action.payload;
            state.error = null;
        },
        placeOfWorkFetchFailure: (state, action) => {
            state.isLoading = false;
            state.places = [];
            state.error = action.payload;
        },
    },
});

export const { placeOfWorkFetchSuccess, placeOfWorkFetchFailure } = placeOfWorkSlice.actions;
export default placeOfWorkSlice.reducer;