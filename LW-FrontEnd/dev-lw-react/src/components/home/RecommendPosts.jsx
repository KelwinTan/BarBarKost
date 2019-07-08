import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import Footer from './Footer';
import Axios from 'axios';
import LoadingScreen from '../utilities/LoadingScreen';
import { Link } from "react-router-dom";

export class RecommendPosts extends Component {

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
        Axios.post("/api/recommend-post").then(res => {
            console.log(res);
            this.setState({
                recPost: res.data,
                loadingScreen: false
            });
        });

    }
    render() {
        return (
            <React.Fragment>
                {this.handleLoading()}
                {!this.state.loadingScreen
                    ?
                    <div className="property-card property-responsive property-props">
                        {this.state.recPost.map(item =>
                            item["id"] !== null ? (
                                <Link to={{
                                    pathname: `/post-detail/${item['slug']}`
                                }} key={item}>
                                    <div className="card-kost" style={{ height: "350px" }}>
                                        <div className="card-kost-container">
                                            <img style={{ width: "200px", margin: "auto" }} src={`http://localhost:8000/storage/${item["thumbnail_path"]}`} alt="Banner" />
                                            <h4>Post Title: {item["title"]}</h4>
                                            <div className="card-kost-images">
                                                <p>Post posted at: {item["created_at"]}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                    ""
                                )
                        )}
                    </div>
                    : null}
            </React.Fragment>
        )
    }
}

export default RecommendPosts
