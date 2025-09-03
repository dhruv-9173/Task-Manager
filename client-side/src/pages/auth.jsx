import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Outlet } from "react-router-dom";

function Auth() {
  const activeLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: isActive ? "underline" : "none",
  });

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col d-flex flex-column justify-content-center align-items-center bg-info text-white p-4">
          <h1 className="mb-2">TODO LIST</h1>
          <h5 className="mb-4 text-center">
            Manage your daily tasks with ease...
          </h5>

          <nav className="d-flex gap-3">
            <NavLink to="/auth/login" style={activeLinkStyle}>
              <button className="btn btn-light">Login</button>
            </NavLink>

            <NavLink to="/auth/register" style={activeLinkStyle}>
              <button className="btn btn-light">Register</button>
            </NavLink>
          </nav>
        </div>

        <div className="col-6 d-flex justify-content-center align-items-center bg-light">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Auth;
