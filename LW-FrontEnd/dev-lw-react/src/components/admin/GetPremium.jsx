import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import { Link } from "react-router-dom";
import LoadingScreen from '../utilities/LoadingScreen';
import axios from "axios";
import Pagination from '../utilities/Pagination';
import { withRouter } from "react-router-dom";

export class GetPremium extends Component {

    constructor(props) {
        super(props);
        this.state = {
            premiumList: null,
            loadingScreen: true,
            paginateData: null,
            getLink: "/api/show-premium",
            premiumPriceFilter: 0,
            premiumNameFilter: "",
        }
    }

    async componentDidMount() {
        console.log(this.props.history.location.search);
        var pages = this.props.history.location.search;
        await axios.post(`${this.state.getLink + pages}`).then(res => {
            console.log(res);
            this.setState({
                premiumList: res.data.data,
                loadingScreen: false,
                paginateData: res.data,
            });
        }
        );
    }

    componentWillReceiveProps(next_props, next_state) {
        console.log(next_props);
        axios.post(`${this.state.getLink + next_props.location.search}`).then(res => {
            console.log(res);
            this.setState({
                premiumList: res.data.data,
                loadingScreen: false,
                paginateData: res.data,

            });
        }
        );
    }

    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };

    filterPremium = () => {
        const fd = new FormData();
        fd.append('premium_name', this.state.premiumNameFilter);
        fd.append('price', this.state.premiumPriceFilter);
        this.setState({
            loadingScreen: true
        })
        axios.post("/api/filter-premium", fd).then(res => {
            console.log(res);
            this.setState({
                premiumList: res.data.data,
                loadingScreen: false,
                paginateData: res.data,
            });
        }
        );
    }

    handlePremiumName = (event) => {
        const { name, value } = event.target;
        this.setState({ premiumNameFilter: value });
        console.log(this.state);
    }

    handlePremiumPrice = (event) => {
        const { name, value } = event.target;
        this.setState({ premiumPriceFilter: value });
        console.log(this.state);
    }

    render() {
        return (
            <React.Fragment>
                {this.handleLoading()}
                <div style={{ textAlign: "center" }}>
                    <input type="text" onChange={this.handlePremiumName} placeholder="Input Premium Name" />
                    <input type="number" onChange={this.handlePremiumPrice} placeholder="Input Premium Price" />

                    <button onClick={this.filterPremium} className="filter-button">Filter Premium</button>
                </div>
                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="post-cards">
                            {this.state.premiumList.map(item =>
                                item["id"] !== null ? (
                                    <div>
                                        <Link style={{ padding: "unset" }} to={{
                                            pathname: `/premium/${item['slug']}`
                                        }} key={item["id"]}>
                                            <div className="card-kost post-resp" style={{ height: "auto", width: "300px" }}>
                                                <div className="card-kost-container">
                                                    <h4>Premium Name: {item["premium_name"]}</h4>
                                                    <div className="card-kost-images">
                                                        <p>Premium Price: {item["premium_price"]}</p>
                                                        <p>Premium Promo: {item["promo"]}</p>

                                                        <p>Premium Created At: {item["created_at"]}</p>
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

            </React.Fragment>
        )
    }
}

export default withRouter(GetPremium)
