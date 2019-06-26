import React, { Component } from 'react'
import { UserNav } from '../user/navbar/UserNav';
import Footer from '../home/Footer';

export class ManageTransaction extends Component {
    render() {
        return (
            <React.Fragment>
                <UserNav />
                Manage Traansaction
                <Footer />
            </React.Fragment>
        )
    }
}

export default ManageTransaction
