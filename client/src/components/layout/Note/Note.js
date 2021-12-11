import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faBackward, faTrash } from '@fortawesome/free-solid-svg-icons'
import './Note.css';
import {
    useLocation,
    useParams,
    useHistory
} from "react-router-dom";

import { NotesContext } from './../../../context/NotesContext';
import { noteFormatDate } from './../../../utils/helpers';
import { deleteNote, updateNote } from '../../../utils/api-client';

const Note = () => {
    const history = useHistory();
    const location = useLocation();
    const params = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const notesContext = useContext(NotesContext);
    const [updatedAt, setUpdatedAt] = useState('');
    const [isArchive, setIsArchive] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location.note) {
            setTitle(location.note.title)
            setBody(location.note.body)
            setUpdatedAt(location.note.updated_at)
            setIsArchive(location.note.archive)
        }
    }, [location.note])

    useEffect(() => {
        if (notesContext.notesState.length > 0) {
            const [selectednote] = notesContext.notesState.filter((e) => e._id === params.id);
            if (selectednote) {
                setTitle(selectednote.title)
                setBody(selectednote.body)
                setUpdatedAt(selectednote.updated_at)
                setIsArchive(selectednote.archive)
            }
        }
    }, [notesContext.notesState])

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }

    const handleUpdateNote = async () => {
        let query = {};
        query['title'] = title;
        query['body'] = body;


        const response = await updateNote (params.id, query);
        if (response?.error) {
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({ type: 'updateNoteSuccess', payload: response, id: params.id });
        resetState();
        history.push(`/notes/all-notes`)

    }

    const handleArchiveNote = async () => {
        let query = {};
        query['title']=title;
        query['body']=body;
        query['archive']=1;
        const response = await updateNote (params.id, query);
        if (response?.error) {
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({ type: 'archiveNoteSuccess', id: params.id });
        resetState();
        history.push(`/notes/all-notes`)
    }

    const handleUnArchiveNote = async () => {
        let query = {};
        query['title']=title;
        query['body']=body;
        query['archive']=0;
        const response = await updateNote (params.id, query);
        if (response?.error) {
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({ type: 'archiveNoteSuccess', id: params.id })
        resetState();
        history.push(`/notes/trash`)
    }

    const handleDeleteNote = async () => {
        const response = await deleteNote(params.id);
        if (response?.error) {
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({ type: 'deleteNoteSuccess', id: params.id })
        resetState();
        history.push('/notes/trash');
    }

    const resetState = () => {
        setTitle('');
        setBody('');
        setUpdatedAt('');
        setIsArchive(0);
        setError(null);
    }

    return (
        <div className="note">
            <div className="note__header">
                <div className="note__header-date">
                    Last edited on {noteFormatDate(updatedAt)}
                </div>
                <div className="note__header-action-btn">
                    {!isArchive ?
                    (
                        <div className="action-btn" onClick={handleArchiveNote}>
                            <FontAwesomeIcon icon={faArchive} />
                        </div>
                    ) :
                    (
                        <>
                            <div className="action-btn">
                                <FontAwesomeIcon icon={faBackward} onClick={handleUnArchiveNote} />
                            </div>
                            <div className="action-btn" onClick={handleDeleteNote}>
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="note__body">
                <div className="note__body-head">
                    <input value={title} placeholder="Title" onChange={handleTitleChange} onBlur={() => handleUpdateNote('')} />
                </div>
                <div className="note__body-content">
                    <textarea value={body} placeholder="Start writing" onChange={handleBodyChange} onBlur={() => handleUpdateNote('')} />
                </div>
            </div>
        </div>
    )
}

export default Note;
