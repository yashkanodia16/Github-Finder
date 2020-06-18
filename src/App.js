import React, { Component } from "react";
import Navbar from "./Components/layout/Navbar";
import "./App.css";
import User from "./Components/users/User";
import axios from "axios";
import Search from "./Components/users/Search";
import Alert from "./Components/layout/Alert";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
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

  render() {
    const { users, loading, alert } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container">
          <Alert alertMsg={alert} />
          <Search
            searchUser={this.searchUser}
            clearUser={this.clearUser}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <User users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
