// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const createEvent = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { createEventData, setLoading } = createEvent.actions;
export default createEvent.reducer;
