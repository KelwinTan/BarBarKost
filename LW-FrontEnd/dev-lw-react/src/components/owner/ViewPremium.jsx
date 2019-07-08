import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import { Link } from "react-router-dom";
import LoadingScreen from '../utilities/LoadingScreen';
import axios from "axios";
import Pagination from '../utilities/Pagination';
import { withRouter } from "react-router-dom";
import Footer from '../home/Footer';

export class ViewPremium extends Component {

    constructor(props) {
        super(props);
        this.state = {
            premiumList: null,
            loadingScreen: true,
            paginateData: null,
            getLink: "/api/show-premium"
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


    render() {
        return (
            <React.Fragment>
                {this.handleLoading()}
                <UserNav />
                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="property-card property-responsive property-props">
                            {this.state.premiumList.map(item =>
                                item["id"] !== null ? (
                                    <div>
                                        <Link to={{
                                            pathname: `/buy-premium/${item['slug']}`
                                        }} key={item} style={{ padding: "unset" }}>
                                            <div className="card-kost" style={{ width: "200px" }}>
                                                <div className="card-kost-container">
                                                    <h4>Premium Name: {item["premium_name"]}</h4>
                                                    <div className="card-kost-images">
                                                        <p>Premium Price: {item["premium_price"]}</p>
                                                        <p>Premium Promo: {item["promo"]}</p>

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

export default withRouter(ViewPremium)