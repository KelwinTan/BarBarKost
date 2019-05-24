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
import { OwnerDashboard } from "./components/owner/OwnerDashboard";
import { GuestUpdateProfile } from "./components/user/profile/GuestUpdateProfile";
import { UpdatePhone } from "./components/user/profile/UpdatePhone";
import { VerifyPhone } from "./components/user/profile/VerifyPhone";
import { sendChat, socket, connect } from "./Api";
import { ManageGuest } from "./components/admin/ManageGuest";
import { KostView } from "./components/kost/KostView";
import { InputApartment } from "./components/apartment/InputApartment";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import { ManageOwner } from "./components/admin/ManageOwner";
import { SearchProperty } from "./components/property/SearchProperty";

class App extends Component {
  constructor() {
    super();
    connect(
      "3",
      msg => {
        console.log("Jalan weh connectnya");
      }
    );
  }
  send() {
    socket.emit("newMessage", "1", "helloooo send jalan nih");
  }

  render() {
    return (
      <React.Fragment>
        {/* {
          <Route
            render={({ location }) => (
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  component={() => <Home socketSend={this.send} />}
                />
                <Route exact path="/user-form" component={UserForm} />
                <Route exact path="/guest-login" component={Login} />
                <Route exact path="/guest-page" component={Login} />
                <Route exact path="/promosi-kost" component={PromosiKost} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/owner-login" component={OwnerLogin} />
                <Route
                  exact
                  path="/owner-update-profile"
                  component={UpdateProfile}
                />
                <Route path="/cari-kost" component={CariKost} />
                <Route path="/update-phone" component={UpdatePhone} />
                <Route path="/guest-update" component={GuestUpdateProfile} />
                <Route exact path="/owner-register" component={OwnerRegister} />
                <Route
                  exact
                  path="/owner-dashboard"
                  component={OwnerDashboard}
                />
                <Route exact path="/input-kost" component={InputProperty} />
                <Route
                  exact
                  path="/enter-phone-token"
                  component={VerifyPhone}
                />
                <Route exact path="/admin" component={AdminDashboard} />
                <Route
                  exact
                  path="/admin/manage-guest"
                  component={ManageGuest}
                />
                <Route exact path="/input-apt" component={InputApartment} />
                <Route
                  exact
                  path="/admin/manage-owner"
                  component={ManageOwner}
                />
                <Route path="" component={ErrorPage} />
              </Switch>
            )}
          />
        } */}
        <SearchProperty />
        {/* <ManageGuest /> */}
        {/* <KostView /> */}
        {/* <InputApartment /> */}
        {/* <LoadingScreen /> */}
        {/* <InputProperty /> */}
      </React.Fragment>
    );
  }
}

export default App;
