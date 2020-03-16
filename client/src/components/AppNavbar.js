import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
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
            isOpen: !this.setState.isOpen});
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    
    render(){
        
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.name}`: ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        );

        return(
            <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authLinks: guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
    }  
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);