// Needed React Modules
import React, {Component} from 'react';

//Imported Bootstrap elements
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

//This module is used to connect to all the different actions/functions in the actions folder 
//and the different states/events in the reducers folder
import {connect} from 'react-redux';

import PropTypes from 'prop-types';

//Different actions/functions imported from the actions folder
import {clearErrors} from '../../actions/errorActions';
import {getClubs} from '../../actions/clubActions';
import { registerUser, clearRegMessage } from '../../actions/regActions';


//Component Specification
class CMRegisterForm extends Component{
    
    //This variable keeps track of the different states in the component
    //And it must be set with initial values
    state = {
        modal: false,
        fname: '',
        lname: '',
        email: '',
        password: '',
        password2: '',
        msg: null,
        confirm: null,
        clubID: null
    }

    //These are additional properties (both state variables and functions) of the component that can be accessed at any point
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        msg: PropTypes.string,
        error: PropTypes.object.isRequired,
        registerUser: PropTypes.func.isRequired,
        clearRegMessage: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        club: PropTypes.object.isRequired
    }

    
    //Once the component is loaded, use the getClubs function from the clubActions file in the actions folder
    //Pulls all the clubs information from the database
    componentDidMount(){
        this.props.getClubs();
    }

    componentDidUpdate(prevProps) {
        
        const { error, msg } = this.props;
        if( error !== prevProps.error){
            //Check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg });
                //Remove the error after 3 seconds
                setTimeout(() => this.setState({msg: null}), 3000);
            }else{
                this.setState({ msg: null});
            }
        }

        if( msg !== prevProps.msg){
            //Check for confirmation message
            if(msg){
                this.setState({ confirm: msg });
                //Remove the error after 3 seconds
                setTimeout(() => this.setState({confirm: null}), 3000);
            }else{
                this.setState({ confirm: null});
            }
        }
    }

    //Executed everytime an input field on the form is changed - the value is stored in the state of the component
    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    //This is executed once the user submits
    onSubmit = (e) =>{
        
        e.preventDefault();

        this.setState({msg: null});

        //Capture the information provided on the registration form, which is stored in the state of the component
        const {fname, lname ,email, clubID, password, password2} = this.state;

        //Password validation 
        if (password === password2){
            
            console.log(clubID);

            //Create a record object
            const newRecord = {
                name: fname + " " + lname, email, clubID, password
            };

            console.log(newRecord);

            //Reset the form input fields
            this.onReset();
            
            //Utilises the registerUser function in the regActions file in the actions folder
            //Aims to create a record in the registrations table
            this.props.registerUser(newRecord);

        }else{
            this.setState({msg: 'Your passwords do not match'});
        }

        this.props.clearRegMessage();
        this.props.clearErrors();
        
    }

    //Set the state of the component to its initial values
    resetState = () => {
        this.setState({
            fname: '',
            lname: '',
            email: '',
            password: '',
            password2: null,
            msg: null,
            confirm: null,
            clubID: null    
        });
    }

    //This is executed when the 'Clear All fields' button is clicked on the form
    onReset = e => {
        this.resetState();

        //Reset or clear all fields in the form
        document.getElementById('reg_form').reset();
    }

    render(){

        //Captures all the club information to be used in the dropdown menu of the form
        const {clubs} = this.props.club;

        //The following is rendered/displayed on the browser
        return(
            <div class="bordered">

                <h2 style={{textAlign: 'center'}}>Club Member Account Registration Form</h2>

                <br/><br/>

                {/* If there is an error message, display an alert  */}
                {this.state.msg ? (
                    window.alert(this.state.msg)
                ): null}
                
                {/* If there is a successful submission, notify the user of this  */}
                {this.state.confirm ? (
                    window.alert(this.state.confirm)
                ): null}

                {/* Registration Form */}
                <Form id="reg_form" onSubmit={this.onSubmit} onReset={this.onReset}>

                    <FormGroup>

                        <Label for="fname">First Name</Label>
                        <Input type="text" name="fname" id="fname" placeholder="Enter name" onChange={this.onChange} className="mb-3" required/>

                        <Label for="lname">Last Name</Label>
                        <Input type="text" name="lname" id="lname" placeholder="Enter name" onChange={this.onChange} className="mb-3" required/>
                
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Enter email" onChange={this.onChange} className="mb-3" required/>
                        
                        <FormGroup>

                            <Label for="clubID">Club Location</Label>
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
                        <Input type="password" name="password" id="password" placeholder="Enter password" onChange={this.onChange} minLength="8" className="mb-3" required/>

                        <Label for="password2">Re-enter Password</Label>
                        <Input type="password" name="password2" id="password2" placeholder="Re-enter password" onChange={this.onChange} minLength="8" className="mb-3" required/>

                        <Button color="dark" style={{marginTop: '2rem', width:'130px'}} block type="submit">Register</Button>
                        <Button color="dark" style={{marginTop: '2rem', width:'130px'}} block type="reset">Clear All Fields</Button>

                    </FormGroup>

                </Form>
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
export default connect(mapStateToProps, { registerUser, clearRegMessage, clearErrors, getClubs })(CMRegisterForm);