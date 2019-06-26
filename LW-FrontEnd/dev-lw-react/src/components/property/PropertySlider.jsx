import React, { Component } from 'react'
import slide1 from "../../assets/images/slider/Slide1.jpg";
import slide2 from "../../assets/images/slider/Slide2.jpg";
import slide3 from "../../assets/images/slider/Slide3.jpg";
import slide4 from "../../assets/images/slider/Slide4.jpg";

export class PropertySlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCount: 4,
            property: null
        };
        this.timer = this.timer.bind(this);
    }

    componentDidMount() {
        var intervalID = setInterval(this.timer, 4000);
        this.setState({ intervalID: intervalID, currentCount: this.props.count - 1, property: this.props.property });
        console.log(this.state.property);
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalID);
    }

    timer() {
        // this.setState({ currentCount: this.state.currentCount - 1 });
        if (this.state.currentCount > 0) {
            var newCount = this.state.currentCount - 1;
            this.setState({ currentCount: newCount });
        } else {
            this.setState({ currentCount: this.props.count - 1 });
        }
    }

    render() {
        return (
            <div className="promo-slider">
                {/* {this.state.currentCount} */}
                {/* {this.state.property} */}
                {/* <img src={this.state.property} /> */}
                {this.state.property === null ?
                    ""
                    : <img
                        src={`http://localhost:8000/storage/images/${this.state.property[this.state.currentCount]['filename']}`}
                        alt="Promo Slides"
                        style={{ height: "250px", zIndex: "-1" }}
                    />
                }

            </div>
        )
    }
}

export default PropertySlider
