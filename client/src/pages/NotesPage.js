import React from "react";
import {useRouteMatch, Switch, Route} from "react-router-dom";
import styled from "styled-components";
import SideNavBar from "../components/layout/SideNavBar/SideNavBar";
import NoteList from "../components/layout/NoteList/NoteList";
import Note from "../components/layout/Note/Note";
import PrivateRoute from "../utils/PrivateRoute";
import TextEditor from "../components/layout/TextEditor/TextEditor";

function NotesPage() {

    let { path, url } = useRouteMatch();


    return (
  <PrivateRoute>
    <Wrapper>
        <ContentWrapper>
        <SideNavBar/>
        <Switch>
            <Route path={`${path}/all-notes/:id`}>
                <Note />
                {/* <TextEditor /> */}
            </Route>
            <Route path={`${path}/all-notes`}>
              <NoteList title="All Notes" />
            </Route>

            <Route path={`${path}/trash/:id`}>
                <Note />
                {/* <TextEditor /> */}
            </Route>
            <Route path={`${path}/trash`}>
              <NoteList title="Trash" />
            </Route>
          </Switch>
        </ContentWrapper>
     </Wrapper>
  </PrivateRoute>
  )
}

export default NotesPage;

const ContentWrapper = styled.div`
  /* padding-top: 30px; */
  display: flex;
  align-items: center;
  justify-items: center;
  height: 100vh;
`
const Wrapper = styled.div``;
