import React, { Component } from 'react'
import { getProfile } from "../../user/login-register/UserFunctions";
import LoadingScreen from '../../utilities/LoadingScreen';
import { Link, Redirect } from "react-router-dom";
import UserNav from '../../user/navbar/UserNav';
import axios from "axios";
import Pagination from '../../utilities/Pagination';
import Footer from '../../home/Footer';

export class LatestViews extends Component {
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
        const fd = new FormData();
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
        fd.append('user_id', this.state.id);
        var pages = this.props.history.location.search;
        await axios.post(`${this.state.getLink + pages}`, fd).then(res => {
            console.log(res.data);
            this.setState({
                kostList: res.data.data,
                loadingScreen: false,
                paginateData: res.data

            });
        }
        );
    }

    authorizeUser = () => {
        if (this.state.type !== 1) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };

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



    render() {
        return (
            <React.Fragment>
                {this.authorizeUser()}
                {this.handleLoading()}

                <UserNav />
                <h1 style={{ textAlign: "center", fontSize: "50px" }}>Latest Views</h1>

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
            </React.Fragment>
        )
    }
}


export default LatestViews
