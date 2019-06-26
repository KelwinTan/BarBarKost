import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import { getProfile } from "../user/login-register/UserFunctions";
import LoadingScreen from '../utilities/LoadingScreen';
import { Link, Redirect } from "react-router-dom";
import Axios from 'axios';
import Footer from '../home/Footer';

export class PremiumPromo extends Component {
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
            loadingScreen: true,
            visibility: "",
            premium_name: "",
            premium_price: "",
            postImage: null,
            duration: "",
            tags: "",
            promo: "",
            errors: {

            },
            currPremium: "",
            premium_id: ""
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        // console.log("Name:", name);
        // console.log("Value:", value);

        switch (name) {
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

    addPromo = () => {
        const PostData = new FormData();
        const config = {
            header: {
                "content-type": "multipart/form-data"
            }
        }
        PostData.append('id', this.state.premium_id);
        PostData.append('promo', this.state.promo);

        this.setState({ loadingScreen: true });

        Axios.post("/api/add-promo-premium", PostData, config).then(
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

    removePromo = () =>{
        const PostData = new FormData();
        const config = {
            header: {
                "content-type": "multipart/form-data"
            }
        }
        PostData.append('id', this.state.premium_id);

        this.setState({ loadingScreen: true });

        Axios.post("/api/remove-promo-premium", PostData, config).then(
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

    authorizeUser = () => {
        if (this.state.type !== 3) {
            return <Redirect to={"/"}> </Redirect>;
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
                type: res.user.type,
            });
        });

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
        Axios.post("/api/get-specific-premium", PostData, config).then(res => {
            console.log(res);
            this.setState({
                currPremium: res.data,
                loadingScreen: false,
                premium_name: res.data[0]['premium_name'],
                duration: res.data[0]['duration'],
                premium_id: res.data[0]['id']

            });
            console.log(this.state.currPremium[0]['premium_name']);
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
        const { formErrors } = this.state;
        const { errors } = this.state;
        return (
            <React.Fragment>
                {this.authorizeUser()}
                {this.handleLoading()}

                <UserNav />
                {!this.state.loadingScreen ?
                    <div className="wrapper crud-form">
                        <div className="form-wrapper">
                            <h1>Update Premium Product</h1>
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
                                    value={this.state.currPremium[0]['premium_name']}
                                    readOnly
                                />
                                {formErrors.premium_name.length > 0 && (
                                    <span className="errorMsg">{formErrors.premium_name}</span>
                                )}
                                {errors.premium_name && <span className="errorMsg">{errors.premium_name}</span>}
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
                                    readOnly
                                    defaultValue={this.state.currPremium[0]['duration']}
                                />
                                {formErrors.duration.length > 0 && (
                                    <span className="errorMsg">{formErrors.duration}</span>
                                )}
                                {errors.duration && <span className="errorMsg">{errors.duration}</span>}
                            </div>
                            <div className="password">
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
                                {errors.promo && <span className="errorMsg">{errors.promo}</span>}
                            </div>


                            <div className="createAccount">
                                <button onClick={this.addPromo}>Add Promo</button>
                                <button onClick={this.removePromo}>Remove Promo</button>
                            </div>
                        </div>
                    </div>
                    : ""}
                <Footer />
            </React.Fragment>
        )
    }
}

export default PremiumPromo
