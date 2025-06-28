import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL + "/eventbookingweb";

const fetchEventsByCategory = async (category) => {
  console.log(category);
  const res = await axios.post(`${BASE_URL}/event/category`, { category });
  return res.data.response;
};

export const useEventsByCategory = (category) => {
  return useQuery({
    queryKey: ['event-category', category],
    queryFn: () => fetchEventsByCategory(category),
    enabled: !!category, // only run when category is present
    staleTime: 30 * 1000,
  });
};
