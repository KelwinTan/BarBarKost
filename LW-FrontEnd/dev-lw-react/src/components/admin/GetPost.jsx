import React, { Component } from 'react'
import axios from "axios";
import UserNav from '../user/navbar/UserNav';
import { Link } from "react-router-dom";
import LoadingScreen from '../utilities/LoadingScreen';
import Pagination from '../utilities/Pagination';
import { withRouter } from "react-router-dom";

export class GetPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: null,
            loadingScreen: true,
            paginateData: null,
            getLink: "/api/get-all-post"
        }
    }

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

    componentDidUpdate = () => {
        // this.sets
    }

    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };



    render() {
        return (
            <React.Fragment>
                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="property-card property-responsive property-props">
                            {this.state.postList.map(item =>
                                item["id"] !== null ? (
                                    <div>
                                        <Link to={{
                                            pathname: `/post/${item['slug']}`
                                        }} key={item}>
                                            <div className="card-kost">
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
            </React.Fragment>
        )
    }
}

export default withRouter(GetPost)
