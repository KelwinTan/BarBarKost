import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import Footer from '../home/Footer';
import { getProfile } from "../user/login-register/UserFunctions";
import LoadingScreen from '../utilities/LoadingScreen';
import { Link, Redirect } from "react-router-dom";
import Axios from 'axios';
import Pagination from '../utilities/Pagination';

export class IncompleteTransactions extends Component {

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
            loadingScreen: true,
            transList: null,
            paginateData: null,
            getLink: "/api/admin-view-incomplete",
            OwnerName: "",
            PremiumName: "",
            PremiumPrice: "",
            PremiumPromo: "",
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        this.setState({ loadingScreen: true })
        getProfile().then(res => {
            console.log(res);
            this.setState({
                name: res.user.name,
                email: res.user.email,
                join: res.user.created_at,
                pictureID: res.user.picture_id,
                type: res.user.type,
            });
        });

        console.log(this.props.history.location.search);
        var pages = this.props.history.location.search;
        await Axios.post(`${this.state.getLink + pages}`).then(res => {
            console.log(res);
            this.setState({
                transList: res.data.data,
                loadingScreen: false,
                paginateData: res.data,
            });
        }
        );


    }

    componentWillReceiveProps(next_props, next_state) {
        console.log(next_props);
        Axios.post(`${this.state.getLink + next_props.location.search}`).then(res => {
            console.log(res);
            this.setState({
                transList: res.data.data,
                loadingScreen: false,
                paginateData: res.data,

            });
        }
        );
    }

    authorizeUser = () => {
        if (this.state.type !== 3) {
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
                <h1 style={{ textAlign: "center", fontSize: "50px" }}>Incomplete Transactions</h1>

                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="property-card property-responsive property-props">
                            {this.state.transList.map(item =>
                                item["id"] !== null ? (
                                    <div>
                                        <Link style={{ padding: "unset" }} to={{
                                            pathname: `/transactions/incomplete/${item['id']}`
                                        }} key={item}>

                                            <div className="card-kost" style={{ width: "400px" }}>
                                                <div className="card-kost-container">
                                                    <h4>Transaction ID: {item["id"]}</h4>
                                                    <div className="card-kost-images">
                                                        <p>OwnerID: {item["owner_id"]}</p>
                                                        <p>Premium ID: {item["premium_id"]}</p>
                                                        <p>Transaction Date At: {item["created_at"]}</p>
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

export default IncompleteTransactions
