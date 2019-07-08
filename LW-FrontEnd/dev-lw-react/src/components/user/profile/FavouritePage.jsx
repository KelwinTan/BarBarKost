import React, { Component } from 'react'
import { UserNav } from '../navbar/UserNav';
import Footer from '../../home/Footer';
import { Link, Redirect } from "react-router-dom";
import { getProfile } from "../../user/login-register/UserFunctions";
import LoadingScreen from '../../utilities/LoadingScreen';

export class FavouritePage extends Component {

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
    
    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };

    async componentDidMount() {
        await getProfile().then(res => {
            console.log(res);
            this.setState({
                name: res.user.name,
                email: res.user.email,
                join: res.user.created_at,
                pictureID: res.user.picture_id,
                type: res.user.type,
                id: res.user.id,
                loadingScreen: false
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
                {this.handleLoading()}

                <UserNav />
                <h1 style={{ textAlign: "center", fontSize: "50px" }}>Favourite Properties</h1>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link style={{ fontSize: "40px" }} className="link-styles" to="/view-history/favourite/kost">Favourite Kost</Link>
                    <Link className="link-styles" style={{ fontSize: "40px" }} to="/view-history/favourite/apartment">Favourite Apartment</Link>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default FavouritePage
