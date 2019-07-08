import React, { Component } from 'react'
import axios from "axios";
import UserNav from '../user/navbar/UserNav';
import { Link } from "react-router-dom";
import LoadingScreen from '../utilities/LoadingScreen';
import Pagination from '../utilities/Pagination';
import { withRouter } from "react-router-dom";
import Footer from '../home/Footer';

export class ManageTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: null,
            loadingScreen: true,
            paginateData: null,
            getLink: "/api/admin-view-incomplete"
        }
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
                <UserNav />
                <div style={{ textAlign: "center" }}>
                    <h1 style={{ textAlign: "center", fontSize: "60px" }}>
                        Manage Transaction
                </h1>
                    <Link className="link-styles" to="/incomplete-transactions">View Incomplete Transactions</Link>
                    <Link className="link-styles" to="/complete-transactions">View Complete Transactions</Link>
                </div>

                <Footer />
            </React.Fragment>
        )
    }
}

export default ManageTransaction
