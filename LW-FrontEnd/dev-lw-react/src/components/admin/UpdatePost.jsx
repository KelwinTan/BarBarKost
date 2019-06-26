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

export class UpdatePost extends Component {
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
            currPost: null,
            currSlug: "",
            errors: {

            },
            thumbnail: null
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
        PostData.append('slug', this.state.currSlug);
        PostData.append('post_content', this.state.content);
        PostData.append('tags', this.state.tags);
        PostData.append('visibility', this.state.visibility);
        if (this.state.postImage !== null) {
            PostData.append('thumbnail_picture', this.state.postImage[0]);
        }
        this.setState({ loadingScreen: true });
        const axiosKelwin = axios.create({ validateStatus: false });

        axios.post("/api/update-post", PostData, config).then(
            res => {
                console.log(res);
                this.setState({ loadingScreen: false });
                this.props.history.push(`/manage-post`);
                
            }
        ).catch(
            err => {
                console.log("asdad");
                
                console.log(err.response);
                this.setState({
                    errors: err.response.data,
                    loadingScreen: false
                })
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
        const slug = this.props.match.params.id;
        this.setState({currSlug: slug});
        // console.log(this.props.match.params.id);
        const PostData = new FormData();
        PostData.append('slug', slug);
        const config = {
            header: {
                "content-type": "multipart/form-data"
            }
        }
        axios.post("/api/get-specific-post", PostData, config).then(res => {
            console.log(res);
            this.setState({
                currPost: res.data,
                loadingScreen: false,

            });
            this.setState({
                title: this.state.currPost[0]['title'],
                content: this.state.currPost[0]['content'],
                visibility: this.state.currPost[0]['visibility'],
                tags: this.state.currPost[0]['tags'],
                thumbnail: this.state.currPost[0]['thumbnail_path'],
            });
            document.getElementById("post-content").innerHTML = this.state.currPost[0]['content'];

        }
        );
        
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
        const {errors} = this.state;

        return (
            <React.Fragment>
                {this.authorizeUser()}
                {this.handleLoading()}
                <UserNav />

                <div className="wrapper crud-form">
                    <div className="form-wrapper">
                        <h1>Update Post</h1>
                        <div className="firstName">
                            <label htmlFor="title">Post Title</label>
                            <input
                                type="text"
                                className={
                                    formErrors.title.length > 0 ? "errorBox" : null
                                }
                                placeholder="Input Post Title"
                                name="title"
                                noValidate
                                onChange={this.handleChange}
                                autoFocus
                                defaultValue={this.state.title}
                            />
                            {formErrors.title.length > 0 && (
                                <span className="errorMsg">{formErrors.title}</span>
                            )}
                            {errors.title && <span className="errorMsg">{errors.title}</span>}
                        </div>
                        <div id="post-content">
                        </div>
                        <div className="password">
                            <label htmlFor="content">Content</label>
                            <TextEditor updateContent={this.handleContent} />
                            {formErrors.content.length > 0 && (
                                <span className="errorMsg">{formErrors.content}</span>
                            )}
                            {errors.post_content && <span className="errorMsg">{errors.post_content}</span>}
                        </div>
                        <div className="password">
                            <label htmlFor="visibility">Visibility</label>
                            <select
                                id="visibility-type"
                                name="visibility"
                                onChange={this.handleChange}
                            >
                                <option value="Public">Public</option>
                                <option value="Owner">Owner</option>
                                <option value="Guest">Guest</option>
                            </select>
                        </div>
                        <div className="password">
                            <label htmlFor="tags">Tag</label>
                            <select
                                id="tag-type"
                                name="tags"
                                onChange={this.handleChange}
                            >
                                <option value="Public">Public</option>
                                <option value="Owner">Owner</option>
                                <option value="Guest">Guest</option>
                            </select>
                        </div>
                        <img src={`http://localhost:8000/storage/${this.state.thumbnail}`} alt="Banner" />
                        <input
                            type="file"
                            onChange={this.postImageHandler}
                            accept="image/*"
                        />
                        <div className="createAccount">
                            <button onClick={this.handleSubmit}>Update Post</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default UpdatePost
