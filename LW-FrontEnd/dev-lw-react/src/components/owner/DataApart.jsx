import React, { Component } from 'react'
import "./Owner.scss"
import { getProfile } from "../user/login-register/UserFunctions";
import { GetOwnerKosts } from "./OwnerFunctions";
import LoadingScreen from '../utilities/LoadingScreen';
import { Link } from "react-router-dom";
import UserNav from '../user/navbar/UserNav';
import Footer from '../home/Footer';
import Axios from 'axios';
import Pagination from '../utilities/Pagination';

export class DataApart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartList: null,
            owner_id: "",
            loadingScreen: true,
            paginateData: null,
            getLink: "/api/get-owner-apart"

        }

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
            this.setState({
                owner_id: res.user.id,
            });

        });
        const ApartFormData = new FormData();
        ApartFormData.append('owner_id', this.state.owner_id);
        var pages = this.props.history.location.search;

        Axios.post(`${this.state.getLink + pages}`, ApartFormData).then(
            res => {
                console.log(res);
                this.setState({
                    apartList: res.data.data,
                    loadingScreen: false,
                    paginateData: res.data

                })
            }
        ).catch(err => {
            console.log(err.response);
        })

    }
    componentWillReceiveProps(next_props, next_state) {
        console.log(next_props);
        const ApartFormData = new FormData();
        ApartFormData.append('owner_id', this.state.owner_id);
        Axios.post(`${this.state.getLink + next_props.location.search}`, ApartFormData).then(res => {
            console.log(res);
            this.setState({
                apartList: res.data.data,
                loadingScreen: false,
                paginateData: res.data,

            });
        }
        );
    }
    render() {
        return (
            <React.Fragment>
                <UserNav />
                <div className="owner-data-kost">
                    <h1>Manage Apartments</h1>
                    <hr />
                </div>
                {this.handleLoading()}
                {!this.state.loadingScreen
                    ?
                    <div className="property-card property-responsive property-props">
                        {this.state.apartList.map(item =>
                            item["id"] !== null ? (
                                <Link to={{
                                    pathname: `/apart-${item['slug']}`,
                                    state: {
                                        apart_slug: item['slug']
                                    }
                                }} key={item}>
                                    <div className="card-kost" style={{ width: "400px" }}>
                                        <div className="card-kost-container">
                                            <img src={`http://localhost:8000/storage/${item["banner_picture"]}`} alt="Banner" />
                                            <h4>Apartment Name: {item["name"]}</h4>
                                            <div className="card-kost-images">
                                                <p>Apart Address: {item["address"]}</p>
                                                <p>Apart City: {item["city"]}</p>
                                                <p>Apart Prices: {item["prices"]}</p>
                                                <p>Apart Slug: {item["slug"]}</p>

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

export default DataApart
