import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserNav from "../user/navbar/UserNav";
import { getProfile } from "../user/login-register/UserFunctions";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../utilities/Pagination";

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
      getLink: "/api/get-10-guest"
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

  render() {
    return <React.Fragment>
      {this.authorizeUser()}
      <UserNav />
      {!this.state.loadingScreen
        ?

        <div className="property-card property-responsive property-props">
          {this.state.userList.map(item =>
            item["id"] !== null ? (
              <Link to={{
                pathname: `/user/${item['slug']}`
              }} key={item}>
                <div className="card-kost">
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
          <div style={{ position: "fixed", bottom: "10%", left: "50%", background: "white", border: "30px solid white" }}>
            <Pagination pages={this.state.paginateData} />
          </div>
        </div>
        : null}

    </React.Fragment>;
  }
}

export default ManageGuest;
