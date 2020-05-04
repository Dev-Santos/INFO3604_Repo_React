// Needed React Modules
import React, {Component} from 'react';

//Imported Bootstrap elements
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    UncontrolledAlert
} from 'reactstrap';

//This module is used to connect to all the different actions/functions in the actions folder 
//and the different states/events in the reducers folder
import {connect} from 'react-redux';

import PropTypes from 'prop-types';

//Different actions/functions imported from the actions folder
import {login} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';


//Component Specification
class LoginModal extends Component{
    
    //This variable keeps track of the different states in the component
    //And it must be set with initial values
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    //These are additional properties (both state variables and functions) of the component that can be accessed at any point
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if( error !== prevProps.error){
            //Check for register error
            if(error.id === 'LOGIN_FAIL'){
                this.setState({ msg: error.msg.msg });

                //Removes the error message on the screen after 4 seconds
                setTimeout(() => this.setState({msg: null}), 4000);

            }else{
                this.setState({ msg: null});
            }
        }
        //If authenticated, close the modal
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    //This is executed everytime the login modal toggles
    toggle = () => {
        
        //Clear errors
        //Uses the clearErrors function in the errorActions file in the actions folder
        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal
        });
    }

    //Executed everytime an input field on the form is changed - the value is stored in the state of the component
    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
    }


    //This is executed once the user submits
    onSubmit = (e) =>{
        e.preventDefault();

        //Capture the user's email and password on the login form, which is stored in the state of the component
        const { email, password} = this.state;

        //Create a record object
        const user = {
            email,
            password
        }

        //Attempts to authenticate a user
        //Uses the login function in the authActions file in the actions folder
        this.props.login(user);

    }

    render(){

        //The following is rendered/displayed on the browser
        return(
            <div>
                
                {/* Text and Link on the Navigation Bar  */}
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>

                {/* Login Modal  */}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>

                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>

                    <ModalBody>

                        {/* If there is an error message, display it on the form  */}
                        {this.state.msg ? (
                            <UncontrolledAlert color="danger" fade={true}>{this.state.msg}</UncontrolledAlert>
                        ): null}
                        
                        {/* Login Form */}
                        <Form onSubmit={this.onSubmit}>

                            <FormGroup>

                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Enter email" onChange={this.onChange} className="mb-3"/>
                                
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Enter password" onChange={this.onChange} minLength="8" className="mb-3"/>
                                
                                <Button color="dark" style={{marginTop: '2rem'}} block>Login</Button>

                            </FormGroup>

                        </Form>

                    </ModalBody>

                </Modal>

            </div>
        );
    }
}


//This is used to import various states of the system as defined in the reducers folder
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});


//This is where the imported connect module incorporates all the functions/actions from the actions folder and states from the reducers folder into the actual component.
export default connect(mapStateToProps, { login, clearErrors })(LoginModal);