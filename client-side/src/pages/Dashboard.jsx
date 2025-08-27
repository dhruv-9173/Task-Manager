import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
function Dashboard()
{
    
    return (
        <>
            <div className="container-fluid">
  <div className="row">
    
    <div className="col-4 d-flex justify-content-center align-items-center border" style={{ height: "100vh" }}>
      
    </div>

    
    <div className="col-8 bg-light d-flex flex-column" style={{ height: "100vh" }}>
      <div className="row vh-25 d-flex flex-row justify-content-around align-items-center">
    <div className="col-auto">
    Date
    </div>
    <div className="col-auto">
    Time
    </div>
    <div className="col-auto">
    <button className="btn btn-outline-primary fw-bold d-inline-flex align-items-center">
      <i className="bi bi-plus-lg me-1"></i> Add
    </button>
    </div>
    </div>
      <hr />
      <div className="row">
            
      </div>
    </div>

  </div>
</div>
        </>
    );
}
export default Dashboard;