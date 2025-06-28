
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/eventbookingweb";
//tested
const fetchNearbyEvents = async ({ queryKey }) => {
  const [, location] = queryKey;

  if (
    !location ||
    typeof location.latitude !== "number" ||
    typeof location.longitude !== "number"
  ) {
    throw new Error("Invalid or missing user location");
  }

  const  data  = await axios.post(`${BASE_URL}/event/nearby`, {
    userLat: location.latitude,
    userLng: location.longitude,
  });
  console.log(data.data.events)

  return data.data.events;  

};

export const useNearbyEvents = (location) => {
  return useQuery({
    queryKey: ["nearby-events", location],
    queryFn: fetchNearbyEvents,
    enabled: !!location?.latitude && !!location?.longitude,
    staleTime: 30 * 60 * 1000, // 30 minutes
    cacheTime: 30 * 60 * 1000,
  });
};
