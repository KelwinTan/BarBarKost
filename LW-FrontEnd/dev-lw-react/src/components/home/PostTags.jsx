import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import Footer from './Footer';

export class PostTags extends Component {
    render() {
        return (
            <React.Fragment>
                <UserNav />
                
                <Footer />
            </React.Fragment>
        )
    }
}

export default PostTags
