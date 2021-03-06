import React, {useReducer} from 'react'
export const NotesContext = React.createContext();

const initialState = [];

const NoteReducer = (state, action) => {
    let draftNotes = [...state];
    switch (action.type) {
        case 'getAllNotesSuccess':
            return action.payload;
        case 'createNoteSuccess':
            draftNotes.unshift(action.payload);
            return draftNotes;
        case 'archiveNoteSuccess':
            return draftNotes.filter((item) => item._id !== action.id);
        case 'deleteNoteSuccess':
            return draftNotes.filter((item) => item._id !== action.id);
        default:
            return state;
    }
}

export const NotesProvider = ({children})=>{

    const [notes, notesDispatch] = useReducer(NoteReducer, initialState);

   return(
   <NotesContext.Provider value={{notesState: notes, notesDispatch}}>
        {children}
   </NotesContext.Provider>
   );
};
