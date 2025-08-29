import { createPortal } from "react-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useFormik } from "formik";
import Loader from "./Loader";
import useAddTask from "../hooks/useAddTask";
import DialogBox from "./DialogBox";
import { useEffect, useState } from "react";

export default function AddTask({ CloseAddTask }) {
  const { addtask, error, success, loading, reset } = useAddTask();
  const [showDialog, setShowDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      taskname: "",
      taskdescription: "",
      date: "",
      time: "",
      priority: "",
    },
    onSubmit: (values) => {
      addtask(values);
    },
  });

  const onClose = () => {
    reset();
    setShowDialog(false);
  };

  useEffect(() => {
    if (error || success) {
      setShowDialog(true);
    }
  }, [error, success]);

  return createPortal(
    <div className="position-fixed start-0 end-0 top-0 bottom-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
      {showDialog && (
        <DialogBox
          message={success || error}
          error={error}
          success={success}
          onClose={onClose}
        />
      )}

      <div className="container bg-light h-75 w-50 rounded-5 p-5 shadow">
        <div className="d-flex justify-content-end">
          <i
            className="bi bi-x-lg fs-4 text-danger"
            style={{ cursor: "pointer" }}
            onClick={CloseAddTask}
          ></i>
        </div>

        <h2 className="text-primary text-center mb-4">Add Task</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col mb-3">
              <label className="form-label" htmlFor="taskname">
                Task Name
              </label>
              <input
                className="form-control w-75"
                name="taskname"
                id="taskname"
                value={formik.values.taskname}
                type="text"
                placeholder="Task Name"
                onChange={formik.handleChange}
              />
            </div>

            <div className="col mb-3">
              <label className="form-label" htmlFor="date">
                Date of Completion
              </label>
              <input
                className="form-control w-75"
                name="date"
                id="date"
                value={formik.values.date}
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className="row">
            <div className="col mb-3">
              <label className="form-label" htmlFor="priority">
                Priority
              </label>
              <select
                className="form-select w-75"
                name="priority"
                id="priority"
                value={formik.values.priority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">-- Select --</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="col mb-3">
              <label className="form-label" htmlFor="time">
                Time
              </label>
              <input
                className="form-control w-75"
                name="time"
                id="time"
                value={formik.values.time}
                type="time"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="taskdescription">
              Task Description
            </label>
            <textarea
              className="form-control"
              name="taskdescription"
              id="taskdescription"
              value={formik.values.taskdescription}
              placeholder="Task Description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="text-center">
            {loading ? (
              <Loader />
            ) : (
              <button type="submit" className="btn btn-primary w-50">
                Add Task
              </button>
            )}
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
