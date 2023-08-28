import NoteContext from "../context/noteContext";
import { useState } from 'react';

const NoteProvider = ({ children }) => {

  const [notes, setNotes] = useState([]);
  return (
    <NoteContext.Provider value={[ notes, setNotes ]}>
      {children}
    </NoteContext.Provider >
  )
}


export default NoteProvider;