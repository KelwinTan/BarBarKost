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

const BgModal = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  align-items: center;
  z-index:100000;
`;

const ModalContent = styled.div`
  width: 500px;
  height: 350px;
  background-color: white;
  border-radius: 5px;
  position: relative;
  text-align: center;
  padding: 20px;
`;

const Close = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 42px;
  color: #333;
  transform: rotate(45deg);
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

const Content = styled.div`
  margin: 15px auto;
  display: block;
  width: 50%;
  padding: 8px;
  margin-top: 20px;
  border: 1px solid gray;
  color: red;
`;

export class ApartDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: "",
            currApart: null,
            loadingScreen: true,
            displayModal: false,
            displayModal1: false,

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
    deleteKosan1 = () => {
        this.setState({ displayModal1: true });
    }

    closeModal1 = () => {
        this.setState({ displayModal1: false });
    }
    submitReport = () => {
        const fd = new FormData();
        fd.append("description", this.state.report);
        fd.append("property_type", "Apartment");
        fd.append("report_type", this.state.report);

        fd.append("user_id", this.state.user_id);
        fd.append("property_id", this.state.currKost['id']);
        this.setState({ loadingScreen: true })
        Axios.post("/api/guest-report", fd).then(res => {
            console.log(res);
            this.setState({ loadingScreen: false })
        })
    }

    reportProperty = () => {
        this.setState({ displayModal1: true });
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
    deleteKosan = () => {
        this.setState({ displayModal: true });
    }

    closeModal = () => {
        this.setState({ displayModal: false });
    }

    handleReview = (event) => {
        const { name, value } = event.target;
        this.setState({ reviewContent: value });
        console.log(this.state);
    }

    submitReview = () => {
        const fd = new FormData();
        fd.append("review_content", this.state.reviewContent);
        fd.append("user_id", this.state.user_id);
        fd.append("property_id", this.state.currKost['id']);
        this.setState({ loadingScreen: true })
        Axios.post("/api/create-review", fd).then(res => {
            console.log(res);
            this.setState({ loadingScreen: false })
        })
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
                <div style={{ textAlign: "center", display: this.state.type === 1 ? "" : "none" }}>
                    <button onClick={this.reportProperty}>Report this Property</button>
                    {this.state.displayModal1 ?
                        <BgModal>
                            <ModalContent>
                                <Close onClick={this.closeModal1}>+</Close>
                                <img src={logo} style={{ height: "200px" }} alt="logo" />
                                <Content>Report Property</Content>
                                <select
                                    id="kost-type"
                                    name="kostType"
                                    onChange={this.handleReport}
                                >
                                    <option value="Facility">Facility Gak sesuai</option>
                                    <option value="Foto">Foto tidak sesuai</option>
                                    <option value="Kotor">Kotor</option>
                                </select>
                                <button onClick={this.submitReport}>Submit Report</button>
                            </ModalContent>
                        </BgModal> : ""
                    }
                </div>
                <div style={{ textAlign: "center", display: this.state.type === 3 ? "" : "none" }}>
                    <button onClick={this.reportProperty}>Ban this Property</button>
                </div>
                <div style={{ textAlign: "center" }}>
                    <button onClick={this.deleteKosan}>Add Review</button>
                    {this.state.displayModal ?
                        <BgModal>
                            <ModalContent>
                                <Close onClick={this.closeModal}>+</Close>
                                <img src={logo} style={{ height: "200px" }} alt="logo" />
                                <Content>Review Kosan</Content>
                                <input type="text" placeholder="Input Review Content" onClick={this.handleReview} />
                                <button onClick={this.submitReview}>Submit Review</button>
                            </ModalContent>
                        </BgModal> : ""}
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default ApartDetail
