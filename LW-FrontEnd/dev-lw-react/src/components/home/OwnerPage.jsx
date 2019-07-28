import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserNav from "../user/navbar/UserNav";
import { getProfile } from "../user/login-register/UserFunctions";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../utilities/Pagination";
import Footer from "./Footer";
import LoadingScreen from "../utilities/LoadingScreen";

export class OwnerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            join: "",
            type: 1,
            showIklan: false,
            showProfileFunc: false,
            showMenu: false,
            verifyEmail: false,
            verifyPhone: false,
            totalUsers: 0,
            loadingScreen: true,
            userList: "",
            paginateData: null,
            getLink: "/api/get-10-owners",
            ownerName: "",
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
        }
        );
    }

    authorizeUser = () => {
        if (this.state.type !== 1) {
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
    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };

    handleOwnerName = (event) => {
        const { name, value } = event.target;
        this.setState({ ownerName: value });
        console.log(this.state);
    }

    searchOwner = () => {
        this.setState({ loadingScreen: true });
        const fd = new FormData();
        fd.append("name", this.state.ownerName);
        axios.post("/api/search-owners", fd).then(res => {
            console.log(res);
            this.setState({
                userList: res.data.data,
                loadingScreen: false,
                paginateData: res.data
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.authorizeUser()}
                {this.handleLoading()}

                <UserNav />
                <h1 style={{ textAlign: "center", fontSize: "50px" }}>List of Owners</h1>

                <div style={{ textAlign: "center" }}>
                    <input type="text" onChange={this.handleOwnerName} placeholder="Input Owner Name" />

                    <button onClick={this.searchOwner} className="filter-button">Search Owner</button>
                </div>
                <hr />
                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="post-cards">
                            {this.state.userList.map(item =>
                                item["id"] !== null ? (
                                    <Link to={{
                                        pathname: `/owner-detail/${item['slug']}`
                                    }} key={item["id"]}>
                                        <div className="card-kost post-resp" style={{ height: "350px", width: "300px" }}>
                                            <div className="card-kost-container">
                                                <img style={{ height: "150px", width: "150px", margin: "0 auto" }} src={`http://localhost:8000/storage/${item["picture_id"]}`} alt="Profile Picture" />
                                                <h4>Name: {item["name"]}</h4>
                                                <div className="card-kost-images">
                                                    <p>E-mail: {item["email"]}</p>
                                                    <p>Owner Phone Number: {item["phone"]}</p>
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
                    </div>
                    : null}
                <Footer />
            </React.Fragment>
        )
    }
}

export default OwnerPage
