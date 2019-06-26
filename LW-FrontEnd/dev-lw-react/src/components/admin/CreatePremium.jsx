import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import { Link, Redirect } from "react-router-dom";
import { getProfile } from "../user/login-register/UserFunctions";
import LoadingScreen from '../utilities/LoadingScreen';
import axios from "axios";

export class CreatePremium extends Component {
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
                premium_name: "",
                premium_price: "",
                duration: "",
                promo: "",
                confirmPassword: ""
            },
            loadingScreen: false,
            visibility: "",
            premium_name: "",
            premium_price: "",
            postImage: null,
            duration: "",
            tags: "",
            promo: "",
            errors: {

            }
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    authorizeUser = () => {
        if (this.state.type !== 3) {
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


    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        // console.log("Name:", name);
        // console.log("Value:", value);

        switch (name) {
            case "premium_name":
                formErrors.premium_name =
                    value.length < 10 && value.length > 0
                        ? "Minimum 10 Characters Required"
                        : "";
                break;
            case "duration":
                formErrors.duration =
                    value > 365
                        ? "Days cannot be greater than 365 days"
                        : "";
                break;
            case "promo":
                formErrors.promo =
                    value > 100
                        ? "Promo cannot be more than 100%"
                        : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };


    componentDidMount() {
        this.setState({ loadingScreen: true })
        getProfile().then(res => {
            console.log(res);
            this.setState({
                name: res.user.name,
                email: res.user.email,
                join: res.user.created_at,
                pictureID: res.user.picture_id,
                type: res.user.type,
                loadingScreen: false
            });
        });

    }

    handleSubmit = () => {
        const PostData = new FormData();
        const config = {
            header: {
                "content-type": "multipart/form-data"
            }
        }
        PostData.append('premium_name', this.state.premium_name);
        PostData.append('premium_price', this.state.premium_price);
        PostData.append('duration', this.state.duration);

        this.setState({ loadingScreen: true });

        axios.post("/api/create-premium", PostData, config).then(
            res => {
                console.log(res);
                this.setState({ loadingScreen: false });
                this.props.history.push(`/manage-premium`);
            }
        ).catch(
            err => {
                console.log("asdad");

                console.log(err.response);
                this.setState({
                    errors: err.response.data,
                    loadingScreen: false
                })
            }
        );

    }

    render() {
        const { formErrors } = this.state;
        const { errors } = this.state;
        return (
            <React.Fragment>
                {this.authorizeUser()}
                {this.handleLoading()}

                <UserNav />
                <div className="wrapper crud-form">
                    <div className="form-wrapper">
                        <h1>Create Premium Product</h1>
                        <div className="password">
                            <label htmlFor="premium_name">Premium Name</label>
                            <input
                                type="text"
                                className={
                                    formErrors.premium_name.length > 0 ? "errorBox" : null
                                }
                                placeholder="Input Premium Name"
                                name="premium_name"
                                noValidate
                                onChange={this.handleChange}
                                autoFocus
                            />
                            {formErrors.premium_name.length > 0 && (
                                <span className="errorMsg">{formErrors.premium_name}</span>
                            )}
                            {errors.premium_name && <span className="errorMsg">{errors.premium_name}</span>}
                        </div>
                        <div className="password">
                            <label htmlFor="premium_price">Premium Price</label>
                            <input
                                type="number"
                                placeholder="Input Premium Price"
                                name="premium_price"
                                noValidate
                                onChange={this.handleChange}
                                autoFocus
                            />
                            {errors.premium_price && <span className="errorMsg">{errors.premium_price}</span>}
                        </div>
                        <div className="password">
                            <label htmlFor="duration">Duration in Days</label>
                            <input
                                type="number"
                                className={
                                    formErrors.duration.length > 0 ? "errorBox" : null
                                }
                                placeholder="Input Premium Duration"
                                name="duration"
                                noValidate
                                onChange={this.handleChange}
                                autoFocus
                            />
                            {formErrors.duration.length > 0 && (
                                <span className="errorMsg">{formErrors.duration}</span>
                            )}
                            {errors.duration && <span className="errorMsg">{errors.duration}</span>}
                        </div>
                        {/* <div className="password">
                            <label htmlFor="promo">Promo Discount</label>
                            <input
                                type="number"
                                className={
                                    formErrors.promo.length > 0 ? "errorBox" : null
                                }
                                placeholder="Input Premium Promo Discount"
                                name="promo"
                                noValidate
                                onChange={this.handleChange}
                                autoFocus
                            />
                            {formErrors.promo.length > 0 && (
                                <span className="errorMsg">{formErrors.promo}</span>
                            )}
                        </div> */}


                        <div className="createAccount">
                            <button onClick={this.handleSubmit}>Create Premium Product</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CreatePremium
