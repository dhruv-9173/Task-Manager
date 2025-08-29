import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink,Outlet } from "react-router-dom";
function Auth() {
  const activeLinkStyle = ({isActive})=>({
        display : isActive?"none":"block" 
  });
  return (
    <div className="container-fluid vh-100">
      <div className="row">
        
        <div className="col d-flex flex-column justify-content-center align-items-center bg-info text-white ">
            <h1>Task Manager</h1>
            <h3>Manage your daily tasks with ease...</h3>
             <nav>  
                
                <NavLink style={activeLinkStyle} to="/auth/login"> <button className="btn btn-light mt-5">Login</button></NavLink> 
                 {"  "}
                <NavLink style={activeLinkStyle} to="/auth/register"><button className="btn btn-light mt-5">Register</button></NavLink>
                
             </nav>
            
        </div>

        
        <div className="col-6 d-flex justify-content-center align-items-center bg-light">
            <Outlet/>
        </div>
      </div>
    </div>
  );
    

}

export default Auth;
