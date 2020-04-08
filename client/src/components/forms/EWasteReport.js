// Needed React Modules
import React, { Component, Fragment } from 'react';

//Imported Bootstrap elements
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

//import ImageClassifier from './ImageClassifier'; - This is an alternative image classifier component

//Imported Image Classifier Component
import ImageClassifier from './ReactUploadImage';

// const GOOGLE_API_KEY= "AIzaSyAGG9b0Xrge2Ve_c0MiJn-bWhARVmVFgK8";


//Component Specification
class EWasteReport extends Component {

    //This is executed once the user submits
    onSubmit = e => {
        console.log('Form selected');
        alert("Your report was successfully sent, please await an email with further instructions")
    }

    constructor(props){
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            userAddress: null
        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.reverseCoordinates = this.reverseCoordinates.bind(this);
    }

    getLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
        }else{
            alert("Geolocation is not supported by this browser.");
        }
    }

    getCoordinates(position){
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        this.reverseCoordinates();
    }

    reverseCoordinates(){
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${this.state.latitude}&longitude=${this.state.longitude}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => this.setState({
            userAddress: data.locality
        }))
        .catch(error => alert(error))
    }

    handleLocationError(error){
        switch(error.code){
            case error.PERMISSION_DENIED:
                alert("Allow your location to be sent to increase the credibility of your submission.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get the user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred")
                break;
            default:
                alert("An unknown error occurred")
        }
    }
 

    render(){
        
        //The following is rendered/displayed on the browser

        return( 
     
            <Fragment> {/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}
                
                <h2 className="ml-5" style={{textAlign: "center"}}>Report E-Waste Form</h2>
                {this.getLocation()}
                

                {/* E-Waste Form */}
                <Form onSubmit={this.onSubmit}>

                    <FormGroup>       

                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Enter your name" className="mb-3" required/>

                        <Label for="desc">Description</Label>
                        <Input type="text" name="desc" id="desc" placeholder="Enter E-Waste description" className="mb-3" required/>
                        
                        <Label for="loc">Location</Label>
                        <Input type="text" name="loc" id="loc" placeholder="Enter your location" className="mb-3" required/>

                        <Label for="loc2">Current Location</Label>
                        <Input type="text" name="loc2" id="loc2" placeholder={this.state.userAddress} className="mb-3" readOnly/>
                                               

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