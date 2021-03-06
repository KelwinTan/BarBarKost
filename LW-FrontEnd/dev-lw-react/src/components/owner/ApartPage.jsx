import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { GetSpecificKost, DeleteKost } from "./OwnerFunctions";
import UserNav from '../user/navbar/UserNav';
import MyLeaflet from '../map/MyLeaflet';
import ModalBox from '../ModalBox';
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import PropertySlider from '../property/PropertySlider';
import { GetImages } from '../property/PropertyFunctions';
import Axios from 'axios';
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

export class ApartPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slug: "",
      currApart: null,
      loadingScreen: true,
      displayModal: false,

    }
  }
  deleteKosan = () => {
    this.setState({ displayModal: true });
  }

  closeModal = () => {
    this.setState({ displayModal: false });
  }

  async componentDidMount() {
    const { apart_slug } = this.props.location.state;
    console.log(this.props.location.state);
    const fd = new FormData();
    fd.append('slug', apart_slug);
    await Axios.post("/api/owner-get-apartment", fd).then(res => {
      console.log(res);
      this.setState({
        currApart: res.data,
        loadingScreen: false
      });
      console.log(this.state.currApart['name'])
    });
    // this.setState({ slug: apart_slug });
    // await GetSpecificKost(slug).then(
    //     res => {
    //         this.setState({
    //             currApart: res,
    //             loadingScreen: false,
    //         })
    //     }
    // );
    // await GetImages(this.state.currApart['id']).then(res => {
    //     console.log(res);
    //     this.setState({
    //         kost_images: res
    //     })
    // }
    // )  

    // console.log(this.state.currApart[0]['id']);
    // console.log(this.state.kost_images.length);
  }

  handleLoading = () => {
    if (this.state.loadingScreen === true) {
      return <LoadingScreen />;
    } else {
      return null;
    }
  };

  deleteBeneran = () => {
    const fd = new FormData();
    fd.append('slug', this.state.currApart['slug']);
    Axios.post("/api/delete-apartment", fd).then(res => {
      this.props.history.push(`/data-apartment`);
    })
  }

  render() {
    return (
      <React.Fragment>
        <UserNav />
        {this.handleLoading()}
        {/* {this.state.currApart.data['id']} */}
        {!this.state.loadingScreen
          ?
          // <p>Apartment Name: {this.state.currApart.data['name']}</p>
          <div className="property-card property-responsive property-props">
            <div className="card-kost">
              <div className="card-kost-container">
                <img src={`http://localhost:8000/storage/${this.state.currApart['banner_picture']}`} alt="Banner" />
                <h4>Apart Name: {this.state.currApart['name']}</h4>
                <div className="card-kost-images">
                  <p>Apart Address: {this.state.currApart['address']}</p>
                  <p>Apart City: {this.state.currApart['city']}</p>
                  <p>Apart Prices: {this.state.currApart['prices']}</p>
                  <p>Apart Description: {this.state.currApart['description']}</p>
                  <p>Apart Unit Type: {this.state.currApart['unit_type']}</p>
                  <p>Apart Unit Condition: {this.state.currApart['unit_condition']}</p>

                  {/* <p>Apart Slug: {item["slug"]}</p> */}
                  <Link to={{
                    pathname: `/update-apart/${this.state.currApart['slug']}`,
                    state: {
                      apart_slug: this.state.currApart['slug']
                    }
                  }} key={this.state.currApart} className="link-styles" style={{ border: "2px solid black" }}>Update Apartment</Link>
                  <button onClick={this.deleteKosan}>Delete Apartment</button>
                </div>
              </div>
            </div>
          </div>

          : ""}
        {/* {this.state.currApart} */}
        {/* {console.log(this.state.apart_slug)} */}
        <div style={{ textAlign: "center" }}>
          {this.state.displayModal ?
            <BgModal>
              <ModalContent>
                <Close onClick={this.closeModal}>+</Close>
                <img src={`http://localhost:8000/storage/${this.state.currApart['banner_picture']}`} style={{ height: "200px" }} alt="logo" />
                <Content>Are you sure you are going to delete the Apartment?</Content>
                <button onClick={this.deleteBeneran}>Yes</button>
              </ModalContent>
            </BgModal> : ""}
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default ApartPage
