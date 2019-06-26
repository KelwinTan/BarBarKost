import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import Axios from 'axios';
import styled from "styled-components";
import { getProfile } from "../user/login-register/UserFunctions";
import { Link, Redirect } from "react-router-dom";



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

export class PremiumPage extends Component {

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

            });
        }
        );

    }
    deleteKosan = () => {
        this.setState({ displayModal: true });
    }

    closeModal = () => {
        this.setState({ displayModal: false });
    }

    deleteBeneran = () => {
        const config = {
            header: {
                "content-type": "multipart/form-data"
            }
        }
        const PostData = new FormData();
        PostData.append('slug', this.state.currSlug);
        Axios.post("/api/delete-premium", PostData, config).then(
            res => {
                this.props.history.push(`/manage-premium`);
            }
        )
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
                <div>
                    {!this.state.loadingScreen
                        ?
                        <div>
                            {this.state.currPremium.map(item =>
                                item["id"] !== null ? (
                                    <div className="kost-data-layout">
                                        <div className="input-data-lokasi">
                                            <div className="input-data-form">
                                                <h5>Premium Name: {item["premium_name"]}</h5>

                                                <div id="post-content">
                                                </div>
                                                <h5>Premium Price: {item["premium_price"]}</h5>
                                                <h5>Premium Duration: {item["duration"]}</h5>
                                                <h5>Premium Promo: {item["promo"]}</h5>
                                                <h5>Premium Created At: {item["created_at"]}</h5>
                                                <hr />

                                                <Link to={{
                                                    pathname: `/premium/update/${item['slug']}`
                                                }} key={item} className="link-styles">Update Premium</Link>
                                                <Link to={{
                                                    pathname: `/premium/promo/${item['slug']}`
                                                }} key={item} className="link-styles">Promo Management</Link>
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
                <div style={{ textAlign: "center" }}>
                    <button onClick={this.deleteKosan}>Delete Premium</button>
                    {this.state.displayModal ?
                        <BgModal>
                            <ModalContent>
                                <Close onClick={this.closeModal}>+</Close>
                                <Content>{this.state.currPremium[0]['premium_name']}</Content>
                                <Content>Are you sure you are going to delete this Premium Product?</Content>
                                <button onClick={this.deleteBeneran}>Yes</button>
                            </ModalContent>
                        </BgModal> : ""}
                </div>
            </React.Fragment>
        )
    }
}

export default PremiumPage
