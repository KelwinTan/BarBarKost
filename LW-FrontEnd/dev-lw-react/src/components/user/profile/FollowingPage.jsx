import React, { Component } from 'react'
import { UserNav } from '../navbar/UserNav';
import Footer from '../../home/Footer';
import { getProfile } from "../../user/login-register/UserFunctions";
import LoadingScreen from '../../utilities/LoadingScreen';
import { Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import Pagination from '../../utilities/Pagination';
import LoadingInfinite from './LoadingInfinite';


export const getObjectFromQueryParams = (params, keys) => {
    const query = new URLSearchParams(params)
    let object = {}
    for (const key of keys) {
        if (query.get(key))
            object[key] = query.get(key)
    }

    return isEmptyObject(object) ? null : object
}
export const objectToQueryParams = obj => {
    return Object.keys(obj)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
        .join("&")
}

export const getObjectFromQueryParamsExcept = (params, keys) => {
    const query = new URLSearchParams(params)
    let object = {}
    for (const key of query.entries()) {
        if (!keys.includes(key[0]))
            object[key[0]] = key[1]
    }

    return isEmptyObject(object) ? null : object
}
export const isEmptyObject = obj => {
    return Object.keys(obj).length === 0
}


export class FollowingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            join: "",
            type: 1,
            showIklan: false,
            showProfileFunc: false,
            showMenu: false,
            verifyEmail: false,
            verifyPhone: false,
            totalUsers: 0,
            loadingScreen: true,
            pictureID: "",
            phone: "",
            kostList: "",
            paginateData: null,
            getLink: "/api/show-following",
            infinite: false,
            ownerName: "",
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        await getProfile().then(res => {
            console.log(res);
            this.setState({
                name: res.user.name,
                phone: res.user.phone,
                email: res.user.email,
                join: res.user.created_at,
                pictureID: res.user.picture_id,
                type: res.user.type,
                id: res.user.id
            });
        });
        console.log(this.state.id);
        const fd = new FormData();
        fd.append('user_id', this.state.id);
        var pages = this.props.history.location.search;
        await axios.post(`${this.state.getLink + pages}`, fd).then(res => {
            console.log(res.data);
            this.setState({
                kostList: res.data.data,
                loadingScreen: false,
                paginateData: res.data

            });
        }
        );
    }

    componentWillReceiveProps(next_props, next_state) {
        this.setState({
            loadingScreen: true
        })
        console.log(next_props);
        const fd = new FormData();
        fd.append('user_id', this.state.id);
        axios.post(`${this.state.getLink + next_props.location.search}`, fd).then(res => {
            console.log(res);
            this.setState({
                kostList: [...this.state.kostList, ...res.data.data],
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

    authorizeUser = () => {
        if (this.state.type !== 1) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };

    unfollowUser = (owner_id) => {
        this.setState({ loadingScreen: true });
        const fd = new FormData();
        fd.append('user_id', this.state.id);
        fd.append('owner_id', owner_id);
        axios.post("/api/unfollow", fd).then(res => {
            console.log(res);
            this.setState({ loadingScreen: false });
        }
        );
    }

    handleInfinite = () => {
        if (this.state.infinite === true) {
            return <LoadingInfinite />;
        } else {
            return null;
        }
    }


    handleOwnerName = (event) => {
        const { name, value } = event.target;
        this.setState({ ownerName: value });
        console.log(this.state);
    }

    searchOwner = () => {
        const fd = new FormData();
        fd.append("name", this.state.ownerName);
        fd.append('user_id', this.state.id);
        this.setState({ loadingScreen: true });

        axios.post("/api/search-following-owner", fd).then(res => {
            console.log(res);
            this.setState({
                userList: res.data.data,
                loadingScreen: false,
                paginateData: res.data
            });
        });
    }

    componentWillMount = () => {
        window.onscroll = () => {

            if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
                if (!this.state.infinite) {

                    this.setState({ infinite: true }, () => {
                        console.log("Hello0");
                        let query = getObjectFromQueryParamsExcept(this.props.location.search, [
                            "page"
                        ]);
                        if (query === null) query = { page: 2 };
                        else query.page = parseInt(query.page) + 1;
                        const fd = new FormData();
                        fd.append('user_id', this.state.id);
                        const url = this.props.match.url + "?" + objectToQueryParams(query);
                        console.log(`${this.state.getLink}/${query.page}`)
                        axios.post(`${this.state.getLink}?page=${query.page}`, fd).then(res => {
                            // console.log(res);
                            this.setState({
                                kostList: [...this.state.kostList, ...res.data.data],
                                infinite: false,
                                paginateData: res.data,

                            });
                        });
                    });

                }
            }
        };
    }

    render() {
        return (
            <React.Fragment>
                {this.authorizeUser()}
                {this.handleLoading()}
                <UserNav />
                <h1 style={{ textAlign: "center", fontSize: "50px" }}>Owners that You are Following</h1>
                {/* <div style={{ textAlign: "center" }}>
                    <input type="text" onChange={this.handleOwnerName} placeholder="Input Owner Name" />

                    <button onClick={this.searchOwner} className="filter-button">Search Owner</button>
                </div> */}
                <hr />
                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="property-card property-responsive property-props">
                            {this.state.kostList.map(item =>
                                item["id"] !== null ? (
                                    <div>
                                        <div className="card-kost" style={{ width: "300px" }}>
                                            <div className="card-kost-container">
                                                <img src={`http://localhost:8000/storage/${item["user"]['picture_id']}`} />
                                                <Link to={{
                                                    pathname: `/owner-detail/${item['user']['slug']}`
                                                }} key={item["user"]["id"]}>
                                                    <h4>Owner Name: {item["user"]["name"]}</h4>
                                                </Link>
                                                <div className="card-kost-images">
                                                    <p>Owner Email: {item["user"]["email"]}</p>
                                                    <p>Total Followers: {item["followers"]["follower_count"]}</p>
                                                    <button onClick={() => this.unfollowUser(item["user"]["id"])}>Unfollow Owner</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ) : (
                                        ""
                                    )
                            )}
                        </div>
                        {/* <div style={{ position: "fixed", bottom: "10%", left: "50%", background: "white", border: "30px solid white" }}>
                            <Pagination pages={this.state.paginateData} />
                        </div> */}
                    </div>
                    : null}
                {this.handleInfinite()}
                <Footer />
            </React.Fragment>
        )
    }
}

export default withRouter(FollowingPage)
