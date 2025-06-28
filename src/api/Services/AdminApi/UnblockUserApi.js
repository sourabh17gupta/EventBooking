import toast from "react-hot-toast";
import { apiConnector } from "../../apiconnector";
import { adminendpoints } from "../../apis";



const {UNBLOCK_USER_API} = adminendpoints;

export function UnblockUser(id){
    return async()=>{
        try{

            const response = await apiConnector('POST',UNBLOCK_USER_API,{userId:id})
            if(!response.data.success){
               throw new Error(response.data.message);
            }

            toast.success("user unBlock successful");
            toast.success(response.data.message)
        }
        catch(error){
            toast.error("error while unblocking user")
            toast.error(error)
        }
    }
}