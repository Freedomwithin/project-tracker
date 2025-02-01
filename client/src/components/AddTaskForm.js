import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddTaskForm({ onAddTask }) {
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    onAddTask({ description });
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mr: 1 }}
      />
      <Button type="submit" variant="contained">
        Add Task
      </Button>
    </form>
  );
}

export default AddTaskForm;
