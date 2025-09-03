import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import DialogBox from "./DialogBox";

import {
  deleteTask as deleteTaskAPI,
  updateTask as updateTaskAPI,
} from "../services/AppService";
import { updateTask, deleteTask } from "../utils/taskSlice"; // Adjust path as needed

function Task({ task: initialTask, onClose }) {
  const dispatch = useDispatch();

  const [task, setTask] = useState(initialTask || {});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [dialogProps, setDialogProps] = useState({
    message: "",
    error: false,
    success: false,
  });
  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleDialogClose = () => setShowDialog(false);

  const handleUpdate = async (updatedTask) => {
    setIsLoading(true);
    try {
      const res = await updateTaskAPI(updatedTask);
      setTask(updatedTask);
      setIsEditing(false);
      setDialogProps({
        message: res.data.status || "Task updated successfully",
        error: false,
        success: true,
      });
      dispatch(updateTask(updatedTask));
    } catch (error) {
      setDialogProps({
        message: "Failed to update task",
        error: true,
        success: false,
      });
    } finally {
      setIsLoading(false);
      setShowDialog(true);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await deleteTaskAPI(task._id);
      dispatch(deleteTask(task._id));
      if (onClose) onClose();
      setDialogProps({
        message: res.data || "Task deleted successfully",
        error: false,
        success: true,
      });
    } catch (error) {
      setDialogProps({
        message: "Failed to delete task",
        error: true,
        success: false,
      });
    } finally {
      setIsLoading(false);
      setShowDialog(true);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleUpdate(task);
    } else {
      setIsEditing(true);
    }
  };

  const handleMarkComplete = () => {
    handleUpdate({ ...task, status: "COMPLETED" });
  };

  return createPortal(
    <div className="position-fixed start-0 end-0 top-0 bottom-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
      <div
        className="w-50 card shadow-sm border-0 rounded-3 mt-4 p-3 card-hover"
        style={{ minHeight: "240px", position: "relative" }}
      >
        <div className="d-flex justify-content-start align-items-center">
          <i onClick={onClose} className="bi bi-x-lg" role="button"></i>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold text-primary mb-0">{task.name}</h5>
          <i
            className={`bi ${
              isEditing ? "bi-save" : "bi-pencil-square"
            } fs-5 text-primary`}
            role="button"
            onClick={toggleEdit}
          ></i>
        </div>

        <Form.Group className="mt-2">
          <Form.Label className="fw-semibold">Task Name</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            name="name"
            value={task.name || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="description"
            value={task.description || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label className="fw-semibold">Deadline</Form.Label>
          <Form.Control
            type="date"
            name="deadline"
            value={task.deadline || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Form.Group>

        <div className="row mt-3">
          <div className="col">
            <Form.Label className="fw-semibold">Status</Form.Label>
            <Form.Select
              name="status"
              value={task.status || "PENDING"}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </Form.Select>
          </div>
          <div className="col">
            <Form.Label className="fw-semibold">Priority</Form.Label>
            <Form.Select
              name="priority"
              value={task.priority || "Low"}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Select>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          {!isEditing && (
            <>
              {task.status !== "COMPLETED" && (
                <Button
                  variant="outline-success"
                  className="d-flex align-items-center"
                  onClick={handleMarkComplete}
                >
                  <i className="bi bi-check2-circle me-1"></i> Mark Complete
                </Button>
              )}
              <Button
                variant="outline-danger"
                className="d-flex align-items-center"
                onClick={handleDelete}
              >
                <i className="bi bi-trash me-1"></i> Delete
              </Button>
            </>
          )}
        </div>

        {isLoading && (
          <div className="position-absolute top-50 start-50 translate-middle">
            <Loader />
          </div>
        )}

        {showDialog && (
          <DialogBox
            message={dialogProps.message}
            error={dialogProps.error}
            success={dialogProps.success}
            onClose={handleDialogClose}
          />
        )}
      </div>
    </div>,
    document.body
  );
}

export default Task;
