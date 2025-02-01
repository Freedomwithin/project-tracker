import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddProjectForm({ onAddProject }) {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    onAddProject({ name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} sx={{ mt: 2, mb: 2 }}>
      <TextField
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mr: 1 }}
      />
      <Button type="submit" variant="contained">
        Add Project
      </Button>
    </form>
  );
}

export default AddProjectForm;
