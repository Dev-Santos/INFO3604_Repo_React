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
import { registerBeneficiary } from '../../actions/beneficiaryActions';


//Component Specification
class BeneficiaryRegisterForm extends Component{
    
    //This variable keeps track of the different states in the component
    //And it must be set with initial values
    state = {
        comp_name: '',
        comp_add: '',
        comp_website: '',
        comp_email: '',
        comp_tel: '',
        comp_cp_fname: '',
        comp_cp_lname: '',
        comp_pos: '',
        comp_cp_tel: '',
        comp_cp_email: '',
        password: '',
        password2: '',
        confirm: null,
        msg: null,
    }

    //These are additional properties (both state variables and functions) of the component that can be accessed at any point
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        msg: PropTypes.string,
        error: PropTypes.object.isRequired,
        registerBeneficiary: PropTypes.func.isRequired
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

        //Capture the information provided on the registration form, which is stored in the state of the component
        const { comp_name, comp_add, comp_website, comp_email,  comp_tel, comp_cp_fname, comp_cp_lname, comp_pos, comp_cp_tel, comp_cp_email, password, password2} = this.state;

        //Simple validation
        if( !comp_name || !comp_add || !comp_website ||!comp_email || !comp_tel || !comp_cp_fname || !comp_cp_lname || !comp_pos || !comp_cp_tel || !comp_cp_email || !password || !password2){
            
            this.setState({msg: 'Please enter all fields'});

        }else{
            
            //Password validation 
            if (password === password2){

                //Create a beneficiary object
                const newBen = {
                    comp_name, comp_add, comp_website, comp_email,  comp_tel, comp_cp_fname, comp_cp_lname, comp_pos, comp_cp_tel, comp_cp_email, password
                }

                console.log(newBen);

                this.onReset();
                
                //Utilises the registerBeneficiary function in the beneficiaryActions file in the actions folder
                //Aims to create a record in the beneficiaries table
                this.props.registerBeneficiary(newBen);

            }else{
                
                window.alert('Your passwords do not match');

            }

        }
        
    }

    //Set the state of the component to its initial values
    resetState = () => {
        this.setState({
            msg: null,
            confirm: null,
            comp_name: '',
            comp_add: '',
            comp_website: '',
            comp_email: '',
            comp_tel: '',
            comp_cp_fname: '',
            comp_cp_lname: '',
            comp_pos: '',
            comp_cp_tel: '',
            comp_cp_email: '',
            password: '',
            password2: '',   
        });
    }

    //This is executed when the 'Clear All fields' button is clicked on the form
    onReset = e => {

        this.resetState();
        
        //Reset or clear all fields in the form
        document.getElementById('benef_form').reset();
    }


    render(){

        //The following is rendered/displayed on the browser
        return(
            <div>

                <h2 style={{textAlign: 'center'}}>Beneficiary Registration Form</h2>

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
                <Form id="benef_form" onSubmit={this.onSubmit} onReset={this.onReset}>

                    <FormGroup>

                        <Label for="comp_name">Company Name</Label>
                        <Input type="text" name="comp_name" id="comp_name" onChange={this.onChange} className="mb-3" required/>
                        
                        <Label for="comp_add">Company Address</Label>
                        <Input type="text" name="comp_add" id="comp_add" onChange={this.onChange} className="mb-3" required/>
                
                        <Label for="comp_email">Company Email</Label>
                        <Input type="email" name="comp_email" id="comp_email" onChange={this.onChange} className="mb-3" required/>
                
                        <Label for="comp_website">Company Website</Label>
                        <Input type="text" name="comp_website" id="comp_website" onChange={this.onChange} className="mb-3" required/>
                        
                        <Label for="comp_tel">Company Telephone Contact   (Format: 123-4567)</Label>
                        <Input type="tel" name="comp_tel" id="comp_tel" placeholder="Format: 123-4567" onChange={this.onChange} className="mb-3" pattern="[0-9]{3}-[0-9]{4}" required/>
                        
                        <Label for="comp_cp_fname">Company Contact Person First Name</Label>
                        <Input type="text" name="comp_cp_fname" id="comp_cp_fname" onChange={this.onChange} className="mb-3" required/>
                        
                        <Label for="comp_cp_lname">Company Contact Person Last Name</Label>
                        <Input type="text" name="comp_cp_lname" id="comp_cp_lname" onChange={this.onChange} className="mb-3" required/>
                        
                        <Label for="comp_pos">Contact Person's Position</Label>
                        <Input type="text" name="comp_pos" id="comp_pos" onChange={this.onChange} className="mb-3" required/>

                        <Label for="comp_cp_tel">Contact Person's Telephone Contact   (Format: 123-4567)</Label>
                        <Input type="tel" name="comp_cp_tel" id="comp_cp_tel" placeholder="Format: 123-4567" onChange={this.onChange} className="mb-3" pattern="[0-9]{3}-[0-9]{4}" required/>

                        <Label for="comp_cp_email">Contact Person's Email</Label>
                        <Input type="email" name="comp_cp_email" id="comp_cp_email" onChange={this.onChange} className="mb-3" />

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
    msg: state.reg.msg,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

//This is where the imported connect module incorporates all the functions/actions from the actions folder and states from the reducers folder into the actual component.
export default connect(mapStateToProps, { registerBeneficiary })(BeneficiaryRegisterForm);