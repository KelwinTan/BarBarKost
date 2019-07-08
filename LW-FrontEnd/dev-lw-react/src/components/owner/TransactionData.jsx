import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import Footer from '../home/Footer';
import Axios from 'axios';

export class TransactionData extends Component {
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
                                        <p>E-Mail: {this.state.currUser['user']['email']}</p>
                                        <p>Phone: {this.state.currUser['user']['phone']}</p>

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

export default TransactionData
