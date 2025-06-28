import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL + "/eventbookingweb";

// Function to fetch all categories
const fetchAllCategories = async () => {
  const res = await axios.get(`${BASE_URL}/category`);
  return res.data.response;
};

// Hook to fetch all categories
function GetAllCategories(){
  return useQuery({
    queryKey: ['all-categories'],
    queryFn: fetchAllCategories,
    staleTime: 30 * 1000,
  });
}

export default GetAllCategories
