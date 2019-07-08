import React, { Component } from 'react'
import Axios from 'axios';
import UserNav from '../user/navbar/UserNav';
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { getProfile } from "../user/login-register/UserFunctions";
import LoadingScreen from '../utilities/LoadingScreen';
import Footer from '../home/Footer';


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

export class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post_ids: "",
            currPost: null,
            loadingScreen: true,
            currSlug: "",
            name: "",
            email: "",
            join: "",
            type: 3,
        }
    }

    async componentDidMount() {
        console.log(this.props);
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
        Axios.post("/api/get-specific-post", PostData, config).then(res => {
            console.log(res);
            this.setState({
                currPost: res.data,
                loadingScreen: false,

            });
            document.getElementById("post-content").innerHTML = this.state.currPost[0]['content'];
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
        Axios.post("/api/delete-post", PostData, config).then(
            res => {
                this.props.history.push(`/manage-post`);
            }
        )
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
                            {this.state.currPost.map(item =>
                                item["id"] !== null ? (
                                    <div className="kost-data-layout">
                                        <div className="input-data-lokasi">
                                            <div className="input-data-form">
                                                <img src={`http://localhost:8000/storage/${item["thumbnail_path"]}`} alt="Banner" />
                                                <h5>Post Title: {item["title"]}</h5>
                                                {/* <h5>Kost Name: {item["name"]}</h5>
                                                <h5>Description: {item["description"]}</h5>
                                                <h5>Price: {item["prices"]}</h5>
                                                <h5>City: {item["city"]}</h5>
                                                <h5>Address: {item["address"]}</h5>
                                                <h5>Total Rooms: {item["total_rooms"]}</h5>
                                                <h5>Room(s) Left: {item["room_left"]}</h5>
                                                <h5>Owner Email: {item["owner_email"]}</h5> */}
                                                <div id="post-content">
                                                </div>
                                                <h5>Post Tag: {item["tags"]}</h5>
                                                <h5>Post Created At: {item["created_at"]}</h5>
                                                <hr />

                                                <Link to={{
                                                    pathname: `/post/update/${item['slug']}`
                                                }} key={item} className="link-styles">Update Post</Link>
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
                    <button onClick={this.deleteKosan}>Delete Post</button>
                    {this.state.displayModal ?
                        <BgModal>
                            <ModalContent>
                                <Close onClick={this.closeModal}>+</Close>
                                <img src={`http://localhost:8000/storage/${this.state.currPost[0]['thumbnail_path']}`} style={{ height: "200px" }} alt="logo" />
                                <Content>Are you sure you are going to delete the post?</Content>
                                <button onClick={this.deleteBeneran}>Yes</button>
                            </ModalContent>
                        </BgModal> : ""}
                </div>

                <Footer />
            </React.Fragment>
        )
    }
}

export default PostPage
