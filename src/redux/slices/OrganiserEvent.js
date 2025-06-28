// redux/slices/organiserEventSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],      // stores all events of organiser
  loading: false,  // loading status for any async logic if needed
};

const organiserEventSlice = createSlice({
  name: "organiserEvent",
  initialState,
  reducers: {
    // Set all organiser events (e.g. after fetching from backend)
    setOrganiserEvents(state, action) {
      state.events = action.payload;
    },
    
    // Add a new event (e.g. after successfully creating an event)
    addOrganiserEvent(state, action) {
      state.events.push(action.payload);
    },

    // Set loading flag
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setOrganiserEvents,
  addOrganiserEvent,
  setLoading,
} = organiserEventSlice.actions;

export default organiserEventSlice.reducer;
