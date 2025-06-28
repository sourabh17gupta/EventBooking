import { organiserendpoints } from '../../apis'
import { setLoading } from '../../../redux/slices/CreateEventSlice'
import { addOrganiserEvent } from '../../../redux/slices/OrganiserEvent'
import { apiConnector } from '../../apiconnector'
import toast from 'react-hot-toast'

const { ORGANISER_CREATE_EVENT } = organiserendpoints

function CreateEventApi(createEventData) {
  return async (dispatch) => {
    const {
      name,
      date,
      venue,
      price,
      description,
      categoryName,
      image, // this should be a File object
    } = createEventData;

    const toastId = toast.loading('Creating event...');
    dispatch(setLoading(true));

    try {
      // Create FormData for file + fields
      const formData = new FormData();
      formData.append('name', name);
      formData.append('date', date);
      formData.append('venue', venue);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('categoryName', categoryName);
      formData.append('image', image); // this is the actual File object

      const response = await apiConnector('POST', ORGANISER_CREATE_EVENT, formData, {
        'Content-Type': 'multipart/form-data',
      });

      console.log('Event created API RESPONSE:', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Event created successfully!');
      console.log(response.data.response);
      dispatch(addOrganiserEvent(response.data.response)); // send back the real event data mtlb redux update not api call next time coming its api call
    } catch (error) {
      console.error('Event creation API ERROR:', error);
      toast.error(error?.response?.data?.message ||'Event creation failed.');
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


export default CreateEventApi
