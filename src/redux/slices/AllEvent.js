import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event: [],
  loading:false
};

const EventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvent(state, action) {
      state.event = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setEvent, setLoading } = EventSlice.actions;
export default EventSlice.reducer;
