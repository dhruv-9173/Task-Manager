import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import AddTask from "../components/addTask";
import TaskList from "../components/TaskList";
import TimeTable from "../components/TimeTable";
import useTime from "../hooks/useTime";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import useAddTask from "../hooks/useAddTask";
function Dashboard() {
  const navigate = useNavigate();
  const { card, selectedtask, List, enableTask } = TaskList();
  const [enableAddTask, setEnableAddTask] = useState(false);
  const ShowAddTask = () => {
    setEnableAddTask(true);
  };
  const CloseAddTask = () => {
    setEnableAddTask(false);
  };
  const { date, time } = useTime();
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          {enableAddTask && <AddTask CloseAddTask={CloseAddTask} />}
          {enableTask && card(selectedtask)}
          <div
            className="col-4 d-flex flex-column overflow-y-scroll"
            style={{ height: "100vh" }}
          >
            {List()}
          </div>

          <div
            className="col-8 bg-light d-flex flex-column"
            style={{ height: "100vh" }}
          >
            <div className="row vh-25 d-flex flex-row justify-content-around align-items-center mt-2">
              <div className="col-auto">
                <h3 className="text-secondary">{date}</h3>
              </div>
              <div className="col-auto">
                <h3 className="text-secondary border border-3 p-1 border-secondary rounded">
                  {time}
                </h3>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-outline-primary fw-bold d-inline-flex align-items-center"
                  onClick={ShowAddTask}
                >
                  <i className="bi bi-plus-lg me-1"></i> Add
                </button>
              </div>
            </div>
            <hr />
            <div className="row">
              <TimeTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
