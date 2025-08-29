import { useState } from "react";
import { handleRegister } from "../services/AuthService";

const useRegister = ()=>{
    const [errors, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const register = (request)=>{
        setLoading(true);
        try{
            handleRegister(request)
            .then((response)=>{
                setSuccess(response.data);
            })
            .catch((error)=>{
                setError(error);
            })
        }
        catch(error)
        {
            console.log("Server Error");
        }
        setLoading(false);
    }
    return {errors, loading, success, register};
}
export default useRegister;