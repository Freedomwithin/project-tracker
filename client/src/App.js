import React, { useState, useEffect, useCallback } from "react";
import ProjectList from "./components/ProjectList.js";
import AddProjectForm from "./components/AddProjectForm.js";
import LoginForm from "./components/LoginForm.js"; // Import LoginForm
import RegisterForm from "./components/RegisterForm.js"; // Import RegisterForm
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Check for token on initial render
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setProjects([]); // Clear projects on logout (optional)
  };

  const handleRegister = () => {
    // Handle successful registration (e.g., show a message, redirect to login)
    setShowRegisterForm(false); // Switch back to login form after registration
  };

  const fetchProjects = useCallback(async () => {
    if (!token) return; // Don't fetch if not logged in

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5001/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        setError("Failed to fetch projects");
      }
    } catch (error) {
      setError("Error fetching projects");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch projects only if logged in
  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [token, fetchProjects]);

  const addProject = async (newProject) => {
    try {
      const response = await fetch("http://localhost:5001/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const data = await response.json();
        setProjects([...projects, data]);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to add project";
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error adding project:", error);
      setError("Error adding project");
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }
      );

      if (response.ok) {
        setProjects(projects.filter((project) => project.id !== projectId));
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to delete project";
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Error deleting project");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Project Tracker
      </Typography>

      {/* Conditional Rendering: Show login/register or main app */}
      {!token ? (
        <>
          {showRegisterForm ? (
            <RegisterForm onRegister={handleRegister} />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
          <Button
            onClick={() => setShowRegisterForm(!showRegisterForm)}
            sx={{ mt: 2 }}
          >
            {showRegisterForm
              ? "Already have an account? Login"
              : "Need an account? Register"}
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleLogout} sx={{ mb: 2 }}>
            Logout
          </Button>
          <AddProjectForm onAddProject={addProject} />

          {loading && <CircularProgress />}

          {error && <Alert severity="error">{error}</Alert>}

          <ProjectList
            projects={projects}
            onDeleteProject={deleteProject}
            token={token}
          />
        </>
      )}
    </Container>
  );
}

export default App;
