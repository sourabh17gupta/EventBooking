import toast from 'react-hot-toast';
import { eventsendpoints } from '../../apis';
import { apiConnector } from '../../apiconnector';

const { GET_EVENT_BY_ID } = eventsendpoints;

async function GetEventByIdAPI(id) {
  try {
    const value = await apiConnector("POST", GET_EVENT_BY_ID, { eventid:id });

    if (!value || !value.data || !value.data.response) {
      throw new Error("Invalid response structure");
    }

    toast.success("Event fetched successfully");
    return value.data.response;

  } catch (error) {
    console.error("Error while fetching event by ID:", error);
    toast.error('Fetching event data by ID failed');
    return null;
  }
}

export default GetEventByIdAPI;
