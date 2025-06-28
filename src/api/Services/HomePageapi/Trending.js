
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL + "/eventbookingweb";
//tested
export const useEvents = () => {
  return useQuery({
    queryKey: ['events-topselling'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/event/topselling`);
      return res.data.response;
    },
    staleTime:300000,//it will automatically count on background that is the data is staletime over then if i go to the page or component it will refetch
  });
};
