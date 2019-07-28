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
            latlng: [],
            displayModal: false,
            displayModal1: false,
            reviewContent: "",
            reviewLists: [],
            report: "",
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
            })
        });
        const fdd = new FormData();
        fdd.append("property", this.state.currKost["id"]);
        await Axios.post("/api/show-review", fdd).then(res => {
            console.log(res);
            this.setState({
                reviewLists: res.data,
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

    deleteKosan = () => {
        this.setState({ displayModal: true });
    }

    closeModal = () => {
        this.setState({ displayModal: false });
    }

    deleteKosan1 = () => {
        this.setState({ displayModal1: true });
    }

    closeModal1 = () => {
        this.setState({ displayModal1: false });
    }

    storeFavouriteData = () => {
        const fd = new FormData();
        fd.append('user_id', this.state.user_id);
        fd.append('property_id', this.state.currKost['id']);
        fd.append('property_type', "Kost");

        Axios.post("/api/guest-favourite", fd).then(res => {
            console.log(res);
        });
    }

    handleReview = (event) => {
        const { name, value } = event.target;
        this.setState({ reviewContent: value });
        console.log(this.state);
    }

    handleReport = (event) => {
        const { name, value } = event.target;
        this.setState({ report: value });
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

    submitReport = () => {
        const fd = new FormData();
        fd.append("description", this.state.report);
        fd.append("property_type", "Kost");
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
                                    <a href={ 'tel:+' +  this.state.currKost['user']['phone'] }>Call Owner</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""}
                <h1 style={{ textAlign: "center", fontSize: "30px" }}>Suggested Kosts</h1>

                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="post-cards">
                            {this.state.suggestKost.map(item =>
                                item["id"] !== null ? (
                                    <div>
                                        <Link to={{
                                            pathname: `/kost/details-${item["properties"]["kost_slug"]}`,
                                            state: {
                                                apart_slug: item["properties"]["kost_slug"]
                                            }
                                        }} key={item["id"]}>
                                            <div className="card-kost post-resp" style={{ width: "200px", height: "500px", overflowY: "auto" }}>
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
                <h1 style={{ textAlign: "center", fontSize: "30px" }}>Reviews</h1>

                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="post-cards">
                            {this.state.reviewLists.map(item =>
                                item["id"] !== null ? (
                                    <div>
                                        <div className="card-kost post-resp" style={{ width: "200px", height: "300px", overflowY: "auto" }}>
                                            <div className="card-kost-container">
                                                <Link to={{
                                                    pathname: `/other-profile/${item["user"]["id"]}`,
                                                    state: item["user"]["id"]
                                                }} key={item["id"]}>
                                                    <h2>User Name: {item["user"]["name"]}</h2>
                                                </Link>
                                                <h4>Review Content: {item["content"]}</h4>
                                            </div>
                                        </div>

                                    </div>
                                ) : (
                                        ""
                                    )
                            )}
                        </div>
                        <Link to={{
                            pathname: `/reviews/${this.state.currKost["id"]}`
                        }}>See More Reviews</Link>
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

export default KostDetail