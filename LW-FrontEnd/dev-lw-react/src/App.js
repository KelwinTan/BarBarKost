import React, { Component } from "react";
import { UserForm } from "./components/user/UserForm";
import Home from "./components/home/Home";
import { Route, Switch } from "react-router-dom";
import { PromosiKost } from "./components/user/PromosiKost";
// Testing User Login Register
import Login from "./components/user/login-register/Login";
import Profile from "./components/user/login-register/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ErrorPage from "./components/ErrorPage";
import OwnerLogin from "./components/user/login-register/OwnerLogin";
import CariKost from "./components/cari-kost/CariKost";
import { InputProperty } from "./components/property/InputProperty";
import LoadingScreen from "./components/utilities/LoadingScreen";
import { OwnerRegister } from "./components/user/login-register/OwnerRegister";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {
          <Route
            render={({ location }) => (
              <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route exact path="/user-form" component={UserForm} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/promosi-kost" component={PromosiKost} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/update-profile" component={UpdateProfile} />
                <Route exact path="/owner-form" component={OwnerLogin} />
                <Route path="/cari-kost" component={CariKost} />
                <Route exact path="/owner-register" component={OwnerRegister} />
                <Route path="" component={ErrorPage} />
              </Switch>
            )}
          />
        }
        {/* <LoadingScreen /> */}
        {/* <InputProperty /> */}
      </React.Fragment>
    );
  }
}

export default App;
