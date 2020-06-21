import React from "react";
import Navbar from "./Components/layout/Navbar";
import Users from "./Components/users/Users";
import Alert from "./Components/layout/Alert";
import About from "./Components/pages/About";
import GithubState from "./Context/github/GithubState";
import AlertState from "./Context/alert/AlertState";
import Home from "./Components/pages/Home";
import NotFound from "./Components/pages/NotFound";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div>
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={Users} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
