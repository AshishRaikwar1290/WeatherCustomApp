/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const defaulState = {
  errorObj:null
};

export const weatherDataSlice = createSlice({
  name: "weatherDataSlice",
  initialState: { ...defaulState },
  reducers: {
    setErrorObj(state, action) {
        state.errorObj = action.payload;
    },
  },
});

export const {
  setErrorObj
} = weatherDataSlice.actions;
