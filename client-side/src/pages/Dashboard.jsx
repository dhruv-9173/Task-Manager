import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import AddTask from "../components/addTask";
import TaskList from "../components/TaskList";
import TimeTable from "../components/TimeTable";
import Header from "../components/header";

import useTime from "../hooks/useTime";
import useAuthContext from "../hooks/useAuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  const [enableAddTask, setEnableAddTask] = useState(false);
  const showAddTask = () => setEnableAddTask(true);
  const closeAddTask = () => setEnableAddTask(false);

  const { date, time } = useTime();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-4 d-flex flex-column"
            style={{ height: "100vh", overflowY: "auto" }}
          >
            <TaskList />
          </div>

          <div
            className="col-8 bg-light d-flex flex-column"
            style={{ height: "100vh" }}
          >
            <div className="row d-flex justify-content-around align-items-center mt-3">
              <div className="col-auto">
                <h3 className="text-secondary">{date}</h3>
              </div>
              <div className="col-auto">
                <h3 className="text-secondary border border-3 p-2 px-3 border-secondary rounded">
                  {time}
                </h3>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-outline-primary fw-bold d-inline-flex align-items-center"
                  onClick={showAddTask}
                >
                  <i className="bi bi-plus-lg me-1"></i> Add
                </button>
              </div>
            </div>
            <hr className="mt-3 mb-2" />
            <div className="row flex-grow-1 overflow-auto">
              <TimeTable />
            </div>
          </div>
        </div>
      </div>
      ={enableAddTask && <AddTask CloseAddTask={closeAddTask} />}
    </>
  );
}

export default Dashboard;
