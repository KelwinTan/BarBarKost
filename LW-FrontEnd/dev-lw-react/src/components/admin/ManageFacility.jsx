import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import UserNav from '../user/navbar/UserNav';
import { getProfile } from "../user/login-register/UserFunctions";
import LoadingScreen from '../utilities/LoadingScreen';
import axios, { post } from "axios";
import Footer from '../home/Footer';

const icon = ["fa-500px", "fa-address-book", "fa-address-book-o", "fa-address-card", "fa-address-card-o", "fa-adjust", "fa-adn", "fa-align-center", "fa-align-justify", "fa-align-left", "fa-align-right", "fa-amazon", "fa-ambulance", "fa-american-sign-language-interpreting", "fa-anchor", "fa-android", "fa-angellist", "fa-angle-double-down", "fa-angle-double-left", "fa-angle-double-right", "fa-angle-double-up", "fa-angle-down", "fa-angle-left", "fa-angle-right", "fa-angle-up", "fa-apple", "fa-archive", "fa-area-chart", "fa-arrow-circle-down", "fa-arrow-circle-left", "fa-arrow-circle-o-down", "fa-arrow-circle-o-left", "fa-arrow-circle-o-right", "fa-arrow-circle-o-up", "fa-arrow-circle-right", "fa-arrow-circle-up", "fa-arrow-down", "fa-arrow-left", "fa-arrow-right", "fa-arrow-up", "fa-arrows", "fa-arrows-alt", "fa-arrows-h", "fa-arrows-v", "fa-asl-interpreting", "fa-assistive-listening-systems", "fa-asterisk", "fa-at", "fa-audio-description", "fa-automobile", "fa-backward", "fa-balance-scale", "fa-ban", "fa-bandcamp", "fa-bank", "fa-bar-chart", "fa-bar-chart-o", "fa-barcode", "fa-bars", "fa-bath", "fa-bathtub", "fa-battery", "fa-battery-0", "fa-battery-1", "fa-battery-2", "fa-battery-3", "fa-battery-4", "fa-battery-empty", "fa-battery-full", "fa-battery-half", "fa-battery-quarter", "fa-battery-three-quarters", "fa-bed", "fa-beer", "fa-behance", "fa-behance-square", "fa-bell", "fa-bell-o", "fa-bell-slash", "fa-bell-slash-o", "fa-bicycle", "fa-binoculars", "fa-birthday-cake", "fa-bitbucket", "fa-bitbucket-square", "fa-bitcoin", "fa-black-tie", "fa-blind", "fa-bluetooth", "fa-bluetooth-b", "fa-bold", "fa-bolt", "fa-bomb", "fa-book", "fa-bookmark", "fa-bookmark-o", "fa-braille", "fa-briefcase", "fa-btc", "fa-bug", "fa-building", "fa-building-o", "fa-bullhorn", "fa-bullseye", "fa-bus", "fa-buysellads", "fa-cab", "fa-calculator", "fa-calendar", "fa-calendar-check-o", "fa-calendar-minus-o", "fa-calendar-o", "fa-calendar-plus-o", "fa-calendar-times-o", "fa-camera", "fa-camera-retro", "fa-car", "fa-caret-down", "fa-caret-left", "fa-caret-right", "fa-caret-square-o-down", "fa-caret-square-o-left", "fa-caret-square-o-right", "fa-caret-square-o-up", "fa-caret-up", "fa-cart-arrow-down", "fa-cart-plus", "fa-cc", "fa-cc-amex", "fa-cc-diners-club", "fa-cc-discover", "fa-cc-jcb", "fa-cc-mastercard", "fa-cc-paypal", "fa-cc-stripe", "fa-cc-visa", "fa-certificate", "fa-chain", "fa-chain-broken", "fa-check", "fa-check-circle", "fa-check-circle-o", "fa-check-square", "fa-check-square-o", "fa-chevron-circle-down", "fa-chevron-circle-left", "fa-chevron-circle-right", "fa-chevron-circle-up", "fa-chevron-down", "fa-chevron-left", "fa-chevron-right", "fa-chevron-up", "fa-child", "fa-chrome", "fa-circle", "fa-circle-o", "fa-circle-o-notch", "fa-circle-thin", "fa-clipboard", "fa-clock-o", "fa-clone", "fa-close", "fa-cloud", "fa-cloud-download", "fa-cloud-upload", "fa-cny", "fa-code", "fa-code-fork", "fa-codepen", "fa-codiepie", "fa-coffee", "fa-cog", "fa-cogs", "fa-columns", "fa-comment", "fa-comment-o", "fa-commenting", "fa-commenting-o", "fa-comments", "fa-comments-o", "fa-compass", "fa-compress", "fa-connectdevelop", "fa-contao", "fa-copy", "fa-copyright", "fa-creative-commons", "fa-credit-card", "fa-credit-card-alt", "fa-crop", "fa-crosshairs", "fa-css3", "fa-cube", "fa-cubes", "fa-cut", "fa-cutlery", "fa-dashboard", "fa-dashcube", "fa-database", "fa-deaf", "fa-deafness", "fa-dedent", "fa-delicious", "fa-desktop", "fa-deviantart", "fa-diamond", "fa-digg", "fa-dollar", "fa-dot-circle-o", "fa-download", "fa-dribbble", "fa-drivers-license", "fa-drivers-license-o", "fa-dropbox", "fa-drupal", "fa-edge", "fa-edit", "fa-eercast", "fa-eject", "fa-ellipsis-h", "fa-ellipsis-v", "fa-empire", "fa-envelope", "fa-envelope-o", "fa-envelope-open", "fa-envelope-open-o", "fa-envelope-square", "fa-envira", "fa-eraser", "fa-etsy", "fa-eur", "fa-euro", "fa-exchange", "fa-exclamation", "fa-exclamation-circle", "fa-exclamation-triangle", "fa-expand", "fa-expeditedssl", "fa-external-link", "fa-external-link-square", "fa-eye", "fa-eye-slash", "fa-eyedropper", "fa-fa", "fa-facebook", "fa-facebook-f", "fa-facebook-official", "fa-facebook-square", "fa-fast-backward", "fa-fast-forward", "fa-fax", "fa-feed", "fa-female", "fa-fighter-jet", "fa-file", "fa-file-archive-o", "fa-file-audio-o", "fa-file-code-o", "fa-file-excel-o", "fa-file-image-o", "fa-file-movie-o", "fa-file-o", "fa-file-pdf-o", "fa-file-photo-o", "fa-file-picture-o", "fa-file-powerpoint-o", "fa-file-sound-o", "fa-file-text", "fa-file-text-o", "fa-file-video-o", "fa-file-word-o", "fa-file-zip-o", "fa-files-o", "fa-film", "fa-filter", "fa-fire", "fa-fire-extinguisher", "fa-firefox", "fa-first-order", "fa-flag", "fa-flag-checkered", "fa-flag-o", "fa-flash", "fa-flask", "fa-flickr", "fa-floppy-o", "fa-folder", "fa-folder-o", "fa-folder-open", "fa-folder-open-o", "fa-font", "fa-font-awesome", "fa-fonticons", "fa-fort-awesome", "fa-forumbee", "fa-forward", "fa-foursquare", "fa-free-code-camp", "fa-frown-o", "fa-futbol-o", "fa-gamepad", "fa-gavel", "fa-gbp", "fa-ge", "fa-gear", "fa-gears", "fa-genderless", "fa-get-pocket", "fa-gg", "fa-gg-circle", "fa-gift", "fa-git", "fa-git-square", "fa-github", "fa-github-alt", "fa-github-square", "fa-gitlab", "fa-gittip", "fa-glass", "fa-glide", "fa-glide-g", "fa-globe", "fa-google", "fa-google-plus", "fa-google-plus-circle", "fa-google-plus-official", "fa-google-plus-square", "fa-google-wallet", "fa-graduation-cap", "fa-gratipay", "fa-grav", "fa-group", "fa-h-square", "fa-hacker-news", "fa-hand-grab-o", "fa-hand-lizard-o", "fa-hand-o-down", "fa-hand-o-left", "fa-hand-o-right", "fa-hand-o-up", "fa-hand-paper-o", "fa-hand-peace-o", "fa-hand-pointer-o", "fa-hand-rock-o", "fa-hand-scissors-o", "fa-hand-spock-o", "fa-hand-stop-o", "fa-handshake-o", "fa-hard-of-hearing", "fa-hashtag", "fa-hdd-o", "fa-header", "fa-headphones", "fa-heart", "fa-heart-o", "fa-heartbeat", "fa-history", "fa-home", "fa-hospital-o", "fa-hotel", "fa-hourglass", "fa-hourglass-1", "fa-hourglass-2", "fa-hourglass-3", "fa-hourglass-end", "fa-hourglass-half", "fa-hourglass-o", "fa-hourglass-start", "fa-houzz", "fa-html5", "fa-i-cursor", "fa-id-badge", "fa-id-card", "fa-id-card-o", "fa-ils", "fa-image", "fa-imdb", "fa-inbox", "fa-indent", "fa-industry", "fa-info", "fa-info-circle", "fa-inr", "fa-instagram", "fa-institution", "fa-internet-explorer", "fa-intersex", "fa-ioxhost", "fa-italic", "fa-joomla", "fa-jpy", "fa-jsfiddle", "fa-key", "fa-keyboard-o", "fa-krw", "fa-language", "fa-laptop", "fa-lastfm", "fa-lastfm-square", "fa-leaf", "fa-leanpub", "fa-legal", "fa-lemon-o", "fa-level-down", "fa-level-up", "fa-life-bouy", "fa-life-buoy", "fa-life-ring", "fa-life-saver", "fa-lightbulb-o", "fa-line-chart", "fa-link", "fa-linkedin", "fa-linkedin-square", "fa-linode", "fa-linux", "fa-list", "fa-list-alt", "fa-list-ol", "fa-list-ul", "fa-location-arrow", "fa-lock", "fa-long-arrow-down", "fa-long-arrow-left", "fa-long-arrow-right", "fa-long-arrow-up", "fa-low-vision", "fa-magic", "fa-magnet", "fa-mail-forward", "fa-mail-reply", "fa-mail-reply-all", "fa-male", "fa-map", "fa-map-marker", "fa-map-o", "fa-map-pin", "fa-map-signs", "fa-mars", "fa-mars-double", "fa-mars-stroke", "fa-mars-stroke-h", "fa-mars-stroke-v", "fa-maxcdn", "fa-meanpath", "fa-medium", "fa-medkit", "fa-meetup", "fa-meh-o", "fa-mercury", "fa-microchip", "fa-microphone", "fa-microphone-slash", "fa-minus", "fa-minus-circle", "fa-minus-square", "fa-minus-square-o", "fa-mixcloud", "fa-mobile", "fa-mobile-phone", "fa-modx", "fa-money", "fa-moon-o", "fa-mortar-board", "fa-motorcycle", "fa-mouse-pointer", "fa-music", "fa-navicon", "fa-neuter", "fa-newspaper-o", "fa-object-group", "fa-object-ungroup", "fa-odnoklassniki", "fa-odnoklassniki-square", "fa-opencart", "fa-openid", "fa-opera", "fa-optin-monster", "fa-outdent", "fa-pagelines", "fa-paint-brush", "fa-paper-plane", "fa-paper-plane-o", "fa-paperclip", "fa-paragraph", "fa-paste", "fa-pause", "fa-pause-circle", "fa-pause-circle-o", "fa-paw", "fa-paypal", "fa-pencil", "fa-pencil-square", "fa-pencil-square-o", "fa-percent", "fa-phone", "fa-phone-square", "fa-photo", "fa-picture-o", "fa-pie-chart", "fa-pied-piper", "fa-pied-piper-alt", "fa-pied-piper-pp", "fa-pinterest", "fa-pinterest-p", "fa-pinterest-square", "fa-plane", "fa-play", "fa-play-circle", "fa-play-circle-o", "fa-plug", "fa-plus", "fa-plus-circle", "fa-plus-square", "fa-plus-square-o", "fa-podcast", "fa-power-off", "fa-print", "fa-product-hunt", "fa-puzzle-piece", "fa-qq", "fa-qrcode", "fa-question", "fa-question-circle", "fa-question-circle-o", "fa-quora", "fa-quote-left", "fa-quote-right", "fa-ra", "fa-random", "fa-ravelry", "fa-rebel", "fa-recycle", "fa-reddit", "fa-reddit-alien", "fa-reddit-square", "fa-refresh", "fa-registered", "fa-remove", "fa-renren", "fa-reorder", "fa-repeat", "fa-reply", "fa-reply-all", "fa-resistance", "fa-retweet", "fa-rmb", "fa-road", "fa-rocket", "fa-rotate-left", "fa-rotate-right", "fa-rouble", "fa-rss", "fa-rss-square", "fa-rub", "fa-ruble", "fa-rupee", "fa-s15", "fa-safari", "fa-save", "fa-scissors", "fa-scribd", "fa-search", "fa-search-minus", "fa-search-plus", "fa-sellsy", "fa-send", "fa-send-o", "fa-server", "fa-share", "fa-share-alt", "fa-share-alt-square", "fa-share-square", "fa-share-square-o", "fa-shekel", "fa-sheqel", "fa-shield", "fa-ship", "fa-shirtsinbulk", "fa-shopping-bag", "fa-shopping-basket", "fa-shopping-cart", "fa-shower", "fa-sign-in", "fa-sign-language", "fa-sign-out", "fa-signal", "fa-signing", "fa-simplybuilt", "fa-sitemap", "fa-skyatlas", "fa-skype", "fa-slack", "fa-sliders", "fa-slideshare", "fa-smile-o", "fa-snapchat", "fa-snapchat-ghost", "fa-snapchat-square", "fa-snowflake-o", "fa-soccer-ball-o", "fa-sort", "fa-sort-alpha-asc", "fa-sort-alpha-desc", "fa-sort-amount-asc", "fa-sort-amount-desc", "fa-sort-asc", "fa-sort-desc", "fa-sort-down", "fa-sort-numeric-asc", "fa-sort-numeric-desc", "fa-sort-up", "fa-soundcloud", "fa-space-shuttle", "fa-spinner", "fa-spoon", "fa-spotify", "fa-square", "fa-square-o", "fa-stack-exchange", "fa-stack-overflow", "fa-star", "fa-star-half", "fa-star-half-empty", "fa-star-half-full", "fa-star-half-o", "fa-star-o", "fa-steam", "fa-steam-square", "fa-step-backward", "fa-step-forward", "fa-stethoscope", "fa-sticky-note", "fa-sticky-note-o", "fa-stop", "fa-stop-circle", "fa-stop-circle-o", "fa-street-view", "fa-strikethrough", "fa-stumbleupon", "fa-stumbleupon-circle", "fa-subscript", "fa-subway", "fa-suitcase", "fa-sun-o", "fa-superpowers", "fa-superscript", "fa-support", "fa-table", "fa-tablet", "fa-tachometer", "fa-tag", "fa-tags", "fa-tasks", "fa-taxi", "fa-telegram", "fa-television", "fa-tencent-weibo", "fa-terminal", "fa-text-height", "fa-text-width", "fa-th", "fa-th-large", "fa-th-list", "fa-themeisle", "fa-thermometer", "fa-thermometer-0", "fa-thermometer-1", "fa-thermometer-2", "fa-thermometer-3", "fa-thermometer-4", "fa-thermometer-empty", "fa-thermometer-full", "fa-thermometer-half", "fa-thermometer-quarter", "fa-thermometer-three-quarters", "fa-thumb-tack", "fa-thumbs-down"]

