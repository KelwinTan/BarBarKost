import React, { Component } from "react";
import { UserForm } from "./components/user/UserForm";
import Home from "./components/home/Home";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Promo } from "./components/image-slider/Promo";
import { PromosiKost } from "./components/user/PromosiKost";
// Testing User Login Register
import LoginNavbar from "./components/user/login-register/LoginNavbar";
import Landing from "./components/user/login-register/Landing";
import Register from "./components/user/login-register/Register";
import Login from "./components/user/login-register/Login";
import Profile from "./components/user/login-register/Profile";
import TestDropDown from "./components/TestDropDown";
import KotaBesar from "./components/home/KotaBesar";
import ModalBox from "./components/ModalBox";
import UpdateProfile from "./components/user/UpdateProfile";
import ErrorPage from "./components/ErrorPage";
import MyLeaflet from "./components/map/MyLeaflet.jsx";
import LoadingScreen from "./components/utilities/LoadingScreen";
import Card from "./components/image-slider/Card";
import PropertyCard from "./components/property/PropetyCard";
import OwnerLogin from "./components/user/login-register/OwnerLogin";
import Slider from "./components/image-slider/Slider";
import CariKost from "./components/cari-kost/CariKost";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={450}
                  classNames="fade"
                >
                  <Switch location={location}>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/userForm" component={UserForm} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/promosi-kost" component={PromosiKost} />
                    <Route exact path="/profile" component={Profile} />
                    <Route
                      exact
                      path="/update-profile"
                      component={UpdateProfile}
                    />
                    <Route exact path="/ownerForm" component={OwnerLogin} />
                    <Route path="" component={ErrorPage} />
                    <Route path="/cari-kost" component={MyLeaflet} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        }
        {/* <PromosiKost /> */}
        {/* <Slider /> */}
        {/* <Promo /> */}
        {/* <TestDropDown /> */}
        {/* <BrowserRouter>
          <LoginNavbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
        </BrowserRouter> */}
        {/* <KotaBesar /> */}
        {/* <ModalBox message="Hello" /> */}
        {/* <MyLeaflet /> */}
        {/* <LoadingScreen /> */}
        {/* <PropertyCard /> */}
      </React.Fragment>
    );
  }
}

export default App;
