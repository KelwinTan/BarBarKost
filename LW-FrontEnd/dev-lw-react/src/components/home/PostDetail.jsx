import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import Footer from './Footer';
import LoadingScreen from '../utilities/LoadingScreen';
import { getProfile } from "../user/login-register/UserFunctions";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import RecommendPost from './RecommendPost';

export class PostDetail extends Component {

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
            loadingScreen: true,
            visibility: "",
            title: "",
            content: "",
            postImage: null,
            tags: "",
            currPost: null,
            currSlug: "",
            recPost: null,
            errors: {

            },
            thumbnail: null
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
        this.setState({ currSlug: slug });
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
            document.getElementById("post-content").innerHTML = this.state.currPost[0]['content'];

            this.setState({
                title: this.state.currPost[0]['title'],
                content: this.state.currPost[0]['content'],
                visibility: this.state.currPost[0]['visibility'],
                tags: this.state.currPost[0]['tags'],
                thumbnail: this.state.currPost[0]['thumbnail_path'],
            });

        }
        );

    }

    handleContent = (newContent) => {
        this.setState({
            content: newContent
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.handleLoading()}
                <UserNav />
                {!this.state.loadingScreen
                    ?
                    <div>
                        {this.state.currPost.map(item =>
                            item["id"] !== null ? (
                                <div className="kost-data-layout">
                                    <div className="input-data-lokasi">
                                        <div className="input-data-form">
                                            <img src={`http://localhost:8000/storage/${item["thumbnail_path"]}`} alt="Banner" />
                                            <h5>Post Title: {item["title"]}</h5>
                                            {/* <h5>Kost Name: {item["name"]}</h5>
                                                <h5>Description: {item["description"]}</h5>
                                                <h5>Price: {item["prices"]}</h5>
                                                <h5>City: {item["city"]}</h5>
                                                <h5>Address: {item["address"]}</h5>
                                                <h5>Total Rooms: {item["total_rooms"]}</h5>
                                                <h5>Room(s) Left: {item["room_left"]}</h5>
                                                <h5>Owner Email: {item["owner_email"]}</h5> */}
                                            <div id="post-content">
                                            </div>
                                            <h5>Post Tag: {item["tags"]}</h5>
                                            <h5>Post Created At: {item["created_at"]}</h5>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                    ""
                                )
                        )}
                    </div>
                    : null}
                <h1 style={{ textAlign: "center", fontSize: "50px" }}>Recommended Posts</h1>
                <RecommendPost />
                <Footer />
            </React.Fragment>
        )
    }
}

export default PostDetail
