//Needed React modules
import React, { Component, Fragment } from 'react';

//Imported Bootstrap elements
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';

//Imported Components to be included
import CreateAdmin from './auth/CreateAdmin';
import LoginModal from './auth/LoginModal';
import Logout from "./auth/Logout";

//This module is used to connect to all the different actions/functions in the actions folder 
//and the different states/events in the reducers folder
import {connect} from 'react-redux';

import PropTypes from 'prop-types';


//Component Specification as a class
class AppNavbar extends Component{

    //The following variable is responsible storing whether or not a user is authenticated and their information
    //It is pulled from the reducers folder
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    
    render(){
        
        //Capture the user information and authentication status from the state of the component
        const {isAuthenticated, user} = this.props.auth;

        //NavBar options for authenticated users (Club Members and Club Executives)
        //We can define HTML/JSX elements before rendering them on the browser
        const authLinks = (
            <Fragment> {/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}
                
                <Nav.Item>
                        <Nav.Link href="/api/dashboard">View Dashboard</Nav.Link> 
                </Nav.Item>
                
                <Nav.Item>
                    <Logout/> {/* Positioning of the Logout Modal */}
                </Nav.Item>

                <Nav.Item>
                    {/* This is how you see Welcome 'your_name' on the navbar when you login  */}
                    <span className="navbar-text mr-3 ml-3">
                        <strong>{user ? `Welcome ${user.name}`: ''}</strong>
                    </span>
                </Nav.Item>

            </Fragment>
        );

        //NavBar options for the general public (guest users)
        //We can define HTML/JSX elements before rendering them on the browser
        const guestLinks = (
            <Fragment>
                
                
                {/* NavBar Register Dropdown */}
                <NavDropdown title="Register" id="basic-nav-dropdown">
                    
                    <NavDropdown.Item href="/api/register/club_member">
                        As A Club Member
                    </NavDropdown.Item>

                    <NavDropdown.Item href="/api/register/donor">
                        As A Donor
                    </NavDropdown.Item>

                    <NavDropdown.Item>As A Beneficiary</NavDropdown.Item>

                    <NavDropdown.Item >
                        <CreateAdmin/>
                    </NavDropdown.Item>

                </NavDropdown> 


                <Nav.Item className="mr-5">
                    <LoginModal/> {/* Positioning of the Login Modal */}
                </Nav.Item>

            </Fragment>
        );

        //NavBar options for authenticated donors
        //We can define HTML/JSX elements before rendering them on the browser
        const donorLinks = (
            <Fragment> {/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}
                    
                <Nav.Item>
                        <Nav.Link href="/api/donate">Submit Donation</Nav.Link> 
                </Nav.Item>
                
                <Nav.Item>
                    <Logout/> {/* Positioning of the Logout Modal */}
                </Nav.Item>

                <Nav.Item>
                    {/* This is how you see Welcome 'your_name' on the navbar when you login  */}
                    <span className="navbar-text mr-3 ml-3">
                        <strong>{user ? `Welcome ${user.name}`: ''}</strong>
                    </span>
                </Nav.Item>

            </Fragment>
        );


        //The following is rendered/displayed on the browser
        return(
            
            <Navbar bg="dark" expand="lg" variant="dark">
                
                {/* Display of the System name */}
                <Navbar.Brand href="/api/home">RSC E-Waste System</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* The following links are shown regardless if the user is authenticated or not */}
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav className="mr-auto">
                        
                        <Nav.Item>
                            <Nav.Link href="/api/home">Home</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href="/api/gallery">Gallery</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href="/api/aboutus">About Us</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                                <Nav.Link href="/api/ereport">Make EWaste Report</Nav.Link> 
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href="/api/donate">Donate</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href="/api/request">Request</Nav.Link>
                        </Nav.Item>

                    </Nav>

                    <Nav>
                        
                        
                        {/* If you are not authenticated (guest user) -> render the respective navbar options*/}
                        {!isAuthenticated && guestLinks}

                        {/* If you are a Club Executive/Club Member -> render the respective navbar options*/}
                        {isAuthenticated && (user.userType === 1 || user.userType === 2) && authLinks}

                        {/* If you are an authenticated donor -> render the respective navbar options*/}
                        {isAuthenticated && user.userType === 4 && donorLinks}

                    </Nav>
                        
                </Navbar.Collapse>

            </Navbar>
        );
    }
};

//This is used to import various states of the system as defined in the reducers folder
const mapStateToProps = (state) => ({
    auth: state.auth
});


//This is where the imported connect module incorporates all the functions/actions from the actions folder and states from the reducers folder into the actual component.
export default connect(mapStateToProps, null)(AppNavbar);