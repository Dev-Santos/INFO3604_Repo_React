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

//Imported functions from the actions folder
import { registerIndDonor, registerCompDonor } from '../../actions/donorActions';
import {clearErrors} from '../../actions/errorActions';
import { clearRegMessage } from '../../actions/regActions';

import PropTypes from 'prop-types';

//Component Specification
class DonorRegisterForm extends Component{
    
    //This variable keeps track of the different states in the component
    //And it must be set with initial values
    state = {
        modal: false,
        fname: '',
        lname: '',
        email: '',
        tel: '',
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
        msg: null,
        confirm: null,
        donorType: null,
    }

    //These are additional properties (both state variables and functions) of the component that can be accessed at any point
    static propTypes = {
        msg: PropTypes.string,
        error: PropTypes.object.isRequired,
        reg: PropTypes.object.isRequired,
        registerIndDonor: PropTypes.func.isRequired,
        registerCompDonor: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        clearRegMessage: PropTypes.func.isRequired
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
        const {donorType} = this.state;   
        
        //If the user registered as individual donor
        if(donorType === 'individual'){
            
            //Capture the information provided on the registration form, which is stored in the state of the component
            const { fname, lname, email, tel, password, password2 } = this.state

            //Simple validation
            if( !fname || !lname || !email || !tel || !password || !password2){

                this.setState({msg: 'Please enter all fields'});

            }else{
                
                //Password validation
                if (password === password2){
                      
                    //Create a donor object
                    const indDonor = {
                        fname, lname, email, tel, type: 'ind', password
                    }

                    console.log(indDonor);

                    //Reset or clear all fields in the form
                    document.getElementById('reg_form').reset();

                    //Utilises the registerIndDonor function in the donorActions file in the actions folder
                    //Aims to create an individual record in the donors table
                    this.props.registerIndDonor(indDonor);
                    
                }else{
                    console.log('Your passwords do not match')
                    this.setState({msg: 'Your passwords do not match'});
                }

            }
            
        }else{//If the user registered as company donor

            //Capture the information provided on the registration form, which is stored in the state of the component
            const { comp_name, comp_add, comp_website, comp_email,  comp_tel, comp_cp_fname, comp_cp_lname, comp_pos, comp_cp_tel, comp_cp_email, password, password2} = this.state;

            //Simple validation
            if( !comp_name || !comp_add || !comp_website ||!comp_email || !comp_tel || !comp_cp_fname || !comp_cp_lname || !comp_pos || !comp_cp_tel || !comp_cp_email || !password || !password2){
                
                this.setState({msg: 'Please enter all fields'});

            }else{
                   
                //Password validation
                if (password === password2){

                    //Create a donor object
                    const compDonor = {
                        comp_name, comp_add, comp_website, comp_email,  comp_tel, comp_cp_fname, comp_cp_lname, comp_pos, comp_cp_tel, comp_cp_email, type: 'comp', password
                    }

                    console.log(compDonor);

                    //Reset or clear all fields in the form
                    document.getElementById('reg_form').reset();

                    //Utilises the registerCompDonor function in the donorActions file in the actions folder
                    //Aims to create a company record in the donors table
                    this.props.registerCompDonor(compDonor);
                
                }else{

                    console.log('Your passwords do not match')
                    this.setState({msg: 'Your passwords do not match'});

                }

            }
            
        }

        this.props.clearRegMessage();
        this.props.clearErrors();

        //Reset the form fields
        this.onReset();
        
    }

    //Set the state of the component to its initial values
    resetState = () => {
        this.setState({
            fname: '',
            lname: '',
            email: '',
            tel: '',
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
            msg: null,
            confirm: null,
            donorType: null,
        });
    }

    //This is executed when the 'Clear All fields' button is clicked on the form
    onReset = e => {
        this.resetState();
    }

    //Once the user selects the 'Individual Donor' button
    indDonorForm = () =>{

        //Reset or clear all fields in the form
        document.getElementById('reg_form').reset();

        //Hide the Company Donor Registration Form
        document.getElementById('comp_don_form').style.display = 'none';
        
        //Show the Indiviual Donor Registration Form and Password Section
        document.getElementById('ind_don_form').style.display = 'inline';
        document.getElementById('password_sec').style.display = 'inline';

        //Capture the donor type in the state of the component
        this.setState({donorType: 'individual'});

    }

    //Once the user selects the 'Company Donor' button
    compDonorForm = () =>{
        
        //Reset or clear all fields in the form
        document.getElementById('reg_form').reset();

        //Hide the Individual Donor Registration Form
        document.getElementById('ind_don_form').style.display = 'none';

        //Show the Company Donor Registration Form and Password Section
        document.getElementById('comp_don_form').style.display = 'inline';
        document.getElementById('password_sec').style.display = 'inline';

        //Capture the donor type in the state of the component
        this.setState({donorType: 'company'});

    }

