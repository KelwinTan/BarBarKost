import React, { Component } from 'react'
import { getProfile } from "../user/login-register/UserFunctions";
import { Link, Redirect } from "react-router-dom";
import { UserNav } from '../user/navbar/UserNav';
import axios, { post } from "axios";
import LoadingScreen from '../utilities/LoadingScreen';
import styled from "styled-components";
import Pagination from '../utilities/Pagination';
import { withRouter } from "react-router-dom";

const BgModal = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  align-items: center;
  z-index:100000;
`;

const ModalContent = styled.div`
  width: 500px;
  height: 350px;
  background-color: white;
  border-radius: 5px;
  position: relative;
  text-align: center;
  padding: 20px;
`;

const Close = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 42px;
  color: #333;
  transform: rotate(45deg);
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

const Content = styled.div`
  margin: 15px auto;
  display: block;
  width: 50%;
  padding: 8px;
  margin-top: 20px;
  border: 1px solid gray;
  color: red;
`;

export class UpdateFacility extends Component {

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
            icons: [],
            icon: [],
            selectedIcon: "",
            iconName: "",
            iconGroup: "",
            formErrors: {},
            iconList: [],
            displayModal: false,
            paginateData: null,
            getLink: "/api/get-facility",
            filterName: "",

        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleIconChange = this.handleIconChange.bind(this);
    }

    handleIconChange = (e) => {
        e.preventDefault();
        // var newArr = this.state.selectedIcon.slice();
        const { name, value } = e.target;
        // console.log("object");
        // newArr.push(value);
        // this.setState({icon: value});
        this.setState({ selectedIcon: value });
        console.log(this.state);
    }

    authorizeUser = () => {
        if (this.state.type !== 3) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };

    componentDidMount() {
        this.setState({ loadingScreen: true });

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
        var pages = this.props.history.location.search;

        axios.post(`${this.state.getLink + pages}`).then(
            res => {
                console.log(res);
                this.setState({ iconList: res.data.data, loadingScreen: false, paginateData: res.data });
                console.log(this.state.iconList);
                console.log(this.state.paginateData);
            }
        )

        // this.setState({ icons: icon });
    }

    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ iconName: value });

        console.log(this.state);
    }

    handleFilter = (event) => {
        const { name, value } = event.target;

        this.setState({ filterName: value });

        console.log(this.state);
    }

    handleGroup = (event) => {
        const { name, value } = event.target;
        this.setState({ iconGroup: value });
        console.log(this.state);
    }

    updateFacility = () => {
        this.setState({ loadingScreen: true });

        const FacilityData = new FormData();
        FacilityData.append('name', this.state.iconName);
        FacilityData.append('icon', this.state.selectedIcon);
        FacilityData.append('group', this.state.iconGroup);
        axios.post("/api/update-facility", FacilityData).then(
            res => {
                console.log(res);
                this.setState({ loadingScreen: false });
            }
        ).catch(err => {
            this.setState({ formErrors: err.response.data, loadingScreen: false });
            console.log(err.response.data);
            // console.log(this.state.formErrors.data.group);
        });
    }

    deleteKosan = () => {
        this.setState({ displayModal: true });
    }

    closeModal = () => {
        this.setState({ displayModal: false });
    }

    deleteBeneran = () => {
        this.setState({ loadingScreen: true });
        const FacilityData = new FormData();
        FacilityData.append('icon', this.state.selectedIcon);

        axios.post("/api/delete-facility", FacilityData).then(
            res => {
                console.log(res);
                this.setState({ loadingScreen: false });
            }
        )
    }

    componentWillReceiveProps(next_props, next_state) {
        console.log(next_props);
        axios.post(`${this.state.getLink + next_props.location.search}`).then(res => {
            console.log(res);
            this.setState({
                iconList: res.data.data,
                loadingScreen: false,
                paginateData: res.data,

            });
        }
        );
    }

    filterFacilities = () => {
        this.setState({
            loadingScreen: true
        })
        const fd = new FormData();
        fd.append("filterName", this.state.filterName);
        fd.append("group", this.state.iconGroup);
        axios.post("/api/filter-facility", fd).then(
            res => {
                console.log(res);
                this.setState({ iconList: res.data.data, loadingScreen: false, paginateData: res.data });
                console.log(this.state.iconList);
                console.log(this.state.paginateData);
            }
        )
    }

    render() {
        return (
            <React.Fragment>
                <UserNav />
                {this.authorizeUser()}
                {this.handleLoading()}
                <div className="owner-data-kost">
                    <h1>Selected Facilities</h1>

                    <div style={{ fontSize: "40px", display: "flex", justifyContent: "center" }}>
                        <label htmlFor={this.state.selectedIcon} className={`fa ${this.state.selectedIcon}`} ></label>
                        <input type="text" onChange={this.handleChange} name={this.state.selectedIcon} />
                        <select
                            id="facility-group"
                            name={`group-${this.state.selectedIcon}`}
                            onChange={this.handleGroup}
                        >
                            <option value="Public">Public</option>
                            <option value="Parking">Parking</option>
                            <option value="Sports">Sports</option>

                        </select>
                        {this.state.formErrors["icon"] ? <div style={{ color: "red" }}>{this.state.formErrors["icon"]}</div> : ""}
                        {this.state.formErrors["name"] ? <div style={{ color: "red" }}>{this.state.formErrors["name"]}</div> : ""}
                        {this.state.formErrors["group"] ? <div style={{ color: "red" }}>{this.state.formErrors["group"]}</div> : ""}
                        <button onClick={this.updateFacility}>Update Facility</button>

                    </div>
                    <div style={{ textAlign: "center" }}>
                        <input type="text" onChange={this.handleFilter} />
                        <select
                            id="facility-group"
                            name={`group-${this.state.selectedIcon}`}
                            onChange={this.handleGroup}
                        >
                            <option value="Public">Public</option>
                            <option value="Parking">Parking</option>
                            <option value="Sports">Sports</option>

                        </select>
                        <button onClick={this.filterFacilities}>Filter Facilities</button>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button onClick={this.deleteKosan}>Delete Facility</button>
                        {this.state.displayModal ?
                            <BgModal>
                                <ModalContent>
                                    <Close onClick={this.closeModal}>+</Close>
                                    <label htmlFor={this.state.selectedIcon} className={`fa ${this.state.selectedIcon}`} style={{ fontSize: "100px" }} ></label>
                                    <Content>Are you sure you are going to delete the rent Facility?</Content>
                                    <button onClick={this.deleteBeneran}>Yes</button>
                                </ModalContent>
                            </BgModal> : ""}
                    </div>

                    <hr />
                </div>
                <h1 style={{ fontSize: "30px", textAlign: "center" }}>Bar Bar Kost Facilities</h1>
                {this.handleLoading}
                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        {this.state.iconList.map(item =>
                            item["id"] !== null ? (

                                <div style={{ fontSize: "40px" }}>
                                    <label htmlFor={item["icon"]} className={`fa ${item["icon"]}`} onClick={this.updateIcon = () => {
                                        this.setState({ selectedIcon: item["icon"] });
                                        console.log(this.state);
                                    }} ></label>
                                    <p>Facility Group:{item["group"]}</p>
                                    <p>Facility Name:{item["name"]}</p>
                                    <div style={{ position: "fixed", bottom: "10%", left: "50%", background: "white", border: "30px solid white" }}>
                                        <Pagination pages={this.state.paginateData} />
                                    </div>
                                </div>

                            ) : (
                                    ""
                                )
                        )}
                        {console.log(this.state.paginateData)}
                        {/* <div>Hello</div> */}

                    </div>
                    : null}
            </React.Fragment>
        )
    }
}

export default withRouter(UpdateFacility)
