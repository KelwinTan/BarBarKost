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
            getLink: "/api/get-owner-apart",
            apartNameFilter: "",
            apartPriceFilter: "",
            apartAreaFilter: "",
            apartFloorFilter: "",

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

    handleApartName = (event) => {
        const { name, value } = event.target;
        this.setState({ apartNameFilter: value });
        console.log(this.state);
    }

    handleApartPrice = (event) => {
        const { name, value } = event.target;
        this.setState({ apartPriceFilter: value });
        console.log(this.state);
    }

    handleApartArea = (event) => {
        const { name, value } = event.target;
        this.setState({ apartAreaFilter: value });
        console.log(this.state);
    }

    handleApartFloor = (event) => {
        const { name, value } = event.target;
        this.setState({ apartFloorFilter: value });
        console.log(this.state);
    }

    filterApart = () => {
        const fd = new FormData();
        fd.append('name', this.state.apartNameFilter);
        fd.append('prices', this.state.apartPriceFilter);
        fd.append('unit_floor', this.state.apartFloorFilter);
        fd.append('unit_area', this.state.apartAreaFilter);
        fd.append('owner_id', this.state.owner_id);
        this.setState({
            loadingScreen: true
        })

        Axios.post("/api/owner-filter-apartment", fd).then(
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

    render() {
        return (
            <React.Fragment>
                <UserNav />
                <div className="owner-data-kost">
                    <h1>Manage Apartments</h1>
                    <div className="owner-data-kost" style={{ textAlign: "center" }}>
                        <input type="text" onChange={this.handleApartName} placeholder="Input Apartment Name" />

                        <input type="number" onChange={this.handleApartPrice} placeholder="Input Apartment Price" />

                        <input type="number" placeholder="Input Apartment Area" onChange={this.handleApartArea} />

                        <input type="number" placeholder="Input Apartment Floor" onChange={this.handleApartFloor} />

                        <button onClick={this.filterApart} className="filter-button">Search Apartment</button>
                    </div>
                    <hr />
                </div>
                {this.handleLoading()}
                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="post-cards">
                            {this.state.apartList.map(item =>
                                item["id"] !== null ? (
                                    <Link to={{
                                        pathname: `/apart-${item['slug']}`,
                                        state: {
                                            apart_slug: item['slug']
                                        }
                                    }} key={item["id"]}>
                                        <div className="card-kost post-resp" style={{ height: "470px", width: "300px" }}>
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

export default DataApart
