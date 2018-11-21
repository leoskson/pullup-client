import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './navbar';

class AboutPage extends Component {
    render() {
        const { config } = this.props;
        if (!config.headers) {
            return <Redirect to='/login' />
        }
        return (
            <div>
                <Navbar />
                About Page
            </div>
        );
    }
}

function mapStateToProps({ config }) {
    return { config };
}

export default connect(mapStateToProps, {})(AboutPage);
