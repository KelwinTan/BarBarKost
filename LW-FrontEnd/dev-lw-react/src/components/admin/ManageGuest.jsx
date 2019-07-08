import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserNav from "../user/navbar/UserNav";
import { getProfile } from "../user/login-register/UserFunctions";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../utilities/Pagination";
import Footer from "../home/Footer";

export class ManageGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      join: "",
      type: 3,
      showIklan: false,
      showProfileFunc: false,
      showMenu: false,
      verifyEmail: false,
      verifyPhone: false,
      totalUsers: 0,
      loadingScreen: true,
      userList: "",
      paginateData: null,
      getLink: "/api/get-10-guest",
      filtering: "",
      emailDomain: "",
      guestName: "",
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    getProfile().then(res => {
      console.log(res);
      this.setState({
        name: res.user.name,
        email: res.user.email,
        join: res.user.created_at,
        pictureID: res.user.picture_id,
        type: res.user.type
      });
    });
    var pages = this.props.history.location.search;

    await axios.post(`${this.state.getLink + pages}`).then(res => {
      console.log(res);
      this.setState({
        userList: res.data.data,
        loadingScreen: false,
        paginateData: res.data
      });
      console.log(this.state.paginateData);
    }
    );
  }

  authorizeUser = () => {
    if (this.state.type !== 3) {
      return <Redirect to={"/"}> </Redirect>;
    }
  };

  componentWillReceiveProps(next_props, next_state) {
    console.log(next_props);
    axios.post(`${this.state.getLink + next_props.location.search}`).then(res => {
      console.log(res);
      this.setState({
        userList: res.data.data,
        loadingScreen: false,
        paginateData: res.data,

      });
    }
    );
  }

  handleFilterName = (event) => {
    const { name, value } = event.target;
    this.setState({ filtering: value });
    console.log(this.state);
  }
  handleEmailDomain = (event) => {
    const { name, value } = event.target;
    this.setState({ emailDomain: value });
    console.log(this.state);

  }

  handleGuestName = (event) => {
    const { name, value } = event.target;
    this.setState({ guestName: value });
    console.log(this.state);
  }

  filterGuests = () => {
    const fd = new FormData();
    fd.append('name', this.state.guestName);
    fd.append('emailDomain', this.state.emailDomain);
    this.setState({ loadingScreen: true })
    axios.post("/api/filter-guests", fd).then(res => {
      console.log(res);
      this.setState({
        userList: res.data.data,
        loadingScreen: false,
        paginateData: res.data
      });
      console.log(this.state.paginateData);
    }
    );
  }

  render() {
    return <React.Fragment>
      {this.authorizeUser()}
      <UserNav />
      <h1 style={{ textAlign: "center", fontSize: "50px" }}>Manage Guest</h1>
      <div style={{ textAlign: "center" }}>
        <input type="text" onChange={this.handleEmailDomain} placeholder="Input Email Domain" />
        <input type="text" onChange={this.handleGuestName} placeholder="Input Guest Name" />

        <button onClick={this.filterGuests} className="filter-button">Filter Guests</button>
      </div>
      <hr />

      {!this.state.loadingScreen
        ?

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="post-cards">
            {this.state.userList.map(item =>
              item["id"] !== null ? (

                <Link to={{
                  pathname: `/user/${item['slug']}`
                }} key={item["id"]}>
                  <div className="card-kost post-resp" style={{ height: "auto", width: "300px" }}>
                    <div className="card-kost-container">
                      <img src={`http://localhost:8000/storage/${item["picture_id"]}`} alt="Profile Picture" />
                      <h4>Name: {item["name"]}</h4>
                      <div className="card-kost-images">
                        <p>E-mail: {item["email"]}</p>
                        <p>User Joined At: {item["created_at"]}</p>
                        <p>User's Status: {item["status"]}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                  ""
                )
            )}
          </div>

          <div style={{ position: "fixed", bottom: "10%", left: "50%", background: "white", border: "30px solid white" }}>
            <Pagination pages={this.state.paginateData} />
          </div>
        </div>
        : null}
      <Footer />
    </React.Fragment>;
  }
}

export default ManageGuest;
