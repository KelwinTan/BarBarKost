import React, { Component } from 'react'
import UserNav from '../user/navbar/UserNav';
import { Link, Redirect, withRouter } from "react-router-dom";
import { getProfile } from "../user/login-register/UserFunctions";
import { getTotalUsers } from "./AdminFunctions";
import UserForm from '../user/UserForm';
import TextEditor from './TextEditor';
import Footer from '../home/Footer';
import axios from "axios";
import LoadingScreen from '../utilities/LoadingScreen';
import GetPost from './GetPost';
import Pagination from '../utilities/Pagination';

export class ManageReport extends Component {

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
            formErrors: {
                title: "",
                content: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
            loadingScreen: true,
            visibility: "",
            title: "",
            content: "",
            postImage: null,
            tags: "",
            paginateData: null,
            getLink: "/api/get-guest-report",
            reportList: "",
            reportType: "",
            reportDate: "",

        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }


    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };

    async componentDidMount() {
        getProfile().then(res => {
            console.log(res);
            this.setState({
                name: res.user.name,
                email: res.user.email,
                join: res.user.created_at,
                pictureID: res.user.picture_id,
                type: res.user.type
            });
        });
        getTotalUsers().then(
            res => {
                console.log(res);
                this.setState({ totalUsers: res });
            }
        )
        console.log(this.props.history.location.search);
        var pages = this.props.history.location.search;
        await axios.post(`${this.state.getLink + pages}`).then(res => {
            console.log(res);
            this.setState({
                reportList: res.data.data,
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
                reportList: res.data.data,
                loadingScreen: false,
                paginateData: res.data,

            });
        }
        );
    }

    authorizeUser = () => {
        if (this.state.type !== 3) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };

    handleType = (event) => {
        const { name, value } = event.target;
        this.setState({ reportType: value });
        console.log(this.state);
    }

    handleReportDate = (event) => {
        const { name, value } = event.target;
        this.setState({ reportDate: value });
        console.log(this.state);
    }

    filterReport = () => {
        const fd = new FormData();
        fd.append('type', this.state.reportType);
        fd.append('date', this.state.reportDate);
        this.setState({
            loadingScreen: true
        });
        axios.post("/api/filter-report", fd).then(res => {
            console.log(res);
            this.setState({
                reportList: res.data.data,
                loadingScreen: false,
                paginateData: res.data,
            });
        }
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.authorizeUser()}
                {this.handleLoading()}
                <UserNav />
                <h1 style={{ textAlign: "center", fontSize: "50px" }}>Manage Report</h1>
                <div style={{ textAlign: "center" }}>
                    <input type="date" onChange={this.handleReportDate} />
                    <select
                        id="visibility-type"
                        onChange={this.handleType}
                    >
                        <option value="Fasilitas">Facility</option>
                        <option value="Price">Price</option>
                    </select>
                    <button onClick={this.filterReport} className="filter-button">Filter Report</button>
                </div>
                <hr />
                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="post-cards">
                            {this.state.reportList.map(item =>
                                item["id"] !== null ? (
                                    <div>
                                        <Link style={{ padding: "unset" }} to={{
                                            pathname: `/report/${item['id']}`
                                        }} key={item["id"]}>
                                            <div className="card-kost post-resp" style={{ height: "auto", width: "300px" }}>
                                                <div className="card-kost-container">
                                                    <h4>Report Type: {item["report_type"]}</h4>
                                                    <div className="card-kost-images">
                                                        <p>Report Property Type: {item["property_type"]}</p>
                                                        <p>Report Submitted At: {item["created_at"]}</p>
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

export default withRouter(ManageReport)
