import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import Footer from '../home/Footer';
import Axios from 'axios';

export class IncompleteData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            join: "",
            type: 3,
            showIklan: false,
            showProfileFunc: false,
            showMenu: false,
            verifyEmail: false,
            verifyPhone: false,
            totalUsers: 0,
            loadingScreen: true,
            userList: "",
            username: "",
            phone: "",
            currUser: null,
            userSlug: "",
            displayReset: false,
            transID: "",
            isVerified: false,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ transID: id });
        console.log(id);
        const PostData = new FormData();
        PostData.append('id', id);
        Axios.post("/api/admin-get-trans", PostData).then(
            res => {
                console.log(res);
                this.setState({ loadingScreen: false, currUser: res.data });
            }
        )
    }

    verifyTrans = () => {
        this.setState({ loadingScreen: true });
        const PostData = new FormData();
        PostData.append('id', this.state.transID);
        Axios.post("/api/admin-verify-transaction", PostData).then(
            res => {
                console.log(res);
                this.setState({ loadingScreen: false, isVerified: true });
            }
        ).catch(err => {
            console.log(err.response);
        })
    }

    render() {
        return (
            <React.Fragment>
                <UserNav />
                <div>
                    {!this.state.loadingScreen
                        ?
                        <div className="property-card property-responsive property-props">
                            <div className="card-kost">
                                <div className="card-kost-container">
                                    <h4>Transaction ID: {this.state.currUser['transactions']['id']}</h4>
                                    <div className="card-kost-images">
                                        <p>Premium Name: {this.state.currUser['premium']['premium_name']}</p>
                                        <p>Premium Price: {this.state.currUser['premium']['premium_price']}</p>
                                        <p>E-Mail: {this.state.currUser['user']['name']}</p>
                                        <p>Phone: {this.state.currUser['user']['phone']}</p>
                                        <button style={{ display: this.state.currUser['transactions']['start_date'] !== null ? "none" : "" }} onClick={this.verifyTrans}>Verify Transaction</button>
                                        {this.state.currUser['transactions']['start_date'] !== null ? <p style={{ color: "red" }}>Verified</p> : <p style={{ color: "red" }}>Please Verify</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default IncompleteData
