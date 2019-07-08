import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import Footer from '../home/Footer';
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { getProfile } from "../user/login-register/UserFunctions";
import LoadingScreen from '../utilities/LoadingScreen';

export class CheckoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post_ids: "",
            currPremium: null,
            loadingScreen: true,
            currSlug: "",
            displayModal: "",
            name: "",
            email: "",
            join: "",
            type: 2,
            id: "",
            errors: []
        }
    }


    async componentDidMount() {
        getProfile().then(res => {
            console.log(res);
            this.setState({
                name: res.user.name,
                email: res.user.email,
                join: res.user.created_at,
                pictureID: res.user.picture_id,
                type: res.user.type,
                id: res.user.id
            });
        });
        console.log(this.props);

        // const { handle } = this.props.match.params.id;
        const slug = this.props.match.params.id;
        this.setState({ currSlug: slug });
        // console.log(this.props.match.params.id);
        const PostData = new FormData();
        PostData.append('slug', slug);
        const config = {
            header: {
                "content-type": "multipart/form-data"
            }
        }
        axios.post("/api/get-specific-premium", PostData, config).then(res => {
            console.log(res);
            this.setState({
                currPremium: res.data,
                loadingScreen: false,

            });
            console.log(this.state.currPremium[0]['id']);
        }
        );

    }

    authorizeUser = () => {
        if (this.state.type !== 2) {
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

    handleTransaction = () => {

        const fd = new FormData();
        fd.append('premium_id', this.state.currPremium[0]['id']);
        fd.append('owner_id', this.state.id);

        axios.post("/api/create-transaction", fd).then(
            res => {
                console.log(res);
            }
        ).catch(err => {
            console.log(err.response);
            this.setState({
                errors: err.response.data
            });
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.authorizeUser()}
                {this.handleLoading()}

                <UserNav />
                <div>
                    {!this.state.loadingScreen
                        ?
                        <div>
                            {this.state.currPremium.map(item =>
                                item["id"] !== null ? (
                                    <div className="kost-data-layout">
                                        <div className="input-data-lokasi">
                                            <div className="input-data-form">
                                                <h5>Premium Name: {item["premium_name"]}</h5>

                                                <div id="post-content">
                                                </div>
                                                <h5>Premium Price: {item["premium_price"]}</h5>
                                                <h5>Premium Duration: {item["duration"]} days</h5>
                                                <h5>Premium Promo: {item["promo"]}</h5>
                                                <hr />
                                                <p style={{ color: "red" }}>
                                                    {this.state.errors}

                                                </p>
                                                <button onClick={this.handleTransaction}>Buy Premium Product</button>
                                                <Link to="/view-premium" key={item} className="link-styles">Go Back</Link>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                        ""
                                    )
                            )}
                        </div>
                        : null}
                </div>

            </React.Fragment>
        )
    }
}

export default CheckoutPage
