import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import Axios from 'axios';
import styled from "styled-components";
import { getProfile } from "../user/login-register/UserFunctions";
import { Link, Redirect } from "react-router-dom";
import Footer from '../home/Footer';
import LoadingScreen from '../utilities/LoadingScreen';


export class ReportPage extends Component {
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
            type: 3,
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
            });
        });
        console.log(this.props);

        // const { handle } = this.props.match.params.id;
        const slug = this.props.match.params.id;
        this.setState({ currSlug: slug });
        // console.log(this.props.match.params.id);
        const PostData = new FormData();
        PostData.append('id', slug);
        const config = {
            header: {
                "content-type": "multipart/form-data"
            }
        }
        Axios.post("/api/show-specific-report", PostData, config).then(res => {
            console.log(res.data);
            this.setState({
                currPremium: res.data,
                loadingScreen: false,

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
    authorizeUser = () => {
        if (this.state.type !== 3) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };

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
                                                <h5>Report ID: {item["id"]}</h5>

                                                <div id="post-content">
                                                </div>
                                                <h5>User ID: {item["user_id"]}</h5>
                                                <h5>Report Type: {item["report_type"]}</h5>
                                                <h5>Property ID: {item["property_id"]}</h5>

                                                <h5>Property Type: {item["property_type"]}</h5>
                                                <h5>Report Submitted At: {item["created_at"]}</h5>
                                                <h5>Report Description: {item["description"]}</h5>

                                                <hr />
                                                <Link to="/manage-report" key={item} className="link-styles">Back to Manage Reports</Link>
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
                <Footer />
            </React.Fragment>
        )
    }
}

export default ReportPage
