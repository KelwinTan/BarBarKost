import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserNav from "../user/navbar/UserNav";
import { getProfile } from "../user/login-register/UserFunctions";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import LoadingScreen from "../utilities/LoadingScreen";

const BgModal = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  align-items: center;
  z-index:100000;
`;

const ModalContent = styled.div`
  width: 500px;
  height: 350px;
  background-color: white;
  border-radius: 5px;
  position: relative;
  text-align: center;
  padding: 20px;
`;

const Close = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 42px;
  color: #333;
  transform: rotate(45deg);
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

const Content = styled.div`
  margin: 15px auto;
  display: block;
  width: 50%;
  padding: 8px;
  margin-top: 20px;
  border: 1px solid gray;
  color: red;
`;

export class GuestData extends Component {
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
            username: "",
            phone: "",
            currUser: null,
            userSlug: "",
            displayReset: false
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        // getProfile().then(res => {
        //     console.log(res);
        //     this.setState({
        //         name: res.user.name,
        //         email: res.user.email,
        //         join: res.user.created_at,
        //         pictureID: res.user.picture_id,
        //         type: res.user.type,
        //         phone: res.user.phone,
        //         username: res.user.username 
        //     });
        // });
        const slug = this.props.match.params.id;
        this.setState({ userSlug: slug });
        console.log(slug);
        const PostData = new FormData();
        PostData.append('slug', slug);
        axios.post("/api/get-specific-user", PostData).then(
            res => {
                console.log(res);
                this.setState({ loadingScreen: false, currUser: res.data });
                console.log(this.state.currUser[0]['name']);
            }
        )
    }
    deleteKosan = () => {
        this.setState({ displayModal: true });
    }

    closeModal = () => {
        this.setState({ displayModal: false });
    }

    resetPasswordPop = () => {
        this.setState({ displayReset: true });
    }

    closePop = () => {
        this.setState({ displayReset: false });
    }

    authorizeUser = () => {
        if (this.state.type !== 3) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };

    deleteBeneran = () => {
        const PostData = new FormData();
        PostData.append('slug', this.state.userSlug);
        this.setState({ loadingScreen: true });

        axios.post("/api/ban-specific-user", PostData).then(
            res => {
                console.log(res);
                this.setState({ loadingScreen: false });
            }
        )
    }

    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };

    resetPassword = () => {
        const PostData = new FormData();
        PostData.append('slug', this.state.userSlug);
        this.setState({ loadingScreen: true });

        axios.post("/api/reset-password", PostData).then(
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
                        <div className="property-card property-responsive property-props">
                            <div className="card-kost">
                                <div className="card-kost-container">
                                    <img src={`http://localhost:8000/storage/${this.state.currUser[0]['picture_id']}`} alt="Profile" />
                                    <h4>Name: {this.state.currUser[0]['name']}</h4>
                                    <div className="card-kost-images">
                                        <p>E-Mail: {this.state.currUser[0]['email']}</p>
                                        <p>Phone: {this.state.currUser[0]['phone']}</p>
                                        <p>Username: {this.state.currUser[0]['username']}</p>
                                        <p>Email Verified At: {this.state.currUser[0]['email_verified_at']}</p>
                                        <p>Phone Verified At: {this.state.currUser[0]['phone_verified_at']}</p>
                                        <p>User's Status: {this.state.currUser[0]['status']}</p>
                                        <button onClick={this.deleteKosan}>Ban User</button>
                                        <button onClick={this.resetPasswordPop}>Reset User's Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
                <div style={{ textAlign: "center" }}>
                    {this.state.displayModal ?
                        <BgModal>
                            <ModalContent>
                                <Close onClick={this.closeModal}>+</Close>
                                <img src={`http://localhost:8000/storage/${this.state.currUser[0]['picture_id']}`} style={{ height: "200px" }} alt="logo" />
                                <Content>Are you sure you are going to ban this user?</Content>
                                <button onClick={this.deleteBeneran}>Yes</button>
                            </ModalContent>
                        </BgModal> : ""}
                </div>
                <div style={{ textAlign: "center" }}>
                    {this.state.displayReset ?
                        <BgModal>
                            <ModalContent>
                                <Close onClick={this.closePop}>+</Close>
                                <img src={`http://localhost:8000/storage/${this.state.currUser[0]['picture_id']}`} style={{ height: "200px" }} alt="logo" />
                                <Content>Are you sure you are going to reset this user's password?</Content>
                                <button onClick={this.resetPassword}>Yes</button>
                            </ModalContent>
                        </BgModal> : ""}
                </div>
            </React.Fragment>
        )
    }
}

export default GuestData
