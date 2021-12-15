import React, { useEffect, useState, useContext } from 'react';
import './NoteList.css';
import { useRouteMatch,NavLink } from "react-router-dom";
import { NotesContext } from './../../../context/NotesContext';
import { listFormatDate } from './../../../utils/helpers';
import { indexNotes, indexTrash, indexShared } from '../../../utils/api-client';
import { toast } from 'react-toastify';



const NoteList = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const notesContext = useContext(NotesContext);
    const { title } = props;
    const match = useRouteMatch();
    useEffect(() => {
        getNotes()
    }, [match.url])

    const getNotes = async () => {
        let response;
        setLoading(true);
        if (match.url === '/notes/all-notes') {
            response = await indexNotes();
        } else if (match.url === '/notes/trash') {
            response = await indexTrash();
        } else if (match.url === '/notes/shared-with-me') {
            response = await indexShared();
        } else {
            setLoading(false);
            return;
        }

        if (response.error) {
            setError(response.error);
            setLoading(false);
            toast.error(error);
            return false;
        }
        notesContext.notesDispatch({ type: 'getAllNotesSuccess', payload: response });
        setLoading(false);

    }

    return (
        <div className="note-list">
            <div className="note-list__header">
                <div className="note-list__header-title">
                    <h1>{title}</h1>
                </div>
                <div className="note-list__header-sub-head">
                    <div style={{ fontSize: '22px'}} >
                        {notesContext.notesState.length} Notes
                    </div>
                </div>
            </div>
            <div className="note-list__body">
                {
                    loading ? <div>Loading...</div> : (notesContext.notesState.length > 0 ? notesContext.notesState.map((note) => (
                        <NavLink key={note._id} className="note-card" to={
                            {
                                pathname: `${match.url}/${note._id}`,
                                note
                            }
                        }>
                            <div className="note-card__head">
                                <div className="note-card__title">
                                    {note.title}
                                </div>
                            </div>
                            <div className="note-card__date">
                                {listFormatDate(note.updated_at)}
                            </div>
                        </NavLink>
                    )
                    ) : <div style={{display:'flex', justifyContent:'center', padding: '10px'}}>you have 0 notes in this folder</div>)
                }
            </div>
        </div>
    )
}

export default NoteList;
