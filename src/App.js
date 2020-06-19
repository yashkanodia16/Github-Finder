import React, { Component, Fragment } from "react";
import Navbar from "./Components/layout/Navbar";
import User from "./Components/users/User";
import Users from "./Components/users/Users";
import Search from "./Components/users/Search";
import Alert from "./Components/layout/Alert";
import About from "./Components/pages/About";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
  };

  searchUser = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `http://api.github.com/search/users?q=${text}&${process.env.REACT_APP_GITHUB_TOKEN}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  clearUser = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `http://api.github.com/users/${username}?${process.env.REACT_APP_GITHUB_TOKEN}`
    );

    this.setState({ user: res.data, loading: false });
  };

  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${process.env.REACT_APP_GITHUB_TOKEN}`
    );

    this.setState({ repos: res.data, loading: false });
  };

  render() {
    const { users, user, loading, alert, repos } = this.state;
    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <Alert alertMsg={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUser={this.searchUser}
                      clearUser={this.clearUser}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <User users={users} loading={loading} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <Users
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  ></Users>
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
