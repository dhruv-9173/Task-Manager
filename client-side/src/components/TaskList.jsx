import { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import Task from "./ShowTask";
import { handlegetList } from "../services/AppService";
import Loader from "./Loader";
function TaskList() {
  const { Show, card, enableTask } = Task();
  const [selectedtask, setselectedtask] = useState({
    taskid: 1,
    taskname: "Homework",
    priority: "High",
    Date: "22/12/2025",
    description: "science homework",
    Status: "PENDING",
  });
  const showItem = (task) => {
    setselectedtask(task);
    Show();
  };
  const List = () => {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
      setloading(true);
      handlegetList()
        .then((response) => {
          setData(response.data);
          setloading(false);
        })
        .catch((error) => {
          console.log(error);
          setloading(false);
        });
    }, []);

    const priorityStyle = (priority) => ({
      backgroundColor:
        priority === "High" ? "red" : priority === "Low" ? "yellow" : "orange",
    });

    return (
      <>
        <div className="container text-center mt-2">
          <h1 className="text-primary">Tasks</h1>
        </div>
        <hr />
        {loading ? (
          <Loader />
        ) : data && data.length > 0 ? (
          data.map((task) => (
            <div
              key={task.taskid}
              onClick={() => showItem(task)}
              className="card border-0 rounded-3 mt-4 shadow-sm hover-shadow"
              style={{ minHeight: "200px" }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {task.Status === "COMPLETED" && (
                      <i className="bi bi-check-circle-fill text-success fs-4"></i>
                    )}
                  </div>
                  <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip id="tooltip">{task.priority}</Tooltip>}
                  >
                    <div
                      className="rounded-circle"
                      style={{
                        width: "16px",
                        height: "16px",
                        ...priorityStyle(task.priority),
                      }}
                    />
                  </OverlayTrigger>
                </div>

                <h5 className="mt-3 fw-bold fst-monospace text-dark">
                  {task.taskname}
                </h5>

                <p className="text-secondary small mb-3">
                  {task.description && task.description.length <= 30
                    ? task.description
                    : task.description?.slice(0, 30) + "..."}
                </p>

                <div className="d-flex justify-content-between text-muted small">
                  <span>
                    <strong>Completion:</strong> {task.Date}
                  </span>
                  <span>
                    <strong>Status:</strong> {task.Status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-4">No Data Found.</div>
        )}
      </>
    );
  };

  return { card, selectedtask, List, enableTask };
}
export default TaskList;
