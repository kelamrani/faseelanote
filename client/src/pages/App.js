import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../components/layout/layout";
import IntroSection from "../components/sections/IntroSection";
import PrivateRoute from "../utils/PrivateRoute";
import NotFoundPage from "./404.js";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import NotesPage from "./NotesPage";
import { UserProvider } from "../context";

function App() {
  return (
  <UserProvider>
    <BrowserRouter>
            <Layout>
                <Switch>
                <Route exact path="/">
                    <IntroSection />
                </Route>

                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/login" component={LoginPage} />
                <PrivateRoute  exact path="/notes" component={NotesPage}/>
                <Route path="">
                    <NotFoundPage />
                </Route>
                </Switch>
            </Layout>
    </BrowserRouter>
  </UserProvider>
  );
}

export default App;
