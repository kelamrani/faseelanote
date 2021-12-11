import React, { useEffect, useState, useContext } from 'react';
import './NoteList.css';
import {
    useRouteMatch,
    useHistory,
    NavLink
} from "react-router-dom";
import { NotesContext } from './../../../context/NotesContext';
import { listFormatDate } from './../../../utils/helpers';
import { indexNotes, indexTrash } from '../../../utils/api-client';

const NoteList = (props) => {
    const [error, setError] = useState(null)
    const notesContext = useContext(NotesContext);
    const { title } = props;
    const match = useRouteMatch();
    const history = useHistory();
    useEffect(() => {
        getNotes()
    }, [match.url])

    const getNotes = async () => {
        let endpoint = '';
        let response;
        if (match.url == '/notes/all-notes') {
            response = await indexNotes();
        } else if (match.url == '/notes/trash') {
            response = await indexTrash();
        } else {
            return;
        }

        if (response.error) {
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({ type: 'getAllNotesSuccess', payload: response });
        if (response.length > 0) {
            history.push({
                pathname: `${match.url}/${response[0]._id}`,
                note: response[0]
            })
        }
    }

    return (
        <div className="note-list">
            <div className="note-list__header">
                <div className="note-list__header-title">
                    <h1>{title}</h1>
                </div>
                <div className="note-list__header-sub-head">
                    <div className="note-count">
                        {notesContext.notesState.length} note
                    </div>
                </div>
            </div>
            <div className="note-list__body">
                {
                    notesContext.notesState.length > 0 ? notesContext.notesState.map((note) => (
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
                                <div className="note-card__desc">
                                    {note.body}
                                </div>
                            </div>
                            <div className="note-card__date">
                                {listFormatDate(note.updated_at)}
                            </div>
                        </NavLink>
                    )
                    ) : <div className="empty-state">No data found</div>
                }
            </div>
        </div>
    )
}

export default NoteList;
