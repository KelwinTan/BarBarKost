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

export class KostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currKost: null,
      loadingScreen: true,
      address: "Your address",
      displayModal: false,
      slug: "",
      isUpdate: false,
      kost_images: null
    }
  }

  async componentDidMount() {
    const { handle } = this.props.match.params
    const { kost_slug } = this.props.location.state
    this.setState({ slug: kost_slug });
    console.log(kost_slug);
    await GetSpecificKost(kost_slug).then(
      res => {
        this.setState({
          currKost: res,
          loadingScreen: false,
        })
      }
    );
    await GetImages(this.state.currKost[0]['id']).then(res => {
      console.log(res);
      this.setState({
        kost_images: res
      })
    }
    )

    console.log(this.state.currKost[0]['id']);
    console.log(this.state.kost_images.length);
  }

  handleAddress = (update, coordinates) => {
    // console.log(coordinates.lat);
    this.setState({
      address: update,
      lng: coordinates.lng,
      lat: coordinates.lat
    });
    // console.log(this.state.lat);
    // console.log(this.state.lng);
  };

  componentDidUpdate = () => {
    if (this.state.address === null) {
      console.log("Tolong Pick lagi dongg");
      console.log(this.state.addrReal);
    } else {
      console.log(this.state.address["display_name"]);
    }
  };

  deleteKosan = () => {
    this.setState({ displayModal: true });
  }

  closeModal = () => {
    this.setState({ displayModal: false });
  }

  deleteBeneran = () => {
    const kost = {
      slug: this.state.slug
    };
    DeleteKost(kost).then(
      res => {
        this.props.history.push(`/data-kost`);
      }
    )
  }

  updateKost = () => {
    this.setState({
      updateKost: true
    })
  }

  playVideo() {
    this.refs.vidRef.play();
  }

  render() {
    return (
      <React.Fragment>
        <UserNav />
        <div>
          {!this.state.loadingScreen
            ?
            <div>
              {this.state.currKost.map(item =>
                item["id"] !== null ? (
                  <div className="kost-data-layout">
                    <div className="input-data-lokasi">
                      <div className="input-data-form">
                        {this.state.kost_images === null ? <div>Hello</div> : <PropertySlider count={this.state.kost_images.length} property={this.state.kost_images} />}
                        {item["picture_360"] !== null ? <img src={`http://localhost:8000/storage/${item["picture_360"]}`} alt="Picture 360" /> : ""}
                        <div>
                          <video ref="vidRef" src={`http://localhost:8000/storage/${item["video"]}`} alt="Video" type="video/mp4"></video>
                          <br />
                          <button onClick={this.playVideo.bind(this)}>Play Video</button>
                        </div>
                        <h5>Kost Name: {item["name"]}</h5>
                        <h5>Description: {item["description"]}</h5>
                        <h5>Price: {item["prices"]}</h5>
                        <h5>City: {item["city"]}</h5>
                        <h5>Address: {item["address"]}</h5>
                        <h5>Total Rooms: {item["total_rooms"]}</h5>
                        <h5>Room(s) Left: {item["room_left"]}</h5>
                        <h5>Owner Email: {item["owner_email"]}</h5>
                        <hr />

                        <Link to={{
                          pathname: `/update-kost-${item['kost_slug']}`,
                          state: {
                            kost_slug: item['kost_slug']
                          }
                        }} key={item} className="link-styles">Update Kost</Link>
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
          <button onClick={this.deleteKosan}>Delete Kost</button>
          {this.state.displayModal ?
            <BgModal>
              <ModalContent>
                <Close onClick={this.closeModal}>+</Close>
                <img src={logo} style={{ height: "200px" }} alt="logo" />
                <Content>Are you sure you are going to delete the rent house?</Content>
                <button onClick={this.deleteBeneran}>Yes</button>
              </ModalContent>
            </BgModal> : ""}
        </div>
      </React.Fragment>
    )
  }
}

export default KostPage
