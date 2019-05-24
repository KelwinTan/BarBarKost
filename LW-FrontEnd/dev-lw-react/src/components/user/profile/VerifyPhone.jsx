import React, { Component } from "react";
import { UserNav } from "../navbar/UserNav";
import img from "../../../assets/images/email.png";
import { Link, Redirect } from "react-router-dom";
import LoadingScreen from "../../utilities/LoadingScreen";
import {
  getProfile,
  updateProfile,
  updatePhone,
  verifyPhoneToken
} from "../../user/login-register/UserFunctions";
export class VerifyPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      email: "",
      phone: "",
      token: "",
      formErrors: {
        Name: "",
        phone: "",
        password: "",
        token: ""
      },
      loadingScreen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  handleLoading = () => {
    if (this.state.loadingScreen === true) {
      return <LoadingScreen />;
    } else {
      return null;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loadingScreen: true });

    // if (formValid(this.state)) {
    const user = {
      token: this.state.token
    };
    verifyPhoneToken(user).then(res => {
      // console.log(res);
      // return <Redirect to={"/guest-update"}> </Redirect>;
      this.setState({ loadingScreen: false });
    });
    // } else {
    // console.error("FORM INVALID - DISPLAY ERROR MSG");
    // }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    // console.log("hello");
    switch (name) {
      case "Name":
        formErrors.Name =
          value.length < 5 && value.length > 0
            ? "Minimum 5 Characters Required"
            : "";
        break;
      case "token":
        formErrors.token =
          value.length < 5 && value.length > 0
            ? "Minimum 5 Characters Required"
            : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  componentDidMount() {
    if (localStorage.getItem("usertoken") === null) {
      console.log("Hello");
      return <Redirect to={"/"}> </Redirect>;
    } else {
      console.log("Hello1");
      getProfile().then(res => {
        console.log(res);
        this.setState({
          Name: res.user.name,
          email: res.user.email,
          phone: res.user.phone,
          join: res.user.created_at,
          pictureID: res.user.picture_id
        });
      });
    }
  }

  insertPhoneToken = () => {};

  render() {
    return (
      <React.Fragment>
        <div>
          <UserNav />
          <div className="wrapper1">
            {this.handleLoading()}
            <div className="form-wrapper1">
              <h1>Verify Phone Number</h1>
              <div className="data-pribadi-data">
                <img src={img} alt="profile" />
                <div className="data-pribadi-data-image" />
              </div>
              <form onSubmit={this.handleSubmit} noValidate>
                <div className="nameBox">
                  <label htmlFor="Name">Full Name</label>
                  <input
                    type="text"
                    className={
                      this.state.formErrors.Name.length > 0 ? "errorBox" : null
                    }
                    placeholder="Input Your Name"
                    name="Name"
                    noValidate
                    onChange={this.handleChange}
                    value={this.state.Name}
                    disabled
                  />
                  {this.state.formErrors.Name.length > 0 && (
                    <span className="errorMsg">
                      {this.state.formErrors.Name}
                    </span>
                  )}
                </div>

                <div className="password">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="number"
                    className={
                      this.state.formErrors.phone.length > 0 ? "errorBox" : null
                    }
                    placeholder="Input Your Phone Number"
                    name="phone"
                    noValidate
                    onChange={this.handleChange}
                    value={this.state.phone ? this.state.phone : "08"}
                    disabled
                  />
                </div>
                <div className="password">
                  <label htmlFor="token">Enter Token</label>
                  <input
                    type="text"
                    placeholder="Input Your Token"
                    name="token"
                    noValidate
                    onChange={this.handleChange}
                  />
                </div>

                {this.state.formErrors.token.length > 0 && (
                  <span className="errorMsg">
                    {this.state.formErrors.token}
                  </span>
                )}
                <div className="createAccount">
                  <button type="submit">Verify Phone Number</button>
                  <Link to="/profile">Go Back</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VerifyPhone;
