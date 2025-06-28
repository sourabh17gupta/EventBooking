import toast from "react-hot-toast";
import { apiConnector } from "../../apiconnector";
import { adminendpoints } from "../../apis";

const { GET_ALL_ATTENDEE_API } = adminendpoints;

export function GetAllAttendee() {
  return async () => {
    try {
      const response = await apiConnector("GET", GET_ALL_ATTENDEE_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching attendees:", error);

      toast.error("Failed to fetch attendees");

      return {
        success: false,
        message: error?.response?.data?.message || error.message || "Unknown error",
      };
    }
  };
}
