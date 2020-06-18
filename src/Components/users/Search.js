import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert(" Please Enter Something", "light");
    } else {
      this.props.searchUser(this.state.text);
      this.setState({ text: "" });
    }
  };

  static propTypes = {
    searchUser: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
  };

  render() {
    const { showClear, clearUser } = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search User"
            value={this.state.text}
            onChange={this.onChange}
          ></input>
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
            value="Search"
          ></input>
        </form>
        {showClear && (
          <button className="btn btn-light btn-block" onClick={clearUser}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
