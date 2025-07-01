import { toast } from 'react-hot-toast';
import { setEvent } from '../../../redux/slices/AllEvent';
import { apiConnector } from '../../apiconnector';
import {eventsendpoints} from '../../apis';

const { GET_ALL_EVENT } = eventsendpoints;

export const GetAllEvent = () => async (dispatch) => {
  try {
    const response = await apiConnector('GET', GET_ALL_EVENT);

    const data = response.data;

    if (!data?.response) {
      throw new Error(data?.message || 'No event data found.');
    }

    dispatch(setEvent(data.response)); 
  } catch (err) {
    console.error('All Event data fetch API ERROR:', err);
    toast.error(err?.response?.data?.message || 'Event data fetching failed.');
  }
};
