import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserNav from "../user/navbar/UserNav";
import { getProfile } from "../user/login-register/UserFunctions";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import LoadingScreen from "../utilities/LoadingScreen";
import Footer from "./Footer";



export class OwnerDetail extends Component {

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
            username: "",
            phone: "",
            currUser: null,
            userSlug: "",
            id: "",
            userApt: null,
            userKost: null,
            displayReset: false
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
                type: res.user.type,
                phone: res.user.phone,
                id: res.user.id,
                username: res.user.username
            });
        });
        const slug = this.props.match.params.id;
        this.setState({ userSlug: slug });
        console.log(slug);
        const PostData = new FormData();
        PostData.append('slug', slug);
        axios.post("/api/get-specific-user", PostData).then(
            res => {
                console.log(res);
                this.setState({ currUser: res.data });
                console.log(this.state.currUser[0]['id']);
                const fd = new FormData();
                fd.append('owner_id', this.state.currUser[0]['id']);
                axios.post("/api/get-owner-apart", fd).then(
                    res => {
                        console.log(res);
                        this.setState({ userApt: res.data.data });
                    }
                )
                axios.post("/api/owner-kost", fd).then(
                    res => {
                        console.log(res);
                        this.setState({ loadingScreen: false, userKost: res.data.data });
                    }
                )
            }
        )
    }

    authorizeUser = () => {
        if (this.state.type !== 1) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };

    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };

    followOwner = () => {
        this.setState({ loadingScreen: true });
        const fd = new FormData();
        fd.append("owner_id", this.state.currUser[0]['id']);
        fd.append("user_id", this.state.id);
        axios.post("/api/user-follow-owner", fd).then(
            res => {
                console.log(res);
                this.setState({ loadingScreen: false });
            }
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.authorizeUser()}
                {this.handleLoading()}
                <UserNav />
                <div>
                    {!this.state.loadingScreen
                        ?
                        <div className="owner-dashboard-wrapper" style={{ height: "auto" }}>
                            <div className="owner-side-dashboard">
                                <div className="owner-dashboard-contents" style={{ height: "auto" }}>
                                    <img src={`http://localhost:8000/storage/${this.state.currUser[0]['picture_id']}`} alt="Profile" />
                                    <h4>Name: {this.state.currUser[0]['name']}</h4>
                                    <div >
                                        <p>E-Mail: {this.state.currUser[0]['email']}</p>
                                        <p>Phone: {this.state.currUser[0]['phone']}</p>
                                        <p>Username: {this.state.currUser[0]['username']}</p>
                                        <p>Email Verified At: {this.state.currUser[0]['email_verified_at']}</p>
                                        <p>Phone Verified At: {this.state.currUser[0]['phone_verified_at']}</p>
                                        <button onClick={this.followOwner}>Follow Me</button>
                                    </div>
                                </div>
                            </div>
                            <div className="owner-side-dashboard-right" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", height: "auto" }}>
                                {this.state.userApt.map(item =>
                                    item["id"] !== null ? (
                                        <Link to={{
                                            pathname: `/apart/detail-${item['slug']}`,
                                            state: {
                                                apart_slug: item['slug']
                                            }
                                        }} key={item} >
                                            <div className="owner-dashboard-contents" style={{ height: "auto" }}>
                                                <img src={`http://localhost:8000/storage/${item["banner_picture"]}`} alt="Banner" style={{ width: "40px" }} />
                                                <h4>Apartment Name: {item["name"]}</h4>
                                                <div className="card-kost-images">
                                                    <p>Apart City: {item["city"]}</p>
                                                    <p>Apart Prices: {item["prices"]}</p>

                                                </div>
                                            </div>
                                        </Link>
                                    ) : (
                                            ""
                                        )
                                )}
                                {this.state.userKost.map(item =>
                                    item["id"] !== null ? (
                                        <Link to={{
                                            pathname: `/kost/detail-${item['kost_slug']}`,
                                            state: {
                                                apart_slug: item['kost_slug']
                                            }
                                        }} key={item} >
                                            <div className="owner-dashboard-contents" style={{ height: "auto", background: "orangered" }}>
                                                <img src={`http://localhost:8000/storage/${item["banner_picture"]}`} alt="Banner" style={{ width: "40px" }} />
                                                <h4>Kost Name: {item["name"]}</h4>
                                                <div className="card-kost-images">
                                                    <p>Kost City: {item["city"]}</p>
                                                    <p>Kost Prices: {item["prices"]}</p>

                                                </div>
                                            </div>
                                        </Link>
                                    ) : (
                                            ""
                                        )
                                )}
                            </div>
                        </div>
                        : null}
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default OwnerDetail
