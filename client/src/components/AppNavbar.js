import React, { Component, Fragment } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from "./auth/Logout";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class AppNavbar extends Component{
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState( {
            isOpen: !this.state.isOpen});
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    
    render(){
        
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <Fragment>
                <Nav.Item>
                    <Nav.Link href="#">Donate</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#">Request</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                        <Nav.Link href="/api/ereport">Make EWaste Report</Nav.Link> 
                </Nav.Item>
                <Nav.Item>
                    <Logout/>
                </Nav.Item>
                <Nav.Item>
                    <span className="navbar-text mr-3 ml-3">
                        <strong>{user ? `Welcome ${user.name}`: ''}</strong>
                    </span>
                </Nav.Item>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <Nav.Item>
                    <RegisterModal/>
                </Nav.Item>
                <Nav.Item className="mr-5">
                    <LoginModal/>
                </Nav.Item>
            </Fragment>
        );

        return(
            <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/api/home">RSC E-Waste System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/api/home">Home</Nav.Link>
                <Nav.Link href="/api/gallery">Gallery</Nav.Link>
                <Nav.Link href="/api/aboutus">About Us</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Nav>
                    {isAuthenticated ? authLinks: guestLinks}
                </Nav>     
            </Navbar.Collapse>
            </Navbar>
        );
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);