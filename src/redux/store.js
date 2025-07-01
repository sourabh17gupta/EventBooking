// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import OrganiserEventsReducers from './slices/OrganiserEvent'
import createEventReducer from './slices/CreateEventSlice'
import EventReducer from './slices/AllEvent'
import AttendeeEventReducer from './slices/AttendeeEvent';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile : profileReducer,
    organiserEvent : OrganiserEventsReducers,
    createEvent : createEventReducer,
    event:EventReducer,
    attendeeEvent:AttendeeEventReducer,
  },
});
