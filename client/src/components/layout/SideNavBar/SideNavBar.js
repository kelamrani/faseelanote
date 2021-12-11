import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faSearch, faPlus, faStar, faStickyNote, faTrash, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import './Sidenavbar.css';
import { NavLink, useHistory } from 'react-router-dom'
import { NotesContext } from '../../../context/NotesContext';
import { UserContext } from '../../../context/UserContext';
import { createNote } from '../../../utils/api-client';

const SideNavBar = () => {
    const [state, setState] = useContext(UserContext);

    const notesContext = useContext(NotesContext);
    const history = useHistory();
    const [error, setError] = useState(null);

    const handleCreateNote = async () => {
        const response = await createNote();
        // console.log(response);
        if (response.error) {
            setError(response.error);
            return false;
        }
        if(response._id){
            notesContext.notesDispatch({ type: 'createNoteSuccess', payload: response })
            history.push({
                pathname: `/notes/all-notes/${response._id}`,
                note: response
            })
        }

    }


    const logout = () => {
        window.localStorage.removeItem('auth');
        history.go("/");

    }


    return (
        <div className="sidenavbar">
            <div className="sidenavbar-top">
                <div className="sidenavbar-top__profile">
                    <div className="profile-icon">
                        A
                    </div>
                    <div className="profile-title">
                        {state.user.name}
                        <FontAwesomeIcon className="icon" icon={faAngleDown} />
                    </div>
                </div>
                <div className="sidenavbar-top__search">
                    <div className="search-block">
                        <FontAwesomeIcon className="icon" icon={faSearch} />
                        <input placeholder="Search" />
                    </div>
                </div>
                <div className="sidenavbar-top__create-note">
                    <div className="create-note-btn" onClick={handleCreateNote}>
                        <FontAwesomeIcon className="icon" icon={faPlus} />
                        <div className="title">
                            New Note
                        </div>
                    </div>
                </div>
                <div className="sidenavbar-top__menu-item">
                    <ul>
                        <li>
                            <NavLink to="/dummy-1">
                                <FontAwesomeIcon className="icon" icon={faStar} /> Dummy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/notes/all-notes">
                                <FontAwesomeIcon className="icon" icon={faStickyNote} /> All Notes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dummy-2">
                                <FontAwesomeIcon className="icon" icon={faStar} /> Dummy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dummy-3">
                                <FontAwesomeIcon className="icon" icon={faStar} /> Dummy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dummy-4">
                                <FontAwesomeIcon className="icon" icon={faStar} /> Dummy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/notes/trash">
                                <FontAwesomeIcon className="icon" icon={faTrash} /> Trash
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dummy-5">
                                <FontAwesomeIcon className="icon" icon={faStar} /> Dummy
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sidenavbar-bottom">
                <div className="sidenavbar-bottom__need-help" onClick={logout}>
                    <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                    logout
                </div>
            </div>
        </div>
    )
}

export default SideNavBar;
