import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createPortal } from "react-dom";

function Task() {

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({"taskid" :1,
        "taskname":"Homework",
        "priority":"High",
        "Date":"22/12/2025",
        "description" : "science homework",
        "Status":"PENDING"});
  const [enableTask, setEnableTask] = useState(false);
  const Show = ()=>{
    setEnableTask(true);
  }
  const Close = ()=>{
    setEnableTask(false);
  }
  
  const card = (selectedtask)=>{
      console.log(selectedtask);
      const toggleEdit = () => {
        if (isEditing && onUpdate) {
        onUpdate(editedTask); 
        }
        setIsEditing(!isEditing);
      };

  
      const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedTask({ ...editedTask, [name]: value });
      };
      return createPortal(
        <div className="position-fixed start-0 end-0 top-0 bottom-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
            <div
            className="w-50 card shadow-sm border-0 rounded-3 mt-4 p-3 card-hover"
            style={{ minHeight: "240px" }}
            >
            <div className="d-flex justify-content-start align-items-center"><i onClick={()=>Close()} className="bi bi-x-lg"></i></div>
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold text-primary mb-0">{editedTask.taskname}</h5>
                <i
                className={`bi ${isEditing ? "bi-save" : "bi-pencil-square"} fs-5 text-primary`}
                role="button"
                onClick={toggleEdit}
                ></i>
            </div>
            <Form.Group className="mt-2">
                <Form.Label className="fw-semibold">TaskName</Form.Label>
                <Form.Control
                as="textarea"
                rows={1}
                name="taskdescription"
                value={editedTask.taskname}
                onChange={handleChange}
                disabled={!isEditing}
                />
                </Form.Group>
            
            <Form.Group className="mt-2">
                <Form.Label className="fw-semibold">Description</Form.Label>
                <Form.Control
                as="textarea"
                rows={2}
                name="taskdescription"
                value={editedTask.taskdescription}
                onChange={handleChange}
                disabled={!isEditing}
                />
            </Form.Group>

            
            <Form.Group className="mt-2">
                <Form.Label className="fw-semibold">Deadline</Form.Label>
                <Form.Control
                type="date"
                name="deadline"
                value={editedTask.deadline}
                onChange={handleChange}
                disabled={!isEditing}
                />
            </Form.Group>

            
            <div className="row mt-3">
                <div className="col">
                <Form.Label className="fw-semibold">Status</Form.Label>
                <Form.Select
                    name="status"
                    value={editedTask.status}
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
                    value={editedTask.priority}
                    onChange={handleChange}
                    disabled={!isEditing}
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </Form.Select>
                </div>
            </div>

            
            <div className="d-flex justify-content-end gap-2 mt-3">
                {isEditing ? (
                <Button
                    variant="success"
                    className="d-flex align-items-center"
                    onClick={toggleEdit}
                >
                    <i className="bi bi-save me-1"></i> Save
                </Button>
                ) : (
                <>
                    {editedTask.status !== "COMPLETED" && (
                    <Button
                        variant="outline-success"
                        className="d-flex align-items-center"
                        onClick={() => onComplete && onComplete(task.taskid)}
                    >
                        <i className="bi bi-check2-circle me-1"></i> Mark Complete
                    </Button>
                    )}
                    <Button
                    variant="outline-danger"
                    className="d-flex align-items-center"
                    onClick={() => onDelete && onDelete(task.taskid)}
                    >
                    <i className="bi bi-trash me-1"></i> Delete
                    </Button>
                </>
                )}
            </div>
            </div>
        </div>
        ,document.body);
            }

    return {Show, card, enableTask};
}

export default Task;
