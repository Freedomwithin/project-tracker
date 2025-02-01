import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddNoteForm({ onAddNote }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    onAddNote({ content });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        placeholder="Add a note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="outlined"
        size="small"
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained">
        Add Note
      </Button>
    </form>
  );
}

export default AddNoteForm;
