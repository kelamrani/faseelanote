import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faBackward, faTrash } from '@fortawesome/free-solid-svg-icons'
import './Note.css';
import { useParams,useHistory } from "react-router-dom";

import { NotesContext } from './../../../context/NotesContext';
import { UserContext } from '../../../context/UserContext';
import { noteFormatDate } from './../../../utils/helpers';
import { deleteNote, updateNote } from '../../../utils/api-client';
import TextEditor from '../TextEditor/TextEditor';
import Share from '../DropDowns/Share';
import { toast } from 'react-toastify';


const Note = () => {
    const history = useHistory();
    const [state] = useContext(UserContext);
    const params = useParams();
    const [title, setTitle] = useState('');
    const notesContext = useContext(NotesContext);
    const [updatedAt, setUpdatedAt] = useState('');
    const [isArchive, setIsArchive] = useState(0);
    const [isShared, setIsShared] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {
        if (notesContext.notesState.length > 0) {
            const [selectednote] = notesContext.notesState.filter((e) => e._id === params.id);
            if (selectednote) {
                setTitle(selectednote.title);
                setUpdatedAt(selectednote.updated_at);
                setIsArchive(selectednote.archive);
                setIsShared( selectednote.sharedwith.length > 0 && selectednote.author !== state.user._id );
            }
        }
    }, [notesContext.notesState])

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }



    const handleUpdateTitle = async () => {
        let query = {};
        query['title'] = title;


        const response = await updateNote (params.id, query);
        if (response?.error) {
            setError(response.error);
            toast.error(error);
            return false;
        }

    }

    const handleArchiveNote = async () => {
        let query = {};
        query['title']=title;
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
                    {isShared ? <></> : (!isArchive ?
                    (
                        <>
                        <div className="action-btn">
                            <Share noteId={params.id}/>
                        </div>
                        <div className="action-btn" onClick={handleArchiveNote}>
                            <FontAwesomeIcon icon={faArchive} />
                        </div>
                        </>
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
                    ))}
                </div>
            </div>
            <div className="note__body">
                <div className="note__body-head">
                    <input value={title} placeholder="Title" onChange={handleTitleChange} onBlur={() => handleUpdateTitle('')} />
                </div>
                <div className="note__body-content">
                    <TextEditor noteId={params.id}/>
                </div>
            </div>
        </div>
    )
}

export default Note;
