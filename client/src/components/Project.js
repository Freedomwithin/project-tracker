import React, { useState, useEffect } from "react";
import Task from "./Task.js";
import Note from "./Note.js";
import AddTaskForm from "./AddTaskForm.js";
import AddNoteForm from "./AddNoteForm.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function Project({ project, onDelete, token }) {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setTasks(project.tasks || []);
    setNotes(project.notes || []);
  }, [project]);

  const addTask = async (newTask) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/projects/${project.id}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newTask),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTasks([...tasks, data]);
      } else {
        console.error("Failed to add task");
        // Handle error cases as needed
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const addNote = async (newNote) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/projects/${project.id}/notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newNote),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setNotes([...notes, data]);
      } else {
        console.error("Failed to add note");
        // Handle error cases as needed
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/projects/${project.id}/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? data : task
        );
        setTasks(updatedTasks);
      } else {
        console.error("Failed to update task");
        // Handle error cases as needed
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/projects/${project.id}/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== taskId));
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to delete task";
        console.error(errorMessage);
        // You might want to display an error message to the user here
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      // Handle the error appropriately
    }
  };

  const handleDelete = async () => {
    onDelete(project.id);
  };

  return (
    <div className="project">
      <Typography variant="h6" gutterBottom display="flex" alignItems="center">
        {project.name}
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
          sx={{ ml: "auto" }}
        >
          <DeleteIcon />
        </IconButton>
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Tasks
      </Typography>
      <AddTaskForm onAddTask={addTask} token={token} />
      <List>
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <ListItem>
              <Task
                task={task}
                projectId={project.id}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                token={token}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Notes
      </Typography>
      <AddNoteForm onAddNote={addNote} token={token} />
      <List>
        {notes.map((note) => (
          <ListItem key={note.id}>
            <Note note={note} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Project;