    render(){

        //The following is rendered/displayed on the browser
        return(
            <div class="bordered">

                <h2 style={{textAlign: 'center'}}>Donor Account Registration Form</h2>

                <br/><br/>

                <p>Please indicate one of the following:</p>

                {/* Buttons for Donor Type Options */}
                <Button outline color="primary" onClick={this.indDonorForm}>Individual Donor</Button>{' '}   
                <Button outline color="primary" onClick={this.compDonorForm}>Company Donor</Button>

                <br/><br/>

                {/* If there is an error message, display an alert  */}
                {this.state.msg ? (
                    window.alert(this.state.msg)
                ): null}
                
                {/* If there is a successful submission, notify the user of this  */}
                {this.state.confirm ? (
                    window.alert(this.state.confirm)
                ): null}

                {/* Overall Registration Form */}
                <Form id="reg_form" onSubmit={this.onSubmit} onReset={this.onReset}>

                    <FormGroup>

                        {/* Individual Donor Registration Form - Initially set not to be displayed */}
                        <FormGroup name="ind_don_form" id="ind_don_form" style={{display: 'none'}}>

                            <Label for="fname">First Name</Label>
                            <Input type="text" name="fname" id="fname" onChange={this.onChange} className="mb-3"/>

                            <Label for="lname">Last Name</Label>
                            <Input type="text" name="lname" id="lname" onChange={this.onChange} className="mb-3"/>
                    
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" onChange={this.onChange} className="mb-3" />
                            
                            <Label for="tel">Telephone Contact   (Format: 123-4567)</Label>
                            <Input type="tel" name="tel" id="tel" placeholder="Format: 123-4567" onChange={this.onChange} className="mb-3" pattern="[0-9]{3}-[0-9]{4}"/>

                        </FormGroup>

                        {/* Company Donor Registration Form - Initially set not to be displayed */}
                        <FormGroup name="comp_don_form" id="comp_don_form" style={{display: 'none'}}>

                            <Label for="comp_name">Company Name</Label>
                            <Input type="text" name="comp_name" id="comp_name" onChange={this.onChange} className="mb-3" />
                            
                            <Label for="comp_add">Company Address</Label>
                            <Input type="text" name="comp_add" id="comp_add" onChange={this.onChange} className="mb-3" />
                    
                            <Label for="comp_email">Company Email</Label>
                            <Input type="email" name="comp_email" id="comp_email" onChange={this.onChange} className="mb-3" />
                    
                            <Label for="comp_website">Company Website</Label>
                            <Input type="text" name="comp_website" id="comp_website" onChange={this.onChange} className="mb-3" />
                            
                            <Label for="comp_tel">Company Telephone Contact   (Format: 123-4567)</Label>
                            <Input type="tel" name="comp_tel" id="comp_tel" placeholder="Format: 123-4567" onChange={this.onChange} className="mb-3" pattern="[0-9]{3}-[0-9]{4}"/>
                            
                            <Label for="comp_cp_fname">Company Contact Person First Name</Label>
                            <Input type="text" name="comp_cp_fname" id="comp_cp_fname" onChange={this.onChange} className="mb-3" />
                            
                            <Label for="comp_cp_lname">Company Contact Person Last Name</Label>
                            <Input type="text" name="comp_cp_lname" id="comp_cp_lname" onChange={this.onChange} className="mb-3" />
                            
                            <Label for="comp_pos">Contact Person's Position</Label>
                            <Input type="text" name="comp_pos" id="comp_pos" onChange={this.onChange} className="mb-3" />

                            <Label for="comp_cp_tel">Contact Person's Telephone Contact   (Format: 123-4567)</Label>
                            <Input type="tel" name="comp_cp_tel" id="comp_cp_tel" placeholder="Format: 123-4567" onChange={this.onChange} className="mb-3" pattern="[0-9]{3}-[0-9]{4}"/>

                            <Label for="comp_cp_email">Contact Person's Email</Label>
                            <Input type="email" name="comp_cp_email" id="comp_cp_email" onChange={this.onChange} className="mb-3" />
                            
                        </FormGroup>

                        {/* Password Section - Initially set not to be displayed */}
                        <FormGroup name="password_sec" id="password_sec" style={{display: 'none'}}>

                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" onChange={this.onChange} minLength="8" className="mb-3" />

                            <Label for="password2">Re-enter Password</Label>
                            <Input type="password" name="password2" id="password2" onChange={this.onChange} minLength="8" className="mb-3" />

                            <Button color="dark" style={{marginTop: '2rem', width:'130px'}} block type="submit">Register</Button>
                            <Button color="dark" style={{marginTop: '2rem', width:'130px'}} block type="reset">Clear All Fields</Button>

                        </FormGroup>
                        

                    </FormGroup>

                </Form>

            </div>
        );
    }
}

//This is used to import various states of the system as defined in the reducers folder
const mapStateToProps = (state) => ({
    reg: state.reg,
    msg: state.reg.msg,
    error: state.error
});

//This is where the imported connect module incorporates all the functions/actions from the actions folder and states from the reducers folder into the actual component.
export default connect(mapStateToProps, {registerIndDonor, registerCompDonor, clearErrors, clearRegMessage})(DonorRegisterForm);