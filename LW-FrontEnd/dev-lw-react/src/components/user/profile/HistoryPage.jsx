import React, { Component } from 'react'
import { getProfile } from "../../user/login-register/UserFunctions";
import LoadingScreen from '../../utilities/LoadingScreen';
import { Link, Redirect } from "react-router-dom";
import UserNav from '../../user/navbar/UserNav';
import axios from "axios";
import Pagination from '../../utilities/Pagination';
import Footer from '../../home/Footer';


export class HistoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            join: "",
            type: 1,
            showIklan: false,
            showProfileFunc: false,
            showMenu: false,
            verifyEmail: false,
            verifyPhone: false,
            totalUsers: 0,
            loadingScreen: true,
            kostList: "",
            paginateData: null,
            getLink: "/api/guest-latest-views",
            id: "",
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        await getProfile().then(res => {
            console.log(res);
            this.setState({
                name: res.user.name,
                email: res.user.email,
                join: res.user.created_at,
                pictureID: res.user.picture_id,
                type: res.user.type,
                id: res.user.id
            });
        });
    }

    authorizeUser = () => {
        if (this.state.type !== 1) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };


    render() {
        return (
            <React.Fragment>
                {this.authorizeUser()}
                <UserNav />
                <h1 style={{ textAlign: "center", fontSize: "50px" }}>History</h1>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link style={{ fontSize: "40px" }} className="link-styles" to="/view-history/latest-views">Latest Views</Link>
                    <Link className="link-styles"  style={{ fontSize: "40px" }} to="/view-history/favourite">Favourite</Link>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default HistoryPage
