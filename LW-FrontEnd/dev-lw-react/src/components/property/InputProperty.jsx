import React, { Component } from "react";
import NavBar from "../home/NavBar";
import { Link, Redirect } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./Property.scss";
import { NavigationBar } from "../home/NavigationBar";
import L from "leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import MyLeaflet from "../map/MyLeaflet";
import axios, { post } from "axios";
import { getProfile, InsertKost } from "../user/login-register/UserFunctions";
import { Facilities } from "../facilities/Facilities";
import LoadingScreen from "../utilities/LoadingScreen";

export class InputProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
      address: "",
      addrReal: "Your Address",
      formStatus: 1,
      image: "",
      Facility: "",
      kostType: "Putri",
      kostArea: "",
      kostTotal: "",
      hargaBulan: "",
      hargaHari: "",
      hargaMinggu: "",
      hargaTahun: "",
      formErrors: {
        kostAddr: "",
        kostName: "",
        kostType: "",
        kostLeft: "",
        kostDesc: "",
        kostType: "",
        kostArea: "",
        kostTotal: "",
        hargaBulan: "",
        hargaMinggu: "",
        hargaTahun: "",

        hargaHari: ""
      },
      loadingScreen: true,
      isValid: false,
      userType: 2
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const newKost = {
      name: this.state.kostName,
      description: this.state.kostDesc,
      prices: this.state.hargaHari,
      city: this.state.address["display_name"],
      address: this.state.kostAddr,
      total_rooms: this.state.kostTotal,
      room_left: this.state.kostLeft,
      longitude: this.state.lng,
      latitude: this.state.lat
    };
    InsertKost(newKost);
  };

  componentDidMount() {
    if (this.state.loadingScreen === true) {
      return <LoadingScreen />;
    }
    getProfile().then(res => {
      this.setState({ loadingScreen: false });
      console.log(res);
      this.setState({
        name: res.user.name,
        email: res.user.email,
        join: res.user.created_at,
        pictureID: res.user.picture_id,
        userType: res.user.type
      });
    });
  }

  onFormImageSubmit = e => {
    e.preventDefault();
    this.fileUpload(this.state.image);
  };

  authorizeUser = () => {
    if (this.state.userType !== 2) {
      return <Redirect to={"/"}> </Redirect>;
    }
  };

  fileUpload = e => {
    const url = "api/fileupload";
    const formData = { file: this.state.image };
    return post(url, formData)
      .then(response => console.log(response))
      .catch(error => {
        console.log(error.response);
      });
  };

  createImage(file) {
    let reader = new FileReader();
    reader.onload = e => {
      this.setState({
        image: e.target.result
      });
    };
    reader.readAsDataURL(file);
  }

  onChangeImage = e => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    this.createImage(files[0]);
  };

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

  handleChangeForm = () => {
    if (this.state.formStatus === 4) {
      this.setState({ formStatus: 1 });
      console.log(this.state.formStatus);
    } else {
      this.setState({
        formStatus: this.state.formStatus + 1,
        isValid: false
      });
      if (this.state.formStatus === 2) this.setState({ isValid: true });
      console.log(this.state.formStatus);
    }
  };

  handleLoading = () => {
    if (this.state.loadingScreen === true) {
      return <LoadingScreen />;
    } else {
      return null;
    }
  };

  handleFacility = facilities => {
    this.setState({
      Facility: this.refs.WiFi.checked ? "" : "WiFi"
    });
    console.log(this.state.Facility);
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "kostAddr":
        formErrors.kostAddr =
          value.length < 10 && value.length > 0
            ? "Minimum 10 characters required"
            : "";
        if (value.length >= 10) {
          this.setState({ isValid: true });
        } else {
          this.setState({ isValid: false });
        }
        break;
      case "kostName":
        formErrors.kostName =
          value.length < 8 && value.length > 0
            ? "Minimum 8 characters required"
            : "";
        break;
      case "kostLeft":
        formErrors.kostLeft = value <= 0 ? "Room Left cannot be empty" : "";
        break;
      case "kostDesc":
        formErrors.kostDesc =
          value.length < 8 && value.length > 0
            ? "Minimum 8 characters required"
            : "";
        if (value.length >= 8) {
          this.setState({ isValid: true });
        } else {
          this.setState({ isValid: false });
        }
        break;
      case "kostArea":
        formErrors.kostArea =
          value < 100 && value > 0 ? "Minimum 100 metres squared" : "";
        break;
      case "kostTotal":
        formErrors.kostTotal =
          value < 3 && value > 0 ? "Minimum 3 rooms required" : "";
        break;
      case "hargaBulan":
        formErrors.hargaBulan =
          value < 100000 && value > 0 ? "Minimum 100 ribu per bulan" : "";
        break;
      case "hargaHari":
        formErrors.hargaHari =
          value < 10000 && value > 0 ? "Minimum 10 ribu per hari" : "";
        break;
      case "hargaMinggu":
        formErrors.hargaMinggu =
          value < 20000 && value > 0 ? "Minimum 20 ribu per minggu" : "";
        break;
      case "hargaTahun":
        formErrors.hargaTahun =
          value < 1000000 && value > 0 ? "Minimum 1 juta per tahun" : "";
        break;
      default:
        break;
    }
    // if (
    //   formErrors.kostName.length < 8 &&
    //   formErrors.kostDesc.length < 8 &&
    //   formErrors.kostLeft <= 0
    // ) {
    //   this.setState({ isValid: false });
    // } else {
    //   this.setState({ isValid: true });
    // }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handlePrevious = () => {
    if (this.state.formStatus > 1) {
      this.setState({ formStatus: this.state.formStatus - 1 });
      if (this.state.formStatus === 2) this.setState({ isValid: true });
    } else if (this.state.formStatus === 4) {
      this.setState({ formStatus: 1 });
    }
  };
  render() {
    const { formErrors } = this.state;

    return (
      <React.Fragment>
        <div className="property-wrapper">
          {this.authorizeUser()}
          <NavigationBar />
          <div className="form-status-wrapper">
            <span
              className={
                this.state.formStatus === 1 ? "form-status-active" : ""
              }
            >
              1. Data Lokasi
            </span>
            <span
              className={
                this.state.formStatus === 2 ? "form-status-active" : ""
              }
            >
              2. Data Kost
            </span>
            <span
              className={
                this.state.formStatus === 3 ? "form-status-active" : ""
              }
            >
              3. Fasilitas Kost
            </span>
            <span
              className={
                this.state.formStatus === 4 ? "form-status-active" : ""
              }
            >
              4. Data Pemilik
            </span>
          </div>
          <div
            style={{
              display: this.state.formStatus === 1 ? "" : "none"
            }}
          >
            <div style={{ margin: "0 auto" }}>
              <div className="input-data-lokasi">
                <div className="input-data-form">
                  <h1>Input Data Lokasi</h1>
                </div>
                <MyLeaflet updateAddr={this.handleAddress} />
                <h5>
                  Silakan klik pada peta atau geser pin hingga sesuai lokasi
                  kost
                </h5>
              </div>
            </div>
            {this.state.address === null ? (
              <div
                style={{
                  textAlign: "center",
                  border: "1px solid #ccc",
                  padding: "12px",
                  width: "800px",
                  margin: "0 auto"
                }}
              >
                Binus University
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  border: "1px solid #ccc",
                  padding: "12px",
                  width: "800px",
                  margin: "0 auto"
                }}
              >
                {this.state.address["display_name"]}
              </div>
            )}
            <div className="input-data-lokasi">
              <div className="input-data-form">
                <h5>Alamat lengkap kost *wajib diisi</h5>
                <input
                  type="text"
                  placeholder="Tulis alamat lengkap kost"
                  noValidate
                  onChange={this.handleChange}
                  name="kostAddr"
                  className={formErrors.kostAddr.length > 0 ? "errorBox" : null}
                  autoFocus
                />
                {formErrors.kostAddr.length > 0 && (
                  <span className="errorMsg">{formErrors.kostAddr}</span>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              display: this.state.formStatus === 2 ? "" : "none",
              margin: "0 auto"
            }}
          >
            <div className="input-data-lokasi">
              <div className="input-data-form">
                <h5>Nama Kost</h5>
                <input
                  type="text"
                  placeholder="Tulis Nama Kost"
                  noValidate
                  onChange={this.handleChange}
                  name="kostName"
                  className={formErrors.kostName.length > 0 ? "errorBox" : null}
                  autoFocus
                />
                {formErrors.kostName.length > 0 && (
                  <span className="errorMsg">{formErrors.kostName}</span>
                )}
                <h5>
                  Saran penulisan nama: Kost (spasi) Nama Kost (spasi) Kecamatan
                  (spasi) Nama Kota
                </h5>
                <h5>Kost Type</h5>
                <div className="input-data-dropdown">
                  <select
                    id="kost-type"
                    name="kostType"
                    onChange={this.handleChange}
                  >
                    <option value="Putri">Putri</option>
                    <option value="Putra">Putra</option>
                    <option value="Campur">Campur</option>
                  </select>
                </div>
                <h5>Luas Kamar</h5>
                <input
                  type="number"
                  placeholder="Input Luas Kamar"
                  required
                  name="kostArea"
                  onChange={this.handleChange}
                  className={formErrors.kostArea.length > 0 ? "errorBox" : null}
                />
                {formErrors.kostArea.length > 0 && (
                  <span className="errorMsg">{formErrors.kostArea}</span>
                )}
                <h5>Jumlah Kamar Total</h5>
                <input
                  type="number"
                  placeholder="Input Total Kamar"
                  required
                  name="kostTotal"
                  onChange={this.handleChange}
                  className={
                    formErrors.kostTotal.length > 0 ? "errorBox" : null
                  }
                />{" "}
                {formErrors.kostTotal.length > 0 && (
                  <span className="errorMsg">{formErrors.kostTotal}</span>
                )}
                <h5>Jumlah Kamar Kosong Saat Ini</h5>
                <input
                  type="number"
                  placeholder="Input Kost Left"
                  noValidate
                  onChange={this.handleChange}
                  name="kostLeft"
                  className={formErrors.kostLeft.length > 0 ? "errorBox" : null}
                />
                {formErrors.kostLeft.length > 0 && (
                  <span className="errorMsg">{formErrors.kostLeft}</span>
                )}
                <h5>Harga Kamar</h5>
                <input
                  type="number"
                  placeholder="Input Harga Kamar Per Bulan"
                  required
                  onChange={this.handleChange}
                  name="hargaBulan"
                  className={
                    formErrors.hargaBulan.length > 0 ? "errorBox" : null
                  }
                />
                {formErrors.hargaBulan.length > 0 && (
                  <span className="errorMsg">{formErrors.hargaBulan}</span>
                )}
                <input
                  type="number"
                  placeholder="Input Harga Kamar Per Hari"
                  required
                  name="hargaHari"
                  className={
                    formErrors.hargaHari.length > 0 ? "errorBox" : null
                  }
                  onChange={this.handleChange}
                />
                {formErrors.hargaHari.length > 0 && (
                  <span className="errorMsg">{formErrors.hargaHari}</span>
                )}
                <input
                  type="number"
                  placeholder="Input Harga Kamar Per Minggu"
                  required
                  name="hargaMinggu"
                  className={
                    formErrors.hargaMinggu.length > 0 ? "errorBox" : null
                  }
                  onChange={this.handleChange}
                />
                {formErrors.hargaMinggu.length > 0 && (
                  <span className="errorMsg">{formErrors.hargaMinggu}</span>
                )}
                <input
                  type="number"
                  placeholder="Input Harga Kamar Per Tahun"
                  required
                  name="hargaTahun"
                  className={
                    formErrors.hargaTahun.length > 0 ? "errorBox" : null
                  }
                  onChange={this.handleChange}
                />
                {formErrors.hargaTahun.length > 0 && (
                  <span className="errorMsg">{formErrors.hargaTahun}</span>
                )}
                <h5>Description</h5>
                <input
                  type="text"
                  placeholder="Kost Description"
                  noValidate
                  onChange={this.handleChange}
                  name="kostDesc"
                  className={formErrors.kostDesc.length > 0 ? "errorBox" : null}
                />
                {formErrors.kostDesc.length > 0 && (
                  <span className="errorMsg">{formErrors.kostDesc}</span>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              display: this.state.formStatus === 3 ? "" : "none",
              margin: "0 auto"
            }}
          >
            <div className="input-data-lokasi">
              <div className="input-data-form">
                <h1>INPUT FASILITAS KOST</h1>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      padding: "10px"
                    }}
                  >
                    {/* <Facilities handleFac={this.handleFacility} /> */}
                    <input
                      type="checkbox"
                      style={{
                        margin: "0",
                        padding: "0",
                        width: "10px"
                      }}
                      value="WiFi"
                      ref="WiFi"
                      onClick={this.handleFacility}
                    />
                    <span>WiFi</span>
                  </div>
                  <div
                    style={{
                      padding: "10px"
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{
                        margin: "0",
                        padding: "0",
                        width: "10px"
                      }}
                      value="Akses kunci 24 jam"
                      ref="akses24"
                      onClick={this.handleFacility}
                    />
                    <span>Akses Kunci 24 Jam</span>
                  </div>
                  <div
                    style={{
                      padding: "10px"
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{
                        margin: "0",
                        padding: "0",
                        width: "10px"
                      }}
                    />
                    <span>Bisa Pasutri</span>
                  </div>
                  <div
                    style={{
                      padding: "10px"
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{
                        margin: "0",
                        padding: "0",
                        width: "10px"
                      }}
                    />
                    <span>Parkir Mobil</span>
                  </div>
                </div>
                <h5>Kamar Mandi</h5>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      padding: "10px"
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{
                        margin: "0",
                        padding: "0",
                        width: "10px"
                      }}
                    />
                    <span>Dalam</span>
                  </div>
                  <div
                    style={{
                      padding: "10px"
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{
                        margin: "0",
                        padding: "0",
                        width: "10px"
                      }}
                    />
                    <span>Luar</span>
                  </div>
                </div>
                <h5>Foto-foto Kost</h5>
                <h5 style={{ color: "red" }}>Contoh foto landscape</h5>
                <img
                  src="https://ihatetomatoes.net/demos/_rw/01-real-estate/tn_property04.jpg"
                  alt="contoh-landscape"
                  style={{ height: "200px" }}
                />
                <h1>Upload Image</h1>
                <form onSubmit={this.onFormImageSubmit}>
                  <input
                    type="file"
                    onChange={this.onChangeImage}
                    accept="image/*"
                  />
                  <button type="submit">Upload Image</button>
                </form>
              </div>
            </div>
          </div>
          <div
            style={{
              display: this.state.formStatus === 4 ? "" : "none",
              margin: "0 auto"
            }}
          >
            <div className="input-data-lokasi">
              <div className="input-data-form">
                <h1>INPUT DATA PEMILIK/PENGELOLA</h1>
                <h5>Nama *wajib diisi</h5>
                <input type="text" placeholder="Input Nama" required />
                <h5>Email</h5>
                <input type="text" placeholder="Input Email" required />
                {/* <label>Accept license and agreement</label> */}
                <button type="submit" onClick={this.handleSubmit}>
                  Submit Data
                </button>
              </div>
            </div>
          </div>
          <div className="input-data-lokasi">
            <div className="input-data-form">
              <div className="input-button-wrapper">
                <div
                  style={{
                    display: this.state.formStatus === 1 ? "none" : ""
                  }}
                >
                  <button type="submit" onClick={this.handlePrevious}>
                    Previous
                  </button>
                </div>
                <button
                  type="submit"
                  onClick={this.handleChangeForm}
                  style={{
                    display: this.state.isValid === false ? "none" : ""
                  }}
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default InputProperty;
