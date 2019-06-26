import React, { Component } from 'react'
import Echo from 'laravel-echo';
import axios from 'axios';

export class ChatTest extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            message: '',
            channelID: '',
            msgReceive: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }   

    connection(){
        window.io = require('socket.io-client');
        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: 'http://127.0.0.1:6001'
        })
    }

    live_chat(channelID){
        window.Echo.channel('chat.' + channelID).listen('MessageSend', e =>{
            console.log(e);
        });
        this.setState({channelID,});
    }
    
    async componentWillMount(){
        await this.connection();
        this.live_chat('c240db9a-2440-31f5-9d99-12e0af747634');
    }

    handleSubmit(event){
        event.preventDefault();
        const url = '/api/SendChat';
        const data = {
            message: this.state.message,
        }
        // const config = {
        //     header: 
        // }

        axios.post(url, data).then(
            res => {
                console.log(res);
            }
        ).catch(err=>{
            console.log(err);
        });
        
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        console.log(this.state.message);
        this.setState({[name]: value});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="message">Message</label>
                    <input type="text" id="messageTXT" name="message" onChange={this.handleChange}/>
                    <input type="submit" value="Send"/>
                </form>
            </div>
        )
    }
}

export default ChatTest
