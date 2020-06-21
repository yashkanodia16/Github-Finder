import React, { Fragment } from "react";
import Search from "../users/Search";
import User from "../users/User";

export const Home = () => (
  <Fragment>
    <Search />
    <User />
  </Fragment>
);

export default Home;
