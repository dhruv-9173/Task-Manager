import { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Loader from "./Loader";
import { getTimeTable } from "../services/AppService";
function TimeTable() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    setLoading(true);
    getTimeTable().then((response) => {
      setdata(response);
    });
    setLoading(false);
  }, [data]);
  const priorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return {
          width: "15px",
          height: "15px",
          backgroundColor: "red",
          borderRadius: "50%",
        };
      case "Medium":
        return {
          width: "15px",
          height: "15px",
          backgroundColor: "orange",
          borderRadius: "50%",
        };
      case "Low":
        return {
          width: "15px",
          height: "15px",
          backgroundColor: "green",
          borderRadius: "50%",
        };
      default:
        return {};
    }
  };

  return (
    <>
      <div>
        <h1 className="text-primary d-flex align-items-center">
          <i className="bi bi-clipboard me-2"></i> <u>Today's Timetable</u>
        </h1>

        {loading ? (
          <Loader />
        ) : data && data.length > 0 ? (
          <div className="container border border-primary h-100 bg-white shadow-sm rounded p-3">
            <div className="row">
              {data.map((task) => (
                <div key={task.taskid} className="col-5 col-md-6 mb-3">
                  <div
                    className="card shadow-lg border-0 h-100 task-card"
                    style={{ transition: "transform 0.2s" }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          {task.status === "COMPLETED" && (
                            <i className="bi bi-check-circle-fill text-success fs-4"></i>
                          )}
                        </div>
                        <OverlayTrigger
                          placement="left"
                          overlay={
                            <Tooltip id="tooltip">{task.priority}</Tooltip>
                          }
                        >
                          <div style={priorityStyle(task.priority)}></div>
                        </OverlayTrigger>
                      </div>

                      <h5 className="card-title fw-bold">{task.taskname}</h5>

                      <p className="card-text mb-1">
                        <i className="bi bi-calendar-event me-2"></i>
                        <strong>Deadline:</strong> {task.deadline}
                      </p>
                      <p className="card-text mb-1">
                        <i className="bi bi-clock me-2"></i>
                        <strong>Time:</strong> {task.time}
                      </p>

                      <p className="card-text">
                        <strong>Status:</strong> {task.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-muted mt-4">
            {" "}
            Oops! No Time Table for today{" "}
          </div>
        )}
      </div>

      <style>
        {`
          .task-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.2);
          }
        `}
      </style>
    </>
  );
}

export default TimeTable;
