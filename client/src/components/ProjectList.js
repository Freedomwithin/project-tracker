import React from "react";
import Project from "./Project.js";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function ProjectList({ projects, onDeleteProject, token }) {
  if (projects.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        No projects yet. Add one above!
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Projects
      </Typography>
      {projects.map((project) => (
        <Card key={project.id} sx={{ mb: 2 }}>
          <CardContent>
            <Project project={project} onDelete={onDeleteProject} token={token}/>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ProjectList;
