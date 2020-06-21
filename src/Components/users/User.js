import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../Context/github/githubContext";

function User() {
  const githubContext = useContext(GithubContext);

  const { loading, users } = githubContext;
  if (loading) {
    return <Spinner />;
  } else
    return (
      <div style={userStyle}>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
}

const userStyle = {
  display: "grid",
  gridGap: "1rem",
  gridTemplateColumns: "repeat(3, 1fr)",
};

export default User;
