import { configureStore } from '@reduxjs/toolkit';
import landmarkReducer from './landmarks/landmarkSlice';

export default configureStore({
  reducer: {
    landmarks: landmarkReducer,
  },
});
