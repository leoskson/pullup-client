import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar as NavigationBar, NavItem, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';


class Navbar extends Component {

    clearHeader() {
        this.props.headers = null;
    }

    render() {
        return (
        <NavigationBar inverse collapseOnSelect>
            <NavigationBar.Header>
                <NavigationBar.Brand>
                    <a href="#home">pullUp</a>
                </NavigationBar.Brand>
            </NavigationBar.Header>
            <Nav>
                {/* <LinkContainer to='/about'>
                    <NavItem eventKey={1}>About</NavItem>
                </LinkContainer> */}
                <LinkContainer to='/user'>
                    <NavItem eventKey={2}>Profile</NavItem>
                </LinkContainer>
                <LinkContainer to='/'>
                    <NavItem eventKey={3}>Reservation</NavItem>
                </LinkContainer>
                <LinkContainer onClick={()=> this.clearHeader()} to='/login'>
                    <NavItem eventKey={4}>Log Out</NavItem>
                </LinkContainer>
            </Nav>
        </NavigationBar>
        );
    }
}

function mapStateToProps({ user, config }) {
    return { user, config };
}

export default connect(mapStateToProps, {})(Navbar);