// Needed React Modules
import React, { Component, Fragment } from 'react';

//Imported Bootstrap elements
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

//This module is used to connect to all the different actions/functions in the actions folder 
//and the different states/events in the reducers folder
import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import { submitDonationRequest } from '../../actions/beneficiaryActions'


// const GOOGLE_API_KEY= "AIzaSyAGG9b0Xrge2Ve_c0MiJn-bWhARVmVFgK8";

//Component Specification
class request extends Component {

    state ={
        name: '',
        email: '',
        req: '',
        quan: '',
        reason: '',
        loc: '',
        msg: null,
        confirm: null
    }

    //These are additional properties (both state variables and functions) of the component that can be accessed at any point
    static propTypes = {
        auth: PropTypes.object.isRequired,
        submitDonationRequest: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired,
        msg: PropTypes.string
    }

    componentDidUpdate(prevProps) {
        
        const { error, msg } = this.props;
        if( error !== prevProps.error){
            //Check for register error
            if(error.id === 'FORM_FAIL'){
                this.setState({ msg: error.msg.msg });
                //Remove after 3 seconds
                setTimeout(() => this.setState({msg: null}), 3000);
            }else{
                this.setState({ msg: null});
            }
        }

        if( msg !== prevProps.msg){
            //Check for confirmation message
            if(msg){
                this.setState({ confirm: msg });
                //Remove after 3 seconds
                setTimeout(() => this.setState({confirm: null}), 3000);
            }else{
                this.setState({ confirm: null});
            }
        }

    }

    //Executed everytime an input field on the form is changed - the value is stored in the state of the component
    onChange = e => {
        const { user } = this.props.auth
        if (user){
            this.setState({name: user.name});
            this.setState({email: user.email});
        }
        this.setState({ [e.target.name]: e.target.value });
    }

    //This is executed once the user submits
    onSubmit = e => {

        e.preventDefault();

        //Extract states from the component
        const { name, email, req, quan, reason, loc } = this.state;

        //Create donation request object
        const newRequest = {
            name, email ,request: req, quantity: quan, reason, location: loc
        };        

        console.log(newRequest);

        //Utilise the submitDonationRequest function in the beneficiaryActions file in the actions folder (line 13)
        //Aims to submit the donation request to the backend db
        this.props.submitDonationRequest(newRequest);

        //Reset the fields on the input form
        this.onReset();

    }

    onReset = e => {
        this.setState({
            name: '',
            email: '',
            req: '',
            quan: '',
            reason: '',
            loc: '',
            msg: null,
            confirm: null
        });

        //Reset or clear all fields in the form
        document.getElementById('request_form').reset();
    }
    
    render(){
        
        const { user, isAuthenticated } = this.props.auth;

        // Donation Request Form (View) for authenticated beneficiaries 
        //We can define HTML/JSX elements before rendering them on the browser
        const view = (
            <Fragment> {/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}
                
                <div className="bordered">
                <h2 className="ml-5" style={{textAlign: "center"}}>Donation Request Form</h2>           

                {/* Item Request Form */}
                <Form onSubmit={this.onSubmit} onReset={this.onReset} id="request_form" >
                    
                    {/* If there is an error message, display it on the form  */}
                    {this.state.msg ? (
                        window.alert(this.state.msg)
                    ): null}
                    
                    {/* If there is a successful submission, notify the user of this  */}
                    {this.state.confirm ? (
                        window.alert(this.state.confirm)
                    ): null}


                    <FormGroup>       

                        <Label for="name">Company/Club</Label>
                        <Input type="text" name="name" id="name" placeholder={ user ? user.name : "Enter your company/club"} className="mb-3" required readOnly/>

                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder={ user ? user.email : "Enter your email"} className="mb-3" required readOnly/>

                        <Label for="req">Request Item</Label>
                        <Input type="text" name="req" id="req" placeholder="Enter a brief description of the item which you require" className="mb-3" onChange={this.onChange} required/>

                        <Label for="quan">Estimated Quantity</Label>
                        <Input type="number" name="quan" id="quan" placeholder="Enter an estimated quantity amount" className="mb-3" onChange={this.onChange} required/>
                        
                        <Label for="reason">Reason for Item</Label>
                        <Input type="text" name="reason" id="reason" placeholder="Enter the reason for getting this device" className="mb-3" onChange={this.onChange} required/>
                        
                        <Label for="loc">Location to Deliver Item</Label>
                        <Input type="text" name="loc" id="loc" placeholder="Enter the location for the item to be delivered" className="mb-3" onChange={this.onChange} required/>

                        <div>
                            <Button color="dark" style={{ marginTop: '2rem', fontSize: '20px'}} type="reset" >Clear Fields</Button> 
                            <Button color="dark" style={{marginTop: '2rem', fontSize: '20px', marginLeft: '20px'}} type="submit">Submit Request</Button> 
                        </div>                  
                        

                    </FormGroup>

                </Form> 
                </div>                
            </Fragment>
        )

        //The following is rendered/displayed on the browser

        return( 
            <div>
                {/* Only If the user is authenticated as a beneficiary, render the elements in view variable (line 118) */}
                { isAuthenticated ? view : null }
            </div>
        );
    }
}

//This is used to import various states of the system as defined in the reducers folder
const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error,
    msg: state.form.msg
});

export default connect(mapStateToProps, {submitDonationRequest})(request);//Export the component to be used