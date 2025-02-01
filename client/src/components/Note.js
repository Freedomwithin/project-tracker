import React from 'react';

function Note({ note }) {
  return (
    <div className="note">
      <p>{note.content}</p>
    </div>
  );
}

export default Note;
