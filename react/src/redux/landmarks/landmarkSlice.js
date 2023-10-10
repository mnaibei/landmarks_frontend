import { createSlice } from '@reduxjs/toolkit';
import { fetchLandmarks } from './apiSlice';

const initialState = {
  landmarks: [],
  status: 'idle',
  isLoading: false,
  error: null,
};

const landmarkSlice = createSlice({
  name: 'landmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandmarks.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchLandmarks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.landmarks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchLandmarks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default landmarkSlice.reducer;
