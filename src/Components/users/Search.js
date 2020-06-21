import React, { useState, useContext } from "react";
import GithubContext from "../../Context/github/githubContext";
import AlertContext from "../../Context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      alertContext.setAlert(" Please Enter Something", "light");
    } else {
      githubContext.searchUser(text);
      setText();
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search User"
          value={text}
          onChange={onChange}
        ></input>
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
          value="Search"
        ></input>
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUser}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
