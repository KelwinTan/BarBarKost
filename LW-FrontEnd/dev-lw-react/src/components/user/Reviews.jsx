import React, { Component } from 'react'
import { UserNav } from './navbar/UserNav';
import Footer from '../home/Footer';
import LoadingScreen from '../utilities/LoadingScreen';
import Axios from 'axios';
import { getProfile } from "../user/login-register/UserFunctions";
import { Link, Redirect } from "react-router-dom";
import Pagination from '../utilities/Pagination';

export class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: "",
            currKost: null,
            loadingScreen: true,
            displayModal: false,
            user_id: "",
            type: 1,
            suggestKost: "",
            kost_images: [],
            latlng: [],
            displayModal: false,
            reviewContent: "",
            reviewLists: [],
            user: [],
            totalFollowing: 0,
            paginateData: null,

        }
    }
    componentDidMount() {
        const slug = this.props.match.params.id;

        getProfile().then(res => {
            console.log(res);
            this.setState({
                name: res.user.name,
                phone: res.user.phone,
                email: res.user.email,
                join: res.user.created_at,
                pictureID: res.user.picture_id,
                type: res.user.type,
                id: res.user.id
            });
            console.log(this.state.id);
        });
        console.log(slug);
        const fd = new FormData();
        fd.append("property", slug);
        Axios.post("/api/show-10-review", fd).then(res => {
            console.log(res);
            this.setState({
                reviewLists: res.data.data,
                paginateData: res.data,
                loadingScreen: false
            })
        })

    }

    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };

    authorizeUser = () => {
        if (this.state.type !== 1) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };

    render() {
        return (
            <React.Fragment>
                <UserNav />
                {this.handleLoading()}
                <h1 style={{ textAlign: "center", fontSize: "50px" }}>All Reviews for this specific Property</h1>

                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="post-cards">
                            {this.state.reviewLists.map(item =>
                                item["id"] !== null ? (
                                    <div className="card-kost post-resp" style={{ height: "auto", width: "300px" }}>
                                        <div className="card-kost-container">
                                            <div className="card-kost-images">
                                                <p>Reviewer Name: {item["user"]["name"]}</p>
                                                <p>Review Content: {item["content"]}</p>
                                            </div>
                                        </div>
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

export default Reviews
