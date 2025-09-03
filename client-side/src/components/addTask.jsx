import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useFormik } from "formik";
import "bootstrap-icons/font/bootstrap-icons.css";

import Loader from "./Loader";
import DialogBox from "./DialogBox";
import useAddTask from "../hooks/useAddTask";

export default function AddTask({ CloseAddTask }) {
  const { addtask, error, success, loading, reset } = useAddTask();
  const [showDialog, setShowDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      deadline: "",
      priority: "",
    },
    onSubmit: async (values) => {
      await addtask(values);
      // Close the form only if successful
      if (!error) {
        CloseAddTask();
      }
    },
  });

  useEffect(() => {
    if (error || success) {
      setShowDialog(true);
    }
  }, [error, success]);

  const handleDialogClose = () => {
    setShowDialog(false);
    reset();
  };

  return createPortal(
    <div className="position-fixed start-0 end-0 top-0 bottom-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
      {/* 🔹 Dialog Box */}
      {showDialog && (
        <DialogBox
          message={error || success}
          error={!!error}
          success={!!success}
          onClose={handleDialogClose}
        />
      )}

      {/* 🔹 Modal Content */}
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
              <label htmlFor="name" className="form-label">
                Task Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control w-100"
                placeholder="Enter task name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>

            <div className="col mb-3">
              <label htmlFor="deadline" className="form-label">
                Deadline
              </label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                className="form-control w-100"
                value={formik.values.deadline}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col mb-3">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="form-select w-100"
                value={formik.values.priority}
                onChange={formik.handleChange}
              >
                <option value="">-- Select --</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Task Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="form-control"
              placeholder="Enter description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>

          <div className="text-center mt-4">
            {loading ? (
              <Loader />
            ) : (
              <button type="submit" className="btn btn-primary px-4">
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
