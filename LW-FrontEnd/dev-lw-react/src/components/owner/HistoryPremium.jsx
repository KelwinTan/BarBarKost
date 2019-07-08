import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import Footer from '../home/Footer';
import axios from "axios";
import Pagination from '../utilities/Pagination';
import { withRouter } from "react-router-dom";
import LoadingScreen from '../utilities/LoadingScreen';
import { Link, Redirect } from "react-router-dom";
import { getProfile } from "../user/login-register/UserFunctions";
import styled from "styled-components";

const BgModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:100000;
`;

const ModalContent = styled.div`
  width: 500px;
  height: 350px;
  background-color: yellow;
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

export class HistoryPremium extends Component {

    constructor(props) {
        super(props);
        this.state = {
            premiumList: null,
            loadingScreen: true,
            paginateData: null,
            getLink: "/api/owner-history-transaction",
            name: "",
            email: "",
            join: "",
            id: "",
            type: 2,
            ongoingTrans: null,
            displayModal: false
        }
    }

    async componentDidMount() {

        await getProfile().then(res => {
            console.log(res.user.id);
            this.setState({
                name: res.user.name,
                email: res.user.email,
                join: res.user.created_at,
                pictureID: res.user.picture_id,
                type: res.user.type,
                id: res.user.id
            });
            console.log(fd);
        });
        const fd = new FormData();
        fd.append('owner_id', this.state.id);
        console.log(this.props.history.location.search);
        var pages = this.props.history.location.search;
        await axios.post(`${this.state.getLink + pages}`, fd).then(res => {
            console.log(res);
            this.setState({
                premiumList: res.data.data,
                loadingScreen: false,
                paginateData: res.data,
            });
        }
        );
        await axios.post("/api/owner-ongoing-transaction", fd).then(res => {
            console.log(res.data);
            this.setState({
                ongoingTrans: res.data,
                loadingScreen: false,
            });
        }
        );
    }

    componentWillReceiveProps(next_props, next_state) {
        console.log(next_props);
        const fd = new FormData();
        fd.append('owner_id', this.state.id);
        axios.post(`${this.state.getLink + next_props.location.search}`, fd).then(res => {
            console.log(res);
            this.setState({
                premiumList: res.data.data,
                loadingScreen: false,
                paginateData: res.data,

            });
        }
        );
    }

    cancelPremiumOrder = () => {
        const fdata = new FormData();
        fdata.append('owner_id', this.state.id);
        fdata.append('transaction_id', this.state.ongoingTrans["transaction"]["id"]);

        axios.post("/api/owner-cancel-transaction", fdata).then(res => {
            console.log(res);
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
        if (this.state.type !== 2) {
            return <Redirect to={"/"}> </Redirect>;
        }
    };

    deleteKosan = () => {
        this.setState({ displayModal: true });
    }

    closeModal = () => {
        this.setState({ displayModal: false });
    }


    render() {
        return (
            <React.Fragment>
                <UserNav />
                {this.authorizeUser()}
                {this.handleLoading()}
                <h1 style={{ textAlign: "center", fontSize: "40px" }}>Ongoing Premium Transaction</h1>
                {
                    this.state.ongoingTrans === null ? "" :
                        <div style={{ float: "none", display: "flex", margin: "100px", justifyContent: "center" }}>
                            <div className="card-kost">
                                <div className="card-kost-container">
                                    <h4>Transaction ID: {this.state.ongoingTrans["transaction"]["id"]}</h4>
                                    <div className="card-kost-images">
                                        <p>Premium Name: {this.state.ongoingTrans["premium"]["premium_name"]}</p>
                                        <p>Premium Price: Rp. {this.state.ongoingTrans["premium"]["premium_price"]}</p>

                                        <p>Ordered Date: {this.state.ongoingTrans["transaction"]["created_at"]}</p>

                                        <div style={{ textAlign: "center" }}>
                                            <button onClick={this.deleteKosan}>Cancel Premium Order</button>
                                            {this.state.displayModal ?
                                                <BgModal>
                                                    <ModalContent>
                                                        <Close onClick={this.closeModal}>+</Close>
                                                        <Content>Are you sure you are going to cancel the premium order?</Content>
                                                        <button onClick={this.cancelPremiumOrder}>Yes</button>
                                                    </ModalContent>
                                                </BgModal> : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                }


                {/* {this.state.ongoingTrans === null ? "" :
                    this.state.ongoingTrans.map(item =>
                        item["id"] !== null ? (
                            <div>
                                <Link to={{
                                    pathname: `/premium/${item['slug']}`
                                }} key={item}>
                                    <div className="card-kost">
                                        <div className="card-kost-container">
                                            <h4>Premium Name: {item["premium_name"]}</h4>
                                            <div className="card-kost-images">
                                                <p>Premium Price: {item["premium_price"]}</p>
                                                <p>Premium Promo: {item["promo"]}</p>

                                                <p>Premium Created At: {item["created_at"]}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        ) : (
                                ""
                            )
                    )} */}
                <hr />
                <h1 style={{ textAlign: "center", fontSize: "40px" }}>Premium Transaction History</h1>

                {!this.state.loadingScreen
                    ?
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div className="post-cards">
                            {this.state.premiumList.map(item =>
                                item["id"] !== null ? (
                                    <div>
                                        <Link style={{ padding: "unset" }} to={{
                                            pathname: `/detail-transaction/${item['id']}`
                                        }} key={item}>
                                            <div className="card-kost post-resp" style={{ width: "400px" }}>
                                                <div className="card-kost-container">
                                                    <h4>Transaction ID: {item["id"]}</h4>
                                                    <div className="card-kost-images">
                                                        <p>Start Date: {item["start_date"]}</p>
                                                        <p>End Date: {item["end_date"]}</p>
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

export default withRouter(HistoryPremium)
