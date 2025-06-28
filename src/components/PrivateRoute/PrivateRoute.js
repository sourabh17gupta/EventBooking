import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux";
import toast from "react-hot-toast"


function PrivateRoute({children}){
    const {user} = useSelector((state) => state.profile);
      if(user){
        return children
      }
      else{
        toast.error("Not loggedIn");
        return <Navigate to="/login"/>
      }
}

export default PrivateRoute