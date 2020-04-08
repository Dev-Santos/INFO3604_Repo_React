// Needed React Modules
import React, { Component, Fragment } from 'react';

//Imported Bootstrap elements
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

//import ImageClassifier from './ImageClassifier'; - This is an alternative image classifier component

//Imported Image Classifier Component
// import ImageClassifier from './ReactUploadImage';

// const GOOGLE_API_KEY= "AIzaSyAGG9b0Xrge2Ve_c0MiJn-bWhARVmVFgK8";


//Component Specification
class request extends Component {

    //This is executed once the user submits
    onSubmit = e => {
        console.log('Form selected');
        alert("Your request was successfully sent, after reviewing your request, an email will be sent with further instructions")
    }

    
    render(){
        
        //The following is rendered/displayed on the browser

        return( 
     
            <Fragment> {/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}
                
                <h2 className="ml-5" style={{textAlign: "center"}}>Request Item</h2>           

                {/* Item Request Form */}
                <Form onSubmit={this.onSubmit}>

                    <FormGroup>       

                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Enter your name" className="mb-3" required/>

                        <Label for="dept">Company/Club</Label>
                        <Input type="text" name="dept" id="dept" placeholder="Enter your company/club" className="mb-3" required/>

                        <Label for="req">Request Item</Label>
                        <Input type="text" name="req" id="req" placeholder="Enter the item which you require" className="mb-3" required/>
                        
                        <Label for="reason">Reason for Item</Label>
                        <Input type="text" name="reason" id="reason" placeholder="Enter the reason for getting this device" className="mb-3" required/>
                        
                        <Label for="loc">Location to Deliver Item</Label>
                        <Input type="text" name="loc" id="loc" placeholder="Enter the location for the item to be delivered" className="mb-3" required/>
                                              
                        <Button color="dark" style={{marginTop: '2rem', fontSize: '20px'}} type="submit">Submit Form</Button> 

                    </FormGroup>

                </Form> 
                
            </Fragment>
        );
    }
}

export default request;//Export the component to be used