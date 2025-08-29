import { useState } from "react";
import {handleLogin} from "../services/AuthService";
import useAuthContext from "./useAuthContext";
import {useNavigate} from "react-router-dom";
const useLogin = ()=>{
    const [errors, setError] = useState("");
    const [loading, setLoading] = useState("");
    const {Signin} = useAuthContext();
    const navigate = useNavigate();
    const login = (request)=>{
           
            setLoading(true);
            try{
                handleLogin(request)
                .then((response)=>{
                    localStorage.setItem("user",response.data);
                    Signin(response.data);
                    navigate("/");
                })
                .catch((error)=>{
                    setError(error);
                })
            }
            catch(error)
            {
                setError("Server Error");
            }
    }
    
    return {errors, loading, login};

}
export default useLogin;