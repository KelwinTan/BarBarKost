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


export class ApartDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: "",
            currApart: null,
            loadingScreen: true,
            displayModal: false,
            user_id: "",
            type: 1,
            suggestApart: null
        }
    }

    async componentDidMount() {
        const { apart_slug } = this.props.location.state;
        console.log(this.props.location.state);
        const fd = new FormData();
        fd.append('slug', apart_slug);
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
        fd.append('user_id', this.state.user_id);
        console.log(fd);
        await Axios.post("/api/owner-get-specific-apartment", fd).then(res => {
            console.log(res);
            this.setState({
                currApart: res.data,
            });
            console.log(this.state.currApart[0]['name'])
        });
        const pd = new FormData();
        pd.append("user_id", this.state.user_id);
        await Axios.post("/api/suggest-apart", pd).then(res => {
            console.log(res);
            this.setState({
                suggestApart: res.data,
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
        fd.append('property_id', this.state.currApart[0]['id']);
        fd.append('property_type', "Apartment");

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
                    <div className="property-card property-responsive property-props">
                        <div className="card-kost">
                            <div className="card-kost-container">
                                <img src={`http://localhost:8000/storage/${this.state.currApart[0]['banner_picture']}`} alt="Banner" />
                                <h4>Apart Name: {this.state.currApart[0]['name']}</h4>
                                <div className="card-kost-images">
                                    <p>Apart Address: {this.state.currApart[0]['address']}</p>
                                    <p>Apart City: {this.state.currApart[0]['city']}</p>
                                    <p>Apart Prices: {this.state.currApart[0]['prices']}</p>
                                    <p>Apart Description: {this.state.currApart[0]['description']}</p>
                                    <p>Apart Unit Type: {this.state.currApart[0]['unit_type']}</p>
                                    <p>Apart Unit Condition: {this.state.currApart[0]['unit_condition']}</p>
                                    <button onClick={this.storeFavouriteData} style={{ display: this.state.type === 1 ? "" : "none" }}>Favourite</button>
                                    <a href="tel:+`${this.state.currApart[0]['user']['phone']}`">Call Owner</a>

                                </div>
                            </div>
                        </div>
                    </div>

                    : ""}

                <h1 style={{ textAlign: "center", fontSize: "30px" }}>Suggested Apartments</h1>

                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="property-card property-responsive property-props">
                            {this.state.suggestApart.map(item =>
                                item["id"] !== null ? (
                                    <div>
                                        <Link to={{
                                            pathname: `/apart/detail-${item["apartments"]["slug"]}`,
                                            state: {
                                                apart_slug: item["apartments"]["slug"]
                                            }
                                        }} key={item}>
                                            <div className="card-kost" style={{ width: "200px", height: "450px" }}>
                                                <div className="card-kost-container">
                                                    <img src={`http://localhost:8000/storage/${item["apartments"]['banner_picture']}`} />
                                                    <h4>Apartment Name: {item["apartments"]["name"]}</h4>
                                                    <div className="card-kost-images">
                                                        <p>Apartment Address: {item["apartments"]["address"]}</p>
                                                        <p>Apartment City: {item["apartments"]["city"]}</p>
                                                        <p>Apartment Prices: Rp. {item["apartments"]["prices"]}</p>

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

export default ApartDetail
