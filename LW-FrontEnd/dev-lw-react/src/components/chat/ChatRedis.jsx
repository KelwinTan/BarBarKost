import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import Footer from '../home/Footer';
import { getProfile } from "../user/login-register/UserFunctions";
import LoadingScreen from '../utilities/LoadingScreen';
import Axios from 'axios';
import { Link, Redirect } from "react-router-dom";

export default class ChatRedis extends Component {

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
            type: 2,
            pictureID: null,
            msg: "",
            id: "",
            chatDetails: [],
            GuestID: ""
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

    authorizeUser = () => {
        if (this.state.type !== 2) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };

    async componentDidMount() {
        console.log("Hello1");
        const { guest_id } = this.props.location.state;
        this.setState({ GuestID: guest_id });
        console.log(guest_id);
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
        fd.append("guest_id", guest_id);
        fd.append("owner_id", this.state.id);

        await Axios.post("/api/Create-Channel", fd).then(res => {
            console.log(res);
        })
        await Axios.post("/api/Get-Chat-Detail", fd).then(res => {
            console.log(res);
            this.setState({
                chatDetails: res.data,
                loadingScreen: false,
            })
        })
        console.log(this.state.chatDetails);
    }

    sendMsg = () => {
        const fd = new FormData();
        fd.append("guest_id", this.state.GuestID);
        fd.append("owner_id", this.state.id);
        let data = {
            sender: this.state.id,
            msg: this.state.msg
        }
        fd.append("msg", JSON.stringify(data));
        Axios.post("/api/Send-Message", fd).then(res => {
            console.log(res);
        }).then(res => {
            this.setState({ loadingScreen: true });
            Axios.post("/api/Get-Chat-Detail", fd).then(res => {
                console.log(res);
                this.setState({
                    chatDetails: res.data,
                    loadingScreen: false,
                })
            });
        }
        ).catch(err => {
            console.log(err);
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            console.log(this.state.msg);
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.handleLoading()}
                {this.authorizeUser()}
                {!this.state.loadingScreen
                    ?
                    <div style={{ border: "5px solid white", margin: "auto" }}>
                        {this.state.chatDetails.map(item =>
                            item["id"] !== null ? (
                                <div>
                                    <div style={{ color: "white", width: "50%", border: "2px solid black" }}>
                                        <p>{item["msg"]}</p>
                                        <p>{item["sender"]}</p>
                                    </div>
                                </div>
                            ) : (
                                    ""
                                )
                        )}

                    </div>
                    : null}

                <div style={{ margin: "auto", width: "90%", display: "grid", alignItems: "start", justifyItems: "right", paddingTop: "10px" }}>
                    <input type="text" onChange={this.handleChange} name="msg" placeholder="Send Message" />
                    <button onClick={this.sendMsg}>Send Message</button>
                </div>

            </React.Fragment>
        )
    }
}
