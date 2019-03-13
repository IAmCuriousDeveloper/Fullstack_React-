import React, { Component } from "react";

import { ThemeContext, themes } from "./theme";
import "./App.css";
import Header from "./Header";

class App extends Component {
  state = { theme: themes.dark };

  changeTheme = evt => {
    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark
    }));
  };
  //when we provide the context we also import the values (here themes for state management)
  //we just wrap the component in which we want this context data to live (here Header is wrapped in ThemeContext.Provider  )
  render() {
    return (
      <div className="App">
        <ThemeContext.Provider value={this.state.theme}>
          <Header />
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>

          <button onClick={this.changeTheme}>Change theme</button>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default App;
