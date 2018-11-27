import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar as NavigationBar, NavItem, Nav} from 'react-bootstrap';


class Navbar extends Component {
    render() {
        return (
        <NavigationBar inverse collapseOnSelect>
            <NavigationBar.Header>
                <NavigationBar.Brand>
                    <a href="#home">pullUp</a>
                </NavigationBar.Brand>
            </NavigationBar.Header>
            <Nav>
                <LinkContainer to='/about'>
                    <NavItem eventKey={1}>About</NavItem>
                </LinkContainer>
                <LinkContainer to='/user'>
                    <NavItem eventKey={2}>Profile</NavItem>
                </LinkContainer>
                <LinkContainer to='/'>
                    <NavItem eventKey={3}>Reservation</NavItem>
                </LinkContainer>
            </Nav>
        </NavigationBar>
        );
    }
}

export default Navbar;
