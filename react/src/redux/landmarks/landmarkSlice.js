import { createSlice } from "@reduxjs/toolkit";
import { fetchLandmarks } from "./apiSlice";

const initialState = {
  landmarks: [],
  status: "idle",
  error: null,
};

const landmarkSlice = createSlice({
  name: "landmarks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandmarks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLandmarks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.landmarks = state.landmarks = action.payload;
        // console.log(state.landmarks);
      })
      .addCase(fetchLandmarks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default landmarkSlice.reducer;
