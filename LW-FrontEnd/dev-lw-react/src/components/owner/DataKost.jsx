import React, { Component } from 'react'
import "./Owner.scss"
import { getProfile } from "../user/login-register/UserFunctions";
import { GetOwnerKosts } from "./OwnerFunctions";
import LoadingScreen from '../utilities/LoadingScreen';
import { Link } from "react-router-dom";
import UserNav from '../user/navbar/UserNav';
import Footer from '../home/Footer';
import axios from "axios";
import Pagination from '../utilities/Pagination';

export class DataKost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kostList: null,
            ownerID: "",
            loadingScreen: true,
            paginateData: null,
            getLink: "/api/owner-kost",
            kostNameFilter: "",
            kostPriceFilter: "",
            kostLeftFilter: "",
            kostDateFilter: "",
        }

    }

    async componentDidMount() {
        await getProfile().then(res => {
            this.setState({
                ownerID: res.user.id,
            });

        });
        const Owner = {
            owner_id: this.state.ownerID
        }
        var pages = this.props.history.location.search;

        await axios.post(`${this.state.getLink + pages}`, {
            owner_id: Owner.owner_id,
        },
            {
                headers: { "Content-Type": "application/json" }
            }).then(res => {
                console.log(res);
                this.setState({
                    kostList: res.data.data,
                    loadingScreen: false,
                    paginateData: res.data
                });
                console.log(this.state.paginateData);
            }
            );
    }

    // await GetOwnerKosts(Owner).then(res => {
    //     console.log(res);
    //     this.setState({

    //         kostList: res.data,
    //         loadingScreen: false
    //     });
    // }
    // // );
    // console.log(this.state.kostList);



    // OwnerGet = () =>{
    //     const Owner = {
    //         owner_email: this.state.ownerEmail
    //     }
    //     GetOwnerKosts(Owner).then( res=>{
    //         this.setState({
    //             kostList: res,
    //             loadingScreen:false
    //         });
    //         }
    //     );
    //     console.log(this.state.kostList);
    // }

    componentWillReceiveProps(next_props, next_state) {
        console.log(next_props);
        const Owner = {
            owner_id: this.state.ownerID
        }
        axios.post(`${this.state.getLink + next_props.location.search}`, {
            owner_id: Owner.owner_id,
        },
            {
                headers: { "Content-Type": "application/json" }
            }).then(res => {
                console.log(res);
                this.setState({
                    kostList: res.data.data,
                    loadingScreen: false,
                    paginateData: res.data,

                });
            }
            );
    }


    handleKostName = (event) => {
        const { name, value } = event.target;
        this.setState({ kostNameFilter: value });
        console.log(this.state);
    }

    handleKostPrice = (event) => {
        const { name, value } = event.target;
        this.setState({ kostPriceFilter: value });
        console.log(this.state);
    }

    handleKostLeft = (event) => {
        const { name, value } = event.target;
        this.setState({ kostLeftFilter: value });
        console.log(this.state);
    }

    handleKostDate = (event) => {
        const { name, value } = event.target;
        this.setState({ kostDateFilter: value });
        console.log(this.state);
    }

    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };

    filterKosts = () => {
        const fd = new FormData();
        fd.append('name', this.state.kostNameFilter);
        fd.append('room_left', this.state.kostLeftFilter);
        fd.append('date', this.state.kostDateFilter);
        fd.append('prices', this.state.kostPriceFilter);

        fd.append('owner_id', this.state.ownerID);

        this.setState({
            loadingScreen: true
        })

        axios.post("/api/owner-filter-kost",fd).then(res => {
                console.log(res);
                this.setState({
                    kostList: res.data.data,
                    loadingScreen: false,
                    paginateData: res.data
                });
                console.log(this.state.paginateData);
            }
            );
    }

    render() {
        return (
            <React.Fragment>
                <UserNav />
                <div className="owner-data-kost" style={{ textAlign: "center" }}>
                    <h1>Manage Rent House</h1>
                    <input type="text" onChange={this.handleKostName} placeholder="Input Kost Name" />
                    <input type="number" onChange={this.handleKostPrice} placeholder="Input Kost Price" />
                    <input type="number" placeholder="Input Room Left" onChange={this.handleKostLeft} />

                    <input type="date" onChange={this.handleKostDate} />
                    <button onClick={this.filterKosts} className="filter-button">Search Kost</button>
                    <hr />
                </div>
                {/* <div>
                <button onClick={this.OwnerGet}>Show Your Kosts</button>
            </div> */}
                {this.handleLoading}
                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="post-cards">
                            {this.state.kostList.map(item =>
                                item["id"] !== null ? (
                                    <Link to={{
                                        pathname: `/kost-${item['kost_slug']}`,
                                        state: {
                                            kost_slug: item['kost_slug']
                                        }
                                    }} key={item}>
                                        <div className="card-kost post-resp" style={{ height: "450px", width: "300px" }}>
                                            <div className="card-kost-container">
                                                <img src={`http://localhost:8000/storage/${item["banner_picture"]}`} alt="Banner" />
                                                <h4>Kost Name: {item["name"]}</h4>
                                                <div className="card-kost-images">
                                                    <p>Kost Address: {item["address"]}</p>
                                                    <p>Kost City: {item["city"]}</p>
                                                    <p>Kost Prices: {item["prices"]}</p>
                                                    <p>Kost Slug: {item["kost_slug"]}</p>
                                                    <p>Room Left: {item["room_left"]}</p>
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

export default DataKost
