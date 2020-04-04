// Needed React Modules
import React, { Component, Fragment } from 'react';

//Imported Bootstrap elements
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

//import ImageClassifier from './ImageClassifier'; - This is an alternative image classifier component

//Imported Image Classifier Component
import ImageClassifier from './ReactUploadImage';


//Component Specification
class EWasteReport extends Component {

    //This is executed once the user submits
    onSubmit = e => {
        console.log('Form selected');
    }

    render(){
        
        //The following is rendered/displayed on the browser

        return( 
     
            <Fragment> {/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}
                
                <h2 className="ml-5" style={{textAlign: "center"}}>Report E-Waste Form</h2>

                {/* E-Waste Form */}
                <Form onSubmit={this.onSubmit}>

                    <FormGroup>       

                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Enter your name" className="mb-3" required/>

                        <Label for="desc">Description</Label>
                        <Input type="text" name="desc" id="desc" placeholder="Enter E-Waste description" className="mb-3" required/>
                        
                        <Label for="loc">Location</Label>
                        <Input type="text" name="loc" id="loc" placeholder="Enter the location" className="mb-3" required/>

                        <Label for="">Image of E-waste</Label>
                        
                        <ImageClassifier/>{/* Positioning of Image Classifier Component*/}

                        <Button color="dark" style={{marginTop: '2rem', fontSize: '20px'}} type="submit">Submit Form</Button> 

                    </FormGroup>

                </Form> 
                
            </Fragment>
        );
    }
}

export default EWasteReport;//Export the component to be used