import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import UserNav from '../user/navbar/UserNav';
import MyLeaflet from '../map/MyLeaflet';
import ModalBox from '../ModalBox';
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import PropertySlider from '../property/PropertySlider';
import { GetImages } from '../property/PropertyFunctions';
import Axios from 'axios';
import LoadingScreen from '../utilities/LoadingScreen';
import Footer from './Footer';
import { getProfile } from "../user/login-register/UserFunctions";
import { RSA_NO_PADDING } from 'constants';
import DetailLeaflet from '../map/DetailLeaflet';

export class KostDetail extends Component {
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
            latlng: []
        }
    }

    async componentDidMount() {
        const { apart_slug } = this.props.location.state;
        console.log(this.props.location.state);
        const fd = new FormData();
        fd.append('kost_slug', apart_slug);
        await getProfile().then(res => {
            console.log(res);
            this.setState({
                name: res.user.name,
                email: res.user.email,
                join: res.user.created_at,
                pictureID: res.user.picture_id,
                type: res.user.type,
                user_id: res.user.id
            });
        });
        console.log(this.state.user_id);
        await Axios
            .post(
                "/api/specific-kost",
                {
                    kost_slug: apart_slug,
                    user_id: this.state.user_id
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            )
            .then(res => {
                console.log(res);
                this.setState({
                    currKost: res.data,
                });
            })
            .catch(err => {
                console.log(err);
            });
        await GetImages(this.state.currKost['id']).then(res => {
            console.log(res);
            this.setState({
                kost_images: res,
            })
        }
        )
        console.log(this.state.currKost['id']);
        // this.setState({latlng[""]})
        const pd = new FormData();
        pd.append("user_id", this.state.user_id);
        await Axios.post("/api/suggest-kost", pd).then(res => {
            console.log(res);
            this.setState({
                suggestKost: res.data,
                loadingScreen: false
            })
        });
    }

    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };

    storeFavouriteData = () => {
        const fd = new FormData();
        fd.append('user_id', this.state.user_id);
        fd.append('property_id', this.state.currKost['id']);
        fd.append('property_type', "Kost");

        Axios.post("/api/guest-favourite", fd).then(res => {
            console.log(res);
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.handleLoading()}
                <UserNav />
                {!this.state.loadingScreen
                    ?
                    // <p>Apartment Name: {this.state.currApart.data[0]['name']}</p>
                    <div className="property-card property-responsive property-props" style={{ flexDirection: "column", alignItems: "center" }}>

                        <div style={{ border: "3px solid black", padding: "20px" }}>
                            {this.state.kost_images.map(item =>
                                item["id"] !== null ? (<img
                                    src={`http://localhost:8000/storage/images/${item['filename']}`}
                                    alt="Promo Slides"
                                    style={{ height: "250px", zIndex: "-1" }}
                                />) : (""))}

                        </div>
                        <div>
                            <h4 style={{ fontSize: "40px" }}>Kost Name: {this.state.currKost['name']}</h4>
                        </div>
                        {/* {this.state.kost_images === null ? <div>Hello</div> : <PropertySlider count={this.state.kost_images.length} property={this.state.kost_images} />} */}
                        {/* <MyLeaflet /> */}
                        <DetailLeaflet lat={this.state.currKost["latitude"]} lng={this.state.currKost["longitude"]} />
                        <div className="card-kost" style={{ margin: "20px" }}>
                            <div className="card-kost-container kost-details-column">
                                <img src={`http://localhost:8000/storage/${this.state.currKost['banner_picture']}`} alt="Banner" />

                                <div className="card-kost-images">
                                    <p>Kost Address: {this.state.currKost['address']}</p>
                                    <p>Kost City: {this.state.currKost['city']}</p>
                                    <p>Kost Prices: {this.state.currKost['prices']}</p>
                                    <p>Kost Gender: {this.state.currKost['kost_gender']}</p>

                                    <p>Kost Description: {this.state.currKost['description']}</p>
                                    <p>Kost Total Rooms: {this.state.currKost['total_rooms']}</p>
                                    <p>Kost Room Left: {this.state.currKost['room_left']}</p>

                                    <button onClick={this.storeFavouriteData} style={{ display: this.state.type === 1 ? "" : "none" }}>Favourite</button>
                                    <button>Add Review</button>
                                    <a href="tel:+`${this.state.currKost['user']['phone']}`">Call Owner</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""}
                <h1 style={{ textAlign: "center", fontSize: "30px" }}>Suggested Kosts</h1>

                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="property-card  property-props">
                            {this.state.suggestKost.map(item =>
                                item["id"] !== null ? (
                                    <div>
                                        <Link to={{
                                            pathname: `/kost/detail-${item["properties"]["kost_slug"]}`,
                                            state: {
                                                apart_slug: item["properties"]["kost_slug"]
                                            }
                                        }} key={item}>
                                            <div className="card-kost" style={{ width: "200px", height: "500px", overflowY: "auto" }}>
                                                <div className="card-kost-container">
                                                    <img src={`http://localhost:8000/storage/${item["properties"]['banner_picture']}`} />
                                                    <h4>Kost Name: {item["properties"]["name"]}</h4>
                                                    <div className="card-kost-images">
                                                        <p>Kost Address: {item["properties"]["address"]}</p>
                                                        <p>Kost City: {item["properties"]["city"]}</p>
                                                        <p>Kost Prices: Rp. {item["properties"]["prices"]}</p>

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
                    </div>
                    : null}
                <Footer />
            </React.Fragment>
        )
    }
}

export default KostDetail