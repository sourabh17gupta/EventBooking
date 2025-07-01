// redux/slices/organiserEventSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],     
  loading: false,  
};

const attendeeEventSlice = createSlice({
  name: "attendeeEvent",
  initialState,
  reducers: {
    
    setAttendeeEvent(state, action) {
      state.events = action.payload;
    },

    // Set loading flag
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setAttendeeEvent,
  setLoading,
} = attendeeEventSlice.actions;

export default attendeeEventSlice.reducer;
