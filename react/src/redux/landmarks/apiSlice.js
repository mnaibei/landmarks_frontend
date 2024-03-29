/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLandmarks = createAsyncThunk(
  "landmarks/fetchLandmarks",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/landmarks");
      if (response.status === 200) {
        // console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
