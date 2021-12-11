import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../components/layout/layout";
import IntroSection from "../components/sections/IntroSection";
import PrivateRoute from "../utils/PrivateRoute";
import NotFoundPage from "./404.js";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import NotesPage from "./NotesPage";
import { UserProvider } from "../context/UserContext";
import { NotesProvider } from "../context/NotesContext";

function App() {
  return (
  <UserProvider>
      <NotesProvider>
    <Router>
            <Layout>
                <Switch>
                <Route exact path="/">
                    <IntroSection />
                </Route>

                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route path="/notes" >
                    <NotesPage/>
                </Route>
                <Route path="">
                    <NotFoundPage />
                </Route>
                </Switch>
            </Layout>
    </Router>
    </NotesProvider>
  </UserProvider>
  );
}

export default App;
