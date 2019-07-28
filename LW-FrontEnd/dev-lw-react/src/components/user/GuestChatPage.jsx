import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import Footer from '../home/Footer';
import { getProfile } from "../user/login-register/UserFunctions";
import LoadingScreen from '../utilities/LoadingScreen';
import Axios from 'axios';
import ChatRedis from '../chat/ChatRedis';
import { Link, Redirect, Switch, Route, withRouter, BrowserRouter as Router } from "react-router-dom";

export class GuestChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            join: "",
            showIklan: false,
            showProfileFunc: false,
            showMenu: false,
            verifyEmail: false,
            verifyPhone: false,
            email_verify_at: null,
            loadingScreen: true,
            phone_verify_at: null,
            phone: "",
            type: 1,
            pictureID: null,
            msg: "",
            id: "",
            chatLists: [],
            displayMenu: false
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };

    async componentDidMount() {
        console.log("Hello1");
        await getProfile().then(res => {
            console.log(res);
            this.setState({
                name: res.user.name,
                email: res.user.email,
                join: res.user.created_at,
                pictureID: res.user.picture_id,
                email_verify_at: res.user.email_verified_at,
                phone_verify_at: res.user.phone_verified_at,
                phone: res.user.phone,
                type: res.user.type,
                id: res.user.id,
            });
        });
        const fd = new FormData();
        fd.append("user_id", this.state.id);

        await Axios.post("/api/Get-Chat-List", fd).then(res => {
            console.log(res);
            this.setState({
                chatLists: res.data,
                loadingScreen: false
            })
        })
        // await Axios.post("/api/Get-Chat-Detail", fd).then(res => {
        //     console.log(res);
        //     this.setState({
        //         chatLists: res.data,
        //         loadingScreen: false,
        //     })
        // })
        console.log(this.state.chatLists);
    }

    handleResponsive = () => {
        console.log("object23123");
        !this.state.displayMenu ? this.setState({ displayMenu: true }) : this.setState({ displayMenu: false });
    }

    authorizeUser = () => {
        if (this.state.type !== 1) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };

    render() {
        return (
            <React.Fragment>
                {this.authorizeUser()}
                {this.handleLoading()}
                <Router>

                    <UserNav />
                    <h1 style={{ textAlign: "center", fontSize: "50px" }}>Your Chats with Owners</h1>
                    <hr />
                    {!this.state.loadingScreen
                        ?
                        <div style={{ background: "#23272a", display: "flex" }} >
                            <i className="fa fa-bars chat-responsive-burger"  onClick={this.handleResponsive} ></i>
                            <div style={{ width: "20%", height: "500px", background: "#2c2f33", color: "white", margin: "10px", visibility: this.state.displayMenu ? "visible": "", transition:".5s ease-in-out" }} className="chat-responsive">
                                {this.state.chatLists.map(item =>
                                    item["id"] !== null ? (
                                        <Link to={{
                                            pathname: `/chat/${item['id']}`,
                                            state: {
                                                guest_id: item['id']
                                            }
                                        }} key={item} style={{ color: "white", textDecoration: "none" }}>
                                            <div style={{ display: "flex", overflow: "auto", textAlign: "center", alignItems: "center" }}>
                                                <img style={{ height: "50px", width: "50px", margin: "10px" }} src={`http://localhost:8000/storage/${item["picture_id"]}`} alt="Profile Picture" />
                                                <p>{item["name"]}</p>
                                            </div>
                                        </Link>
                                    ) : (
                                            ""
                                        )
                                )}
                            </div>
                            {/* <div style={{ width: "70%" }}>
                            <ChatRedis />

                        </div> */}
                            <div style={{ width: "75%", position: "absolute", bottom: "0", right: "0" }}>
                                <Switch>
                                    <Route exact path="/chat/:id" component={ChatRedis} />
                                </Switch>
                            </div>
                        </div>
                        : null}
                    <Footer />
                </Router>

            </React.Fragment>

        )
    }
}

export default GuestChatPage
