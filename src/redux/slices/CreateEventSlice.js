// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const authSlice = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { createEventData, setLoading } = authSlice.actions;
export default authSlice.reducer;
