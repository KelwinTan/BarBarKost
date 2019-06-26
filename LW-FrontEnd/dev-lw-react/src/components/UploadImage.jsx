import React, { Component } from 'react'
import axios from "axios";

export class UploadImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFile: null
        }
    }

    fileSelectedHandler = event =>{
        // console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files
        })
    }

    fileUploadHandler = () =>{
        const fd = new FormData();
        const config = {
            header: {
                "content-type": "multipart/form-data"
            }
        }
        for (let index = 0; index < this.state.selectedFile.length; index++) {
            const element = this.state.selectedFile[index];
            fd.append('image[]', element);
        }
        fd.append('user_id', this.props.user);
        fd.append('type', this.props.type);
        console.log(this.state.selectedFile);
        axios.post("api/upload-image", fd, config).then(res=>{
            console.log(res);
        });
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.fileSelectedHandler} multiple accept="image/*"/>
                {/* <button onClick={this.fileUploadHandler}>Upload File Please</button> */}
            </div>
        )
    }
}

export default UploadImage
