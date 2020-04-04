// Needed React Modules
import React, { Component, Fragment } from 'react';

//Imported Bootstrap elements
import { NavLink} from 'reactstrap';

//This module is used to connect to all the different actions/functions in the actions folder 
//and the different states/events in the reducers folder
import {connect} from 'react-redux';

//Different actions/functions imported from the actions folder
import {logout} from '../../actions/authActions';

import PropTypes from 'prop-types';

//Component Specification
export class Logout extends Component{

    //These are additional properties (both state variables and functions) of the component that can be accessed at any point
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {

        //The following is rendered/displayed on the browser
        return(
          
          <Fragment> {/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}

              {/* Text and Link on the Navigation Bar  */}
              <NavLink onClick={this.props.logout} href="/api/home">{ /* the onClick event executes the logout function in the authActions file in the actions folder */}
                Logout
              </NavLink>

          </Fragment>  
        );
    }
}

//This is where the imported connect module incorporates all the functions/actions from the actions folder and states from the reducers folder into the actual component.
export default connect(null, {logout})(Logout);