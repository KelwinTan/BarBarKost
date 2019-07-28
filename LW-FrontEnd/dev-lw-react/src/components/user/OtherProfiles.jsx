import React, { Component } from 'react'
import { UserNav } from './navbar/UserNav';
import Footer from '../home/Footer';
import LoadingScreen from '../utilities/LoadingScreen';
import Axios from 'axios';
import { getProfile } from "../user/login-register/UserFunctions";
import { Link, Redirect } from "react-router-dom";

export class OtherProfiles extends Component {
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
        const fdd = new FormData();
        fdd.append('user_id', slug)
        Axios.post("/api/total-following", fdd).then(res => {
            console.log(res);
            this.setState({
                totalFollowing: res.data
            });
        }
        );
        console.log(slug);
        const fd = new FormData();
        fd.append("id", slug);
        Axios.post("/api/show-other-profile", fd)
            .then(res => {
                console.log(res);
                this.setState({
                    user: res.data,
                    loadingScreen: false,
                });
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
                {this.authorizeUser()}

                {this.handleLoading()}
                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="post-cards">
                            <div>
                                <img src={`http://localhost:8000/storage/${this.state.user[0]["picture_id"]}`} alt="Banner" />
                            </div>
                            <p>User's Name: {this.state.user[0]["name"]}</p>
                            <p>Email: {this.state.user[0]["email"]}</p>

                            <p>Total Following: {this.state.totalFollowing}</p>

                        </div>
                    </div>
                    : ""}
                <Footer />
            </React.Fragment>
        )
    }
}

export default OtherProfiles
