import React, { Component } from "react";
import { UserForm } from "./components/user/UserForm";
import Home from "./components/home/Home";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={300} classNames="fade">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/userForm" component={UserForm} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </React.Fragment>
    );
  }
}

export default App;