// const iconSelector = icon.map((data,i)=>{

//     return(
//             <div key={i} style={{fontSize:"50px"}}>
//                 <input onChange={this.handleIconChange} style={{display: 'none'}} value={data} type="radio" id={i} name="icon" />
//                 <label htmlFor={i} key={i} className={`fa ${icon[i]}`} name={i} value={data}></label>
//             </div>
//     )
// })


export class ManageFacility extends Component {
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
            iconList: null
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
        this.setState({ icons: icon });
    }

    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };

    handleContent = (newContent) => {
        this.setState({
            content: newContent
        })
    }

    handleFacility = () => {
        console.log("object");
        // this.setState

    }

    handleIconClick = () => {
        console.log("Icon Changing");
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ iconName: value });

        console.log(this.state);
    }

    handleGroup = (event) => {
        const { name, value } = event.target;
        this.setState({ iconGroup: value });
        console.log(this.state);
    }

    insertFacility = () => {
        this.setState({ loadingScreen: true });

        const FacilityData = new FormData();
        FacilityData.append('name', this.state.iconName);
        FacilityData.append('icon', this.state.selectedIcon);
        FacilityData.append('group', this.state.iconGroup);
        axios.post("/api/insert-facility", FacilityData).then(
            res => {
                console.log(res);
                this.setState({ loadingScreen: false });
            }
        ).catch(err => {
            this.setState({ formErrors: err.response.data, loadingScreen: false });
            console.log(err.response.data);
            // console.log(this.state.formErrors.data.group);
        });

        // console.log(this.state.formErrors["group"]);
    }

    handleLoading = () => {
        if (this.state.loadingScreen === true) {
            return <LoadingScreen />;
        } else {
            return null;
        }
    };


    render() {
        return (
            <React.Fragment>
                {this.authorizeUser()}
                {this.handleLoading()}
                <UserNav />
                <div style={{ justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center" }} className="float-left responsive-float">
                    <h1>Selected Facilities</h1>
                    <div style={{ display: "flex", flexWrap: "wrap", width: "80%", justifyContent: "center" }}>
                        <div >
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
                        </div>
                        {/* {
                            this.state.selectedIcon.map((data, i) =>
                                <div key={i} style={{ fontSize: "40px" }}>
                                    <label htmlFor={i} key={i} className={`fa ${this.state.selectedIcon[i]}`} name={i} value={data}></label>
                                    <input type="text" onChange={this.handleChange} name={this.state.selectedIcon[i]} />
                                    <select
                                        id="facility-group"
                                        name={`group-${this.state.selectedIcon[i]}`}
                                        onChange={this.handleChange}
                                    >
                                        <option value="Public">Public</option>
                                        <option value="Parking">Parking</option>
                                        <option value="Sports">Sports</option>

                                    </select>
                                </div>
                            )
                        } */}
                    </div>
                    {this.state.formErrors["icon"] ? <div style={{ color: "red" }}>{this.state.formErrors["icon"]}</div> : ""}
                    {this.state.formErrors["name"] ? <div style={{ color: "red" }}>{this.state.formErrors["name"]}</div> : ""}
                    {this.state.formErrors["group"] ? <div style={{ color: "red" }}>{this.state.formErrors["group"]}</div> : ""}
                    <button onClick={this.insertFacility}>Insert Facility</button>
                    <Link to="/facility/update">Update Facility</Link>
                </div>
                <hr />
                <div style={{ alignItems: "center", textAlign: "center", display: "flex", flexDirection: "column", border: "2px solid black", margin: "40px" }}>
                    <h1>New Facilities</h1>
                    <div style={{ display: "flex", flexWrap: "wrap", width: "80%", justifyContent: "center" }}>
                        {
                            this.state.icons.map((data, i) =>
                                <div key={i} style={{ fontSize: "30px" }}>
                                    <input onChange={this.handleIconChange} style={{ display: "none" }} value={data} type="radio" id={i} name="icon" onClick={this.handleIconClick} />
                                    <label  style={{ fontSize: "40px", border: "2px solid white", margin: "5px", padding: "5px" }} htmlFor={i} key={i} className={`fa ${icon[i]}`} name={i} value={data}></label>
                                </div>)
                        }
                    </div>

                    {/* <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-gas-pump" style={{fontSize:"50px"}}></i>
                        </div>
                        <div onClick={this.handleFacility} style={{width:"fit-content" , margin:"20px"}}>
                            <i className="fas fa-parking" style={{fontSize:"50px"}}></i>
                        </div>
                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-ambulance" style={{fontSize:"50px"}}></i>
                        </div>
                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-futbol" style={{fontSize:"50px"}}></i>
                        </div>
                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-basketball-ball" style={{fontSize:"50px"}}></i>
                        </div>
                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-swimming-pool" style={{fontSize:"50px"}}></i>
                        </div>
                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-shipping-fast" style={{fontSize:"50px"}}></i>
                        </div>
                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-wheelchair" style={{fontSize:"50px"}}></i>
                        </div>
                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-umbrella-beach" style={{fontSize:"50px"}}></i>
                        </div>
                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-school" style={{fontSize:"50px"}}></i>
                        </div>
                    </div>
                    <h1>Private Facilities</h1>
                    <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-toilet" style={{fontSize:"50px"}}></i>
                        </div>
                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-trash" style={{fontSize:"50px"}}></i>
                        </div>

                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-fingerprint" style={{fontSize:"50px"}}></i>
                        </div>
                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-bicycle" style={{fontSize:"50px"}}></i>
                        </div>
                        <div onClick={this.handleFacility} style={{width:"fit-content", margin:"20px"}}>
                            <i className="fas fa-envelope" style={{fontSize:"50px"}}></i>
                        </div>
                    </div>
                     */}
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default ManageFacility
