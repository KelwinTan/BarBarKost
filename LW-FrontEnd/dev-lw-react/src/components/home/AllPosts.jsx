import React, { Component } from 'react'
import axios from "axios";
import UserNav from '../user/navbar/UserNav';
import { Link } from "react-router-dom";
import LoadingScreen from '../utilities/LoadingScreen';
import Pagination from '../utilities/Pagination';
import { withRouter } from "react-router-dom";
import Footer from './Footer';

export class AllPosts extends Component {
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
            postList: null,
            loadingScreen: true,
            paginateData: null,
            getLink: "/api/get-all-post"
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
        console.log(this.props.history.location.search);
        var pages = this.props.history.location.search;
        await axios.post(`${this.state.getLink + pages}`).then(res => {
            console.log(res);
            this.setState({
                postList: res.data.posts.data,
                loadingScreen: false,
                paginateData: res.data.posts,

            });
        }
        );
    }

    componentWillReceiveProps(next_props, next_state) {
        console.log(next_props);
        axios.post(`${this.state.getLink + next_props.location.search}`).then(res => {
            console.log(res);
            this.setState({
                postList: res.data.posts.data,
                loadingScreen: false,
                paginateData: res.data.posts,

            });
        }
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.handleLoading()}
                <UserNav />
                <h1 style={{ textAlign: "center", fontSize: "50px" }}>All Posts</h1>

                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="post-cards">
                            {this.state.postList.map(item =>
                                item["id"] !== null ? (
                                    <div>
                                        <Link to={{
                                            pathname: `/post-detail/${item['slug']}`
                                        }} key={item}>
                                            <div className="card-kost post-resp" style={{ height: "350px", width: "300px" }}>
                                                <div className="card-kost-container">
                                                    <img src={`http://localhost:8000/storage/${item["thumbnail_path"]}`} alt="Banner" />
                                                    <h4>Post Title: {item["title"]}</h4>
                                                    <div className="card-kost-images">
                                                        <p>Post Tags: {item["tags"]}</p>

                                                        <p>Post Created At: {item["created_at"]}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                    </div>
                                ) : (
                                        ""
                                    )
                            )}
                        </div>
                        <div style={{ position: "fixed", bottom: "10%", left: "50%", background: "white", border: "30px solid white" }}>
                            <Pagination pages={this.state.paginateData} />
                        </div>
                    </div>
                    : null}
                <Footer />
            </React.Fragment>
        )
    }
}

export default withRouter(AllPosts)
