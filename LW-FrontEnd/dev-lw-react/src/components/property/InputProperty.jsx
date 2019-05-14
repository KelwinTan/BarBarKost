import React, { Component } from "react";
import NavBar from "../home/NavBar";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./Property.scss";
import { NavigationBar } from "../home/NavigationBar";
import L from "leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import MyLeaflet from "../map/MyLeaflet";
import axios, { post } from "axios";

export class InputProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
      address: null,
      addrReal: "Your Address",
      formStatus: 1,
      image: "",
      formErrors: {
        kostAddr: "",
        kostName: "",
        kostType: "",
        kostLeft: 1,
        kostDesc: ""
      },
      isValid: false
    };
  }

  onFormImageSubmit = e => {
    e.preventDefault();
    this.fileUpload(this.state.image);
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

  handleAddress = update => {
    this.setState({ address: update });
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
      this.setState({ formStatus: this.state.formStatus + 1, isValid: false });
      if (this.state.formStatus === 2) this.setState({ isValid: true });
      console.log(this.state.formStatus);
    }
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
          <div style={{ display: this.state.formStatus === 1 ? "" : "none" }}>
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
                  <select id="kost-type" name="kost">
                    <option value="putri">Putri</option>
                    <option value="putra">Putra</option>
                    <option value="campur">Campur</option>
                  </select>
                </div>
                <h5>Luas Kamar</h5>
                <input type="number" placeholder="Input Luas Kamar" required />
                <h5>Jumlah Kamar Total</h5>
                <input type="number" placeholder="Input Total Kamar" required />
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
                />
                <input
                  type="number"
                  placeholder="Input Harga Kamar Per Hari"
                  required
                />
                <input
                  type="number"
                  placeholder="Input Harga Kamar Per Minggu"
                  required
                />
                <input
                  type="number"
                  placeholder="Input Harga Kamar Per Tahun"
                  required
                />
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
                    <input
                      type="checkbox"
                      style={{
                        margin: "0",
                        padding: "0",
                        width: "10px"
                      }}
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
                  <input type="file" onChange={this.onChangeImage} />
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
                <button type="submit">Submit Data</button>
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
