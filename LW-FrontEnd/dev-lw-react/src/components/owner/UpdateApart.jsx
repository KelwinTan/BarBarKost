import React, { Component } from 'react'
import Footer from '../home/Footer';
import { UserNav } from '../user/navbar/UserNav';
import MyLeaflet from '../map/MyLeaflet';
import Axios from 'axios';
import LoadingScreen from '../utilities/LoadingScreen';
import { getProfile, InsertApart } from "../user/login-register/UserFunctions";
import { Link, Redirect } from "react-router-dom";

export class UpdateApart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
            address: "",
            apartCity: "",
            addrReal: "Your Address",
            formStatus: 1,
            image: "",
            Facility: "AC",
            apartType: "Studio",
            email: "",
            apartArea: "",
            apartFloors: "",
            hargaBulan: "",
            hargaHari: "",
            hargaMinggu: "",
            hargaTahun: "",
            apartCondition: "Good",
            apartFacilities: "",
            apartName: "",
            ownerEmail: "",
            apartAddr: "",
            apartDesc: "",
            formErrors: {
                apartAddr: "",
                apartName: "",
                apartType: "",
                apartLeft: "",
                apartDesc: "",
                apartType: "",
                apartArea: "",
                apartFloors: "",
                hargaBulan: "",
                hargaMinggu: "",
                hargaTahun: "",
                hargaHari: "",
                apartCondition: ""
            },
            isValid: false,
            userType: 2,
            ownerName: "",
            banner: null,
            video: null,
            picture360: null,
            selectedFile: null,
            ownerId: null,
            additionalInformation: "",
            currKost: null,
        };
    }

    fileUploadHandler = (formData) => {
        // const fd = new FormData();
        const config = {
            header: {
                "content-type": "multipart/form-data"
            }
        }
        if (this.state.selectedFile === null) {
            return;
        }

        for (let index = 0; index < this.state.selectedFile.length; index++) {
            const element = this.state.selectedFile[index];
            formData.append('image[]', element);
        }
        // fd.append('user_id', this.state.userID);
        // fd.append('type', "Kost");
        console.log(this.state.selectedFile);
        // axios.post("api/upload-image", fd, config).then(res => {
        //   console.log(res);
        // });
    }

    handleSubmit = e => {
        e.preventDefault();
        const ApartFormData = new FormData();
        const config = {
            header: {
                "content-type": "multipart/form-data"
            }
        }

        ApartFormData.append('id', this.state.currKost["id"]);
        ApartFormData.append('name', this.state.apartName);
        ApartFormData.append('description', this.state.apartDesc);
        ApartFormData.append('prices', this.state.hargaHari);
        ApartFormData.append('city', this.state.apartAddr);
        ApartFormData.append('address', this.state.address["display_name"]);

        ApartFormData.append('total_rooms', this.state.kostTotal);
        ApartFormData.append('room_left', this.state.kostLeft);
        ApartFormData.append('longitude', this.state.lng);
        ApartFormData.append('latitude', this.state.lat);
        ApartFormData.append('kost_gender', this.state.kostType);
        ApartFormData.append('unit_area', this.state.apartArea);
        ApartFormData.append('unit_facilities', this.state.apartFacilities);
        ApartFormData.append('unit_floor', this.state.apartFloors);
        ApartFormData.append('unit_type', this.state.apartType);
        ApartFormData.append('unit_condition', this.state.apartCondition);
        ApartFormData.append('additional_information', this.state.apartCondition);

        ApartFormData.append('owner_id', this.state.ownerId);

        if (this.state.banner !== null) {
            ApartFormData.append('banner', this.state.banner[0]);
        }
        if (this.state.picture360 !== null) {
            ApartFormData.append('picture360', this.state.picture360[0]);
        }
        if (this.state.video !== null) {
            ApartFormData.append('video', this.state.video[0]);
        }
        this.fileUploadHandler(ApartFormData);

        Axios.post("/api/owner-update-apartment", ApartFormData, config).then(
            res => {
                console.log(res);
            }
        ).catch(err => {
            console.log(err.response);
        })
    };

    async componentDidMount() {
        const { handle } = this.props.match.params
        const { apart_slug } = this.props.location.state
        this.setState({ slug: apart_slug });
        console.log(apart_slug);
        const fd = new FormData();
        fd.append("slug", apart_slug);
        await Axios.post("/api/owner-get-apartment", fd).then(
            res => {
                console.log(res);
                this.setState({
                    currKost: res.data,
                })
            }
        )
        await this.setState({
            apartName: this.state.currKost['name'],
            apartAddr: this.state.currKost['address'],
            apartDesc: this.state.currKost['description'],
            apartArea: this.state.currKost['unit_area'],
            apartFloors: this.state.currKost['unit_floor'],
            apartType: this.state.currKost['unit_type'],
            apartCity: this.state.currKost['city']
        })
        getProfile().then(res => {
            console.log(res);
            this.setState({
                ownerName: res.user.name,
                ownerEmail: res.user.email,
                ownerId: res.user.id,
                join: res.user.created_at,
                pictureID: res.user.picture_id,
                userType: res.user.type
            });
        });
    }

    bannerSelectHandler = event => {
        console.log(event.target.files);
        this.setState({
            banner: event.target.files
        })
    }

    videoSelectHandler = event => {
        this.setState({
            video: event.target.files
        });
    }

    picture360Handler = event => {
        console.log(event.target.files);
        this.setState({
            picture360: event.target.files
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

    // fileUpload = e => {
    //     const url = "api/fileupload";
    //     const formData = { file: this.state.image };
    //     return post(url, formData)
    //         .then(response => console.log(response))
    //         .catch(error => {
    //             console.log(error.response);
    //         });
    // };

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
            case "apartAddr":
                formErrors.apartAddr =
                    value.length < 10 && value.length > 0
                        ? "Minimum 10 characters required"
                        : "";
                if (value.length >= 10) {
                    this.setState({ isValid: true });
                } else {
                    this.setState({ isValid: false });
                }
                break;
            case "apartName":
                formErrors.apartName =
                    value.length < 8 && value.length > 0
                        ? "Minimum 8 characters required"
                        : "";
                break;
            case "apartDesc":
                formErrors.apartDesc =
                    value.length < 8 && value.length > 0
                        ? "Minimum 8 characters required"
                        : "";
                if (value.length >= 8) {
                    this.setState({ isValid: true });
                } else {
                    this.setState({ isValid: false });
                }
                break;
            case "apartArea":
                formErrors.apartArea =
                    value < 100 && value > 0 ? "Minimum 100 metres squared" : "";
                break;
            case "apartFloors":
                formErrors.apartFloors =
                    value < 2 && value > 0 ? "Minimum 1 floor" : "";
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
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };

    fileSelectedHandler = event => {
        // console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files
        })
    }

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
                    <UserNav />
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
                            2. Data Apartment
                </span>
                        <span
                            className={
                                this.state.formStatus === 3 ? "form-status-active" : ""
                            }
                        >
                            3. Fasilitas Apartment
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
                                    <h1>Update Data Lokasi Apartment</h1>
                                </div>
                                <MyLeaflet updateAddr={this.handleAddress} />
                                <h5>
                                    Silakan klik pada peta atau geser pin hingga sesuai lokasi
                                    Apart
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
                                <h5>Kota Apartment *wajib diisi</h5>
                                <input
                                    type="text"
                                    placeholder="Tulis kota Apartment"
                                    noValidate
                                    onChange={this.handleChange}
                                    name="apartAddr"
                                    defaultValue={this.state.apartCity}
                                    className={
                                        formErrors.apartAddr.length > 0 ? "errorBox" : null
                                    }
                                    autoFocus
                                />
                                {formErrors.apartAddr.length > 0 && (
                                    <span className="errorMsg">{formErrors.apartAddr}</span>
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
                                <h5>Nama Apartment</h5>
                                <input
                                    type="text"
                                    placeholder="Tulis Nama Apartment"
                                    noValidate
                                    onChange={this.handleChange}
                                    defaultValue={this.state.apartName}
                                    name="apartName"
                                    className={
                                        formErrors.apartName.length > 0 ? "errorBox" : null
                                    }
                                    autoFocus
                                />
                                {formErrors.apartName.length > 0 && (
                                    <span className="errorMsg">{formErrors.apartName}</span>
                                )}

                                <h5>
                                    Saran penulisan nama: apart (spasi) Nama apart (spasi)
                                    Kecamatan (spasi) Nama Kota
                    </h5>
                                <h5>Apartment Type</h5>
                                <div className="input-data-dropdown">
                                    <select
                                        id="apart-type"
                                        name="apartType"
                                        onChange={this.handleChange}
                                    >
                                        <option value="Studio">Studio</option>
                                        <option value="Loft">Loft</option>
                                        <option value="Triplex">Triplex</option>
                                    </select>
                                </div>
                                <h5>Unit Area</h5>
                                <input
                                    type="number"
                                    defaultValue={this.state.apartArea}
                                    placeholder="Input Area Unit"
                                    required
                                    name="apartArea"
                                    onChange={this.handleChange}
                                    className={
                                        formErrors.apartArea.length > 0 ? "errorBox" : null
                                    }
                                />
                                {formErrors.apartArea.length > 0 && (
                                    <span className="errorMsg">{formErrors.apartArea}</span>
                                )}
                                <h5>Unit Floor</h5>
                                <input
                                    type="number"
                                    placeholder="Input Total Floors"
                                    required
                                    name="apartFloors"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.apartFloors}
                                    className={
                                        formErrors.apartFloors.length > 0 ? "errorBox" : null
                                    }
                                />{" "}
                                {formErrors.apartFloors.length > 0 && (
                                    <span className="errorMsg">{formErrors.apartFloors}</span>
                                )}
                                <h5>Unit Condition</h5>
                                <div className="input-data-dropdown">
                                    <select
                                        id="apart-condition"
                                        name="apartCondition"
                                        onChange={this.handleChange}
                                    >
                                        <option value="Good">Good</option>
                                        <option value="Great">Great</option>
                                        <option value="Pristine">Pristine</option>
                                    </select>
                                </div>
                                <h5>Unit Facilities</h5>
                                <div className="input-data-dropdown">
                                    <select
                                        id="apart-facility"
                                        name="apartFacilities"
                                        onChange={this.handleChange}
                                    >
                                        <option value="Parking">Parking</option>
                                        <option value="Swimming">Swimming</option>
                                        <option value="Sport">Sport</option>
                                    </select>
                                </div>
                                {formErrors.apartName.length > 0 && (
                                    <span className="errorMsg">{formErrors.apartName}</span>
                                )}
                                <h5>Unit Public Facilities</h5>
                                <input
                                    type="text"
                                    placeholder="Input Public Facilities"
                                    noValidate
                                    onChange={this.handleChange}
                                    name="apartPublicFacilities"
                                    className={
                                        formErrors.apartDesc.length > 0 ? "errorBox" : null
                                    }
                                />
                                {formErrors.apartDesc.length > 0 && (
                                    <span className="errorMsg">{formErrors.apartDesc}</span>
                                )}
                                <h5>Parking Facilities</h5>
                                <input
                                    type="text"
                                    placeholder="Input Public Facilities"
                                    noValidate
                                    onChange={this.handleChange}
                                    name="parkingFacilities"
                                    className={
                                        formErrors.apartDesc.length > 0 ? "errorBox" : null
                                    }
                                />
                                {formErrors.apartDesc.length > 0 && (
                                    <span className="errorMsg">{formErrors.apartDesc}</span>
                                )}

                                {/* {formErrors.apartLeft.length > 0 && (
                      <span className="errorMsg">{formErrors.apartLeft}</span>
                    )} */}
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
                                <h5>Additional Information</h5>
                                <input
                                    type="text"
                                    placeholder="Input Additional Information"
                                    noValidate
                                    onChange={this.handleChange}
                                    name="additionalInformation"
                                    className={
                                        formErrors.apartDesc.length > 0 ? "errorBox" : null
                                    }
                                />

                                <h5>Additional Fees</h5>
                                <input
                                    type="text"
                                    placeholder="Input Additional Fees"
                                    noValidate
                                    onChange={this.handleChange}
                                    name="additionalFees"
                                    className={
                                        formErrors.apartDesc.length > 0 ? "errorBox" : null
                                    }
                                />

                                <h5>Description</h5>
                                <input
                                    type="text"
                                    placeholder="Apartment Description"
                                    noValidate
                                    defaultValue={this.state.apartDesc}
                                    onChange={this.handleChange}
                                    name="apartDesc"
                                    className={
                                        formErrors.apartDesc.length > 0 ? "errorBox" : null
                                    }
                                />
                                {formErrors.apartDesc.length > 0 && (
                                    <span className="errorMsg">{formErrors.apartDesc}</span>
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
                                <h1>INPUT FASILITAS Apartment</h1>
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
                                <h5>Foto-foto Apartment</h5>
                                <h5 style={{ color: "red" }}>Contoh foto landscape</h5>
                                <img
                                    src="https://ihatetomatoes.net/demos/_rw/01-real-estate/tn_property04.jpg"
                                    alt="contoh-landscape"
                                    style={{ height: "200px" }}
                                />
                                <h1>Upload Image</h1>
                                <h2>Upload Kosan Pictures</h2>
                                {/* <form onSubmit={this.onFormImageSubmit}>
                      <input
                        type="file"
                        onChange={this.onChangeImage}
                        accept="image/*"
                      />
                      <button type="submit">Upload Image</button>
                    </form> */}
                                <input type="file" onChange={this.fileSelectedHandler} multiple accept="image/*" />
                                <h2>Upload Banner Picture</h2>
                                <input
                                    type="file"
                                    onChange={this.bannerSelectHandler}
                                    accept="image/*"
                                />
                                <h2>Upload Picture 360</h2>
                                <input
                                    type="file"
                                    onChange={this.picture360Handler}
                                    accept="image/*"
                                />
                                <h2>Upload Video</h2>
                                <input
                                    type="file"
                                    onChange={this.videoSelectHandler}
                                    accept="video/*"
                                />
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
                                <input type="text" placeholder="Input Nama" value={this.state.ownerName} />
                                <h5>Email</h5>
                                <input type="text" placeholder="Input Email" value={this.state.ownerEmail} />
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
                                        display: this.state.formStatus === 4 ? "none" : ""
                                    }}
                                >
                                    Lanjutkan
                    </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default UpdateApart
