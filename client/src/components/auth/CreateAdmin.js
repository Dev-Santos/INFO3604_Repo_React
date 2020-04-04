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
import {clearErrors} from '../../actions/errorActions';
import {getClubs} from '../../actions/clubActions';
import { registerUser, clearRegMessage, createAdmin } from '../../actions/regActions';


//Component Specification
class adminModal extends Component{
    
    //This variable keeps track of the different states in the component
    //And it must be set with initial values
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null,
        clubID: null
    }

    //These are additional properties (both state variables and functions) of the component that can be accessed at any point
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        msg: PropTypes.string,
        error: PropTypes.object.isRequired,
        registerUser: PropTypes.func.isRequired,
        createAdmin: PropTypes.func.isRequired,
        clearRegMessage: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        club: PropTypes.object.isRequired
    }

    //Once the component is loaded use the getClubs function from the regActions file in the actions folder
    //Pulls all the clubs information from the database
    componentDidMount(){
        this.props.getClubs();
    }

    componentDidUpdate(prevProps) {
        
        const { error, isAuthenticated } = this.props;
        if( error !== prevProps.error){
            //Check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg });
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

    //This is executed everytime the registration modal toggles
    toggle = () => {

        //Clear messages or errors
        //Uses the clearErrors and clearRegMessage function in the errorActions file in the actions folder
        this.props.clearRegMessage();
        this.props.clearErrors();
        
        //Reset to the initial state
        this.resetState();
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

        //Capture the information provided on the registration form, which is stored in the state of the component
        const {name, email, clubID, password} = this.state;

        console.log(clubID);

        //Create a record object
        const newRecord = {
            name, email, clubID, password
        };

        console.log(newRecord);

        //Reset or clear all fields in the form
        document.getElementById('reg_form').reset();

        //Utilise the createAdmin function in the regActions file in the actions folder
        //Aims to create a record in the registrations table
        this.props.createAdmin(newRecord);

    }

    //Set the state of the component to its initial values
    resetState = () => {
        this.setState({
            name: '',
            email: '',
            password: '',
            msg: null,
            clubID: null    
        });
    }

    //This is executed when the 'Clear All fields' button is clicked on the form
    onReset = e => {
        this.setState({msg: null});
        this.resetState();
    }

    render(){

        //Captures all the club information to be used in the dropdown menu of the form
        const {clubs} = this.props.club;

        //The following is rendered/displayed on the browser
        return(
            <div>

                {/* Text and Link on the Navigation Bar  */}
                <NavLink onClick={this.toggle} href="#">
                    Create Admin
                </NavLink>

                {/* Registration Modal  */}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>

                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>

                    <ModalBody>

                        {/* If there is an error message, display it on the form  */}
                        {this.state.msg ? (
                            <UncontrolledAlert color="danger" fade={true}>{this.state.msg}</UncontrolledAlert>
                        ): null}
                        
                        {/* If there is a successful submission, notify the user of this  */}
                        {this.props.msg ? (
                            <UncontrolledAlert color="success" fade={true} >{this.props.msg}</UncontrolledAlert>
                        ): null}

                        {/* Registration Form */}
                        <Form id="reg_form" onSubmit={this.onSubmit} onReset={this.onReset}>
                            
                            <FormGroup>

                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" placeholder="Enter name" onChange={this.onChange} className="mb-3"/>
                        
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Enter email" onChange={this.onChange} className="mb-3"/>
                                
                                <FormGroup>

                                    <Label for="exampleSelect">Club Location</Label>
                                    <Input type="select" name="clubID" id="clubID" onChange={this.onChange} >
                                            <option hidden></option>
                                            
                                        {/* Using the club information from the db, the different locations populate in the dropdown menu */}
                                        {   
                                            clubs.map(({id, location}) => (
                                            <option key={id} value={id}>{location}</option>
                                            ))
                                        }

                                    </Input>

                                </FormGroup>

                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Enter password" onChange={this.onChange} minLength="8" className="mb-3"/>

                                <Button color="dark" style={{marginTop: '2rem'}} block type="submit">Register</Button>
                                <Button color="dark" style={{marginTop: '2rem'}} block type="reset">Clear All Fields</Button>

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
    club: state.club,
    msg: state.reg.msg,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

//This is where the imported connect module incorporates all the functions/actions from the actions folder and states from the reducers folder into the actual component.
export default connect(mapStateToProps, { registerUser, clearRegMessage, clearErrors, getClubs, createAdmin })(adminModal);