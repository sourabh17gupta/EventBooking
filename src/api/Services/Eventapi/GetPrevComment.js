
import {apiConnector} from "../../apiconnector";
import { commentendpoints } from "../../apis";


const {COMMENT_PREV} = commentendpoints
const GetPrevComment = async (eventId) => {
  try {
    const response = await apiConnector("POST",COMMENT_PREV, { eventId });
    return response.data.response || [];
  } catch (error) {
    console.error("Failed to fetch comments", error);
    return [];
  }
};

export default GetPrevComment;
