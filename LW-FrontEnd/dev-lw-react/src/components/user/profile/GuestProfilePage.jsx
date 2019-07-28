import React, { Component } from 'react'
import { UserNav } from '../navbar/UserNav';
import Footer from '../../home/Footer';
import { getProfile } from "../../user/login-register/UserFunctions";
import LoadingScreen from '../../utilities/LoadingScreen';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Pagination from '../../utilities/Pagination';

export class GuestProfilePage extends Component {
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
            pictureID: "",
            phone: "",
            id: "",
            totalFollowing: 0,
            getLink: "/api/favourite-properties",
            paginateData: null,

        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        await getProfile().then(res => {
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
        const fd = new FormData();
        fd.append('user_id', this.state.id)
        await axios.post("/api/total-following", fd).then(res => {
            console.log(res);
            this.setState({
                totalFollowing: res.data
            });
        }
        );
        const formData = new FormData();
        formData.append("user_id", this.state.id);
        var pages = this.props.history.location.search;
        await axios.post(`${this.state.getLink + pages}`, formData).then(res => {
            console.log(res.data);
            this.setState({
                kostList: res.data.data,
                loadingScreen: false,
                paginateData: res.data
            });
        }
        );
    }
    componentWillReceiveProps(next_props, next_state) {
        this.setState({
            loadingScreen: true
        })
        console.log(next_props);
        const fd = new FormData();
        fd.append('user_id', this.state.id);
        axios.post(`${this.state.getLink + next_props.location.search}`, fd).then(res => {
            console.log(res);
            this.setState({
                kostList: res.data.data,
                loadingScreen: false,
                paginateData: res.data,

            });
        }
        );
    }
    authorizeUser = () => {
        if (this.state.type !== 1) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };
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
                {this.authorizeUser()}
                {this.handleLoading()}
                <UserNav />

                <div className="form-wrapper1" style={{ width: "auto", margin: "50px" }}>
                    <h1>Personal Data</h1>
                    <div className="data-pribadi-data">
                        <img src={`http://localhost:8000/storage/${this.state.pictureID}`} alt="Picture 360" style={{ width: "300px" }} />
                    </div>
                    <p>Name: {this.state.name}</p>
                    <p>Email: {this.state.email}</p>
                    <p>Phone Number: {this.state.phone}</p>
                    <p>Total Following: {this.state.totalFollowing}</p>
                    <p>Joined At: {this.state.join}</p>


                    <Link className="link-styles" style={{ border: "3px solid green" }} to="/guest-update">Update Profile</Link>
                    
                </div>
                {!this.state.loadingScreen
                    ?
                    <div className="property-card property-responsive property-props">
                        {this.state.kostList.map(item =>
                            item["id"] !== null ? (
                                item["properties"] !== null ? (
                                    <Link to={{
                                        pathname: `/kost/detail-${item["properties"]["kost_slug"]}`,
                                        state: {
                                            apart_slug: item["properties"]["kost_slug"]
                                        }
                                    }} key={item}>
                                        <div className="card-kost" style={{ width: "400px" }}>
                                            <div className="card-kost-container">
                                                <img src={`http://localhost:8000/storage/${item["properties"]['banner_picture']}`} alt="Banner" />
                                                <h4>Kost Name: {item["properties"]["name"]}</h4>
                                                <div className="card-kost-images">
                                                    <p>Kost City: {item["properties"]["city"]}</p>
                                                    <p>Kost Prices: Rp. {item["properties"]["prices"]}</p>

                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                ) : <Link to={{
                                    pathname: `/apart/detail-${item["apartments"]["slug"]}`,
                                    state: {
                                        apart_slug: item["apartments"]["slug"]
                                    }
                                }} key={item}>
                                        <div className="card-kost" style={{ width: "400px" }}>
                                            <div className="card-kost-container">
                                                <img src={`http://localhost:8000/storage/${item["apartments"]['banner_picture']}`} alt="Banner" />

                                                <h4>Apartment Name: {item["apartments"]["name"]}</h4>
                                                <div className="card-kost-images">
                                                    <p>Apartment City: {item["apartments"]["city"]}</p>
                                                    <p>Apartment Prices: Rp. {item["apartments"]["prices"]}</p>

                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                            ) : (
                                    ""
                                )
                        )}
                        <div style={{ position: "fixed", bottom: "10%", left: "50%", background: "white", border: "30px solid white" }}>
                            <Pagination pages={this.state.paginateData} />
                        </div>
                    </div>
                    : null}
                <Footer />
            </React.Fragment >
        )
    }
}

export default GuestProfilePage
