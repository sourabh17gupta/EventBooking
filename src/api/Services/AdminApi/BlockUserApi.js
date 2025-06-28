import toast from "react-hot-toast";
import { apiConnector } from "../../apiconnector";
import { adminendpoints } from "../../apis";



const {BLOCK_USER_API} = adminendpoints;

export function BlockUser(id){
    return async()=>{
        try{

            const response = await apiConnector('POST',BLOCK_USER_API,{userId:id})
            if(!response.data.success){
               throw new Error(response.data.message);
            }

            toast.success("user Block successful");
            toast.success(response.data.message);
        }
        catch(error){
            toast.error("error while blocking user")
            toast.error(error)
        }
    }
}