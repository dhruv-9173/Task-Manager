import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Loader from "./Loader";
import Task from "./ShowTask";
import { fetchTasks } from "../utils/taskSlice";

function TaskList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.tasks);
  const [selectedtask, setSelectedtask] = useState({});
  const [enabletask, setEnableTask] = useState(false);
  const Show = (task) => {
    setSelectedtask(task);
    setEnableTask(true);
  };
  const onClose = () => {
    setEnableTask(false);
  };
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const priorityStyle = (priority) => ({
    backgroundColor:
      priority === "High" ? "red" : priority === "Low" ? "yellow" : "orange",
  });

  return (
    <>
      {enabletask && <Task task={selectedtask} onClose={onClose} />}
      <div className="container text-center mt-2">
        <h1 className="text-primary">Tasks</h1>
      </div>
      <hr />
      <div className="overflow-y-scroll" style={{ height: "80vh" }}>
        {loading ? (
          <Loader />
        ) : items && items.length > 0 ? (
          items.map((task) => (
            <div
              key={task._id}
              className="card border-0 rounded-3 mt-4 shadow-lg hover-shadow"
              style={{ minHeight: "200px" }}
              onClick={() => {
                Show(task);
              }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {task.status === "COMPLETED" && (
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
                  {task.name}
                </h5>

                <p className="text-secondary small mb-3">
                  {task.description && task.description.length <= 30
                    ? task.description
                    : task.description?.slice(0, 30) + "..."}
                </p>

                <div className="d-flex justify-content-between text-muted small">
                  <span>
                    <strong>Deadline:</strong> {task.deadline}
                  </span>
                  <span>
                    <strong>Status:</strong> {task.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-4">No Data Found.</div>
        )}
      </div>
    </>
  );
}

export default TaskList;
