import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import { Link, Redirect } from "react-router-dom";
import { getProfile } from "../user/login-register/UserFunctions";
import GetPremium from './GetPremium';

export class ManagePremium extends Component {
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
            loadingScreen: false,
            visibility: "",
            title: "",
            content: "",
            postImage: null,
            tags: "",
            errors: {

            }
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
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
    }

    authorizeUser = () => {
        if (this.state.type !== 3) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };

    render() {
        return (
            <React.Fragment>
                {this.authorizeUser()}

                <UserNav />
                <div className="admin-link-styles">
                    <Link to="/admin-create-premium">Create Premium Product</Link>
                </div>
                <GetPremium />
            </React.Fragment>
        )
    }
}

export default ManagePremium
