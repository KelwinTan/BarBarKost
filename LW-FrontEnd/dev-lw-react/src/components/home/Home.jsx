import React, { Component } from "react";
import { SliderContent } from "./SliderContent";
import { Footer } from "./Footer";
import NavBar from "./NavBar";
import KotaBesar from "./KotaBesar";
import HalamanPilihan from "./HalamanPilihan";
import ApartmentArea from "./ApartmentArea";
import KostArea from "./KostArea";
import PropertyCard from "./PropetyCard";
import BreadCrumbs from "../utilities/BreadCrumbs";
import OwnerPage from "./OwnerPage";
import { getProfile } from "../user/login-register/UserFunctions";
import { Link, Redirect } from "react-router-dom";


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socketSend: "",
      name: "",
      email: "",
      join: "",
      type: 1,
      showIklan: false,
    };
  }
  async componentDidMount() {
    // this.setState({ loadingScreen: true })
    // getProfile().then(res => {
    //   console.log(res);
    //   this.setState({
    //     name: res.user.name,
    //     email: res.user.email,
    //     join: res.user.created_at,
    //     pictureID: res.user.picture_id,
    //     type: res.user.type,
    //     showIklan: false,
    //   });
    // });
  }

  // authorizeUser = () => {
  //   if (this.state.type !== 1) {
  //     return <Redirect to={"/"}> </Redirect>;
  //   }
  // };

  render() {
    return (
      <div>
        <NavBar />
        <BreadCrumbs />
        <SliderContent />
        <KotaBesar />
        <PropertyCard />
        <HalamanPilihan />
        <ApartmentArea />
        <KostArea />
        <Footer />
        {/* <button onClick={this.props.socketSend}>Click Me to Send</button> */}
      </div>
    );
  }
}

export default Home;
