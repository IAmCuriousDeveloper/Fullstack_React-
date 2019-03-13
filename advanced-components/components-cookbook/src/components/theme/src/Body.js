import React from "react";
//using multiple contexts
import { ThemeContext } from "./theme";
import { UserContext } from "./user";
//we just have to wrap the element in the context Consumer component then we can easily use that value
export const Body = props => (
  <ThemeContext.Consumer>
    {theme => (
      <header
        className="App-header"
        style={{ backgroundColor: theme.background }}
      >
        <UserContext.Consumer>
          <h1>{user => (user ? "Welcome back" : "Welcome")}</h1>
        </UserContext.Consumer>
      </header>
    )}
  </ThemeContext.Consumer>
);

export default Body;
