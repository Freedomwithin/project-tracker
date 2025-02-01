import React from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function Task({ task, projectId, onUpdateTask, onDeleteTask, token }) {
  const handleCompleteChange = async (event) => {
    const updatedTask = { ...task, completed: event.target.checked };
    onUpdateTask(task.id, updatedTask);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <div className="task">
      <Checkbox
        checked={task.completed || false}
        onChange={handleCompleteChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <span>{task.description}</span>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default Task;
