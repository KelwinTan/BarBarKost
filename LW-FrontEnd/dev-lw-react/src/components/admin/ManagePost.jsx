import React, { Component } from 'react'
import UserNav from '../user/navbar/UserNav';
import { Link, Redirect } from "react-router-dom";
import { getProfile } from "../user/login-register/UserFunctions";
import { getTotalUsers } from "./AdminFunctions";
import UserForm from '../user/UserForm';
import TextEditor from './TextEditor';
import Footer from '../home/Footer';
import axios from "axios";
import LoadingScreen from '../utilities/LoadingScreen';
import GetPost from './GetPost';
import Pagination from '../utilities/Pagination';

export class ManagePost extends Component {
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
            formErrors: {
                title: "",
                content: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
            loadingScreen: false,
            visibility: "",
            title: "",
            content: "",
            postImage: null,
            tags: "",
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        // console.log("Name:", name);
        // console.log("Value:", value);

        switch (name) {
            case "title":
                formErrors.title =
                    value.length < 5 && value.length > 0
                        ? "Minimum 5 Characters Required"
                        : "";
                break;
            case "content":
                formErrors.content =
                    value.length < 3 && value.length > 0
                        ? "Minimum 3 Characters Required"
                        : "";
                break;
            case "confirmPassword":
                formErrors.confirmPassword =
                    value !== this.state.password ? "Password must match" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };

    handleSubmit = () => {
        const PostData = new FormData();
        const config = {
            header: {
                "content-type": "multipart/form-data"
            }
        }
        PostData.append('title', this.state.title);
        PostData.append('post_content', this.state.content);
        PostData.append('tags', this.state.tags);
        PostData.append('visibility', this.state.visibility);
        if (this.state.postImage !== null) {
            PostData.append('thumbnail_picture', this.state.postImage[0]);
        }
        this.setState({ loadingScreen: true });

        axios.post("/api/insert-post", PostData, config).then(
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

    componentDidMount() {
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
        getTotalUsers().then(
            res => {
                console.log(res);
                this.setState({ totalUsers: res });
            }
        )
    }

    authorizeUser = () => {
        if (this.state.type !== 3) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };

    handleContent = (newContent) => {
        this.setState({
            content: newContent
        })
    }

    postImageHandler = event => {
        console.log(event.target.files);
        this.setState({
            postImage: event.target.files
        });
    }

    render() {
        const { formErrors } = this.state;

        return (
            <React.Fragment>
                {this.authorizeUser()}
                {this.handleLoading()}
                <UserNav />
                <h1 style={{ textAlign: "center", fontSize: "50px" }}>Manage Post</h1>

                <div className="admin-link-styles">
                    <Link to="/admin-create-post">Create Post</Link>

                </div>
                <GetPost />
                {/* <Pagination pages={}/> */}
                <Footer />
            </React.Fragment>
        )
    }
}

export default ManagePost
