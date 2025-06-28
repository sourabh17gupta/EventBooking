import toast from "react-hot-toast";
import { apiConnector } from "../../apiconnector";
import { adminendpoints } from "../../apis";

const { GET_ALL_ORGANISER_API } = adminendpoints;

export function GetAllOrganiser() {
  return async () => {
    try {
      const response = await apiConnector("GET", GET_ALL_ORGANISER_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching organisers:", error);

      toast.error("Failed to fetch organisers");

      return {
        success: false,
        message: error?.response?.data?.message || error.message || "Unknown error",
      };
    }
  };
}
