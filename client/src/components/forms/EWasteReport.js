// Needed React Modules
import React, { Component, Fragment } from 'react';

//Imported Bootstrap elements
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

//The Axios module was also used in the different files in the actions folder
//This is how the front-end component of the system communicates/accesses with the backend api and database (Express & Nodejs)
import axios from 'axios';

//Import module to access Firebase storage bucket
import { storage } from '../../firebase/index';


//This module is used to connect to all the different actions/functions in the actions folder 
//and the different states/events in the reducers folder
import {connect} from 'react-redux';

import PropTypes from 'prop-types';

//Imported the submitEReport function from the formActions file in the actions folder
import { submitEReport } from '../../actions/formActions';

// const GOOGLE_API_KEY= "AIzaSyAGG9b0Xrge2Ve_c0MiJn-bWhARVmVFgK8";

//This functions formats how the classification results are displayed
//It is in the form of list items, it will be called later down
const formatResult = ({ className, probability}) => (
    <li key={className}>
        {`${className}: %${(probability * 100).toFixed(2)}`}
    </li>
);


//Component Specification
class EWasteReport extends Component {

    constructor(props){
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            userAddress: null,
            name: null,
            email: null,
            tel: null,
            desc: null,
            file: '',
            filename: 'Select file',
            imageUrl: null,
            results: {},
            showResults: false,
            classBtn: false, 
            progress: 0
        };

        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.reverseCoordinates = this.reverseCoordinates.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.classify = this.classify.bind(this);

    }

    //Execute the getLocation function only when the component is completely loaded
    componentDidMount(){
        this.getLocation();
    }
 
    //These are additional properties (both state variables and functions) of the component that can be accessed at any point
    static propTypes = {
        error: PropTypes.object.isRequired,
        report: PropTypes.object,
        submitEReport: PropTypes.func.isRequired,
    }

    //Executed everytime an input field on the form is changed - the value is stored in the state of the component
    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    //This is executed once the user submits
    onSubmit = e => {

        e.preventDefault();

        //Captures the current location information from the read-only input field
        const loc =  document.getElementById('loc').placeholder;

        //Captures the top classification result from the hidden input field
        let class_res = document.getElementById('class_res');

        //If the e-waste image submitted was classified
        if (class_res){

            //Store its value
            class_res = class_res.value;

            //The following is repsonsible for creating the name and directory of the image for the firebase database

            //Generates a random number
            const min = 1;
            const max = 2000;
            const random = min + (Math.random() * (max - min));
            
            //Stores today's data in a string variable
            var todayDate = new Date().toISOString().slice(0,10);

            //Concatenates the above elements to generate the name of the file to be stored in firebase
            let storage_name = todayDate + '_' + Math.round(random).toString() + '_' + this.state.filename;

            console.log(storage_name);

            //This function (its a call-back function) is responsible for storing the image in the firebase db
            const uploadTask = storage.ref(`EReports/${class_res}/${storage_name}`).put(this.state.file);

            //Once the state of the callback function changes, do the following
            uploadTask.on('state_changed',
                (snapshot) => {

                    //progress function (This is running while the image upload is in progress)
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({progress});

                },
                (error) => {

                    //error function (This executes once there is an error in the image upload)
                    alert("Error in image upload. Please resubmit your e-waste image");
                    console.log(error);

                },
                () => {

                    //complete function (Once the image has been successfully uploaded)
                    // We want to capture the url where you can download the image just uploaded and store it in the backend database
                    storage.ref(`EReports/${class_res}`).child(storage_name).getDownloadURL() 
                    .then(url => {
                        
                        console.log(url);

                        const { name, email, tel, desc } = this.state;

                        //Construct our E-Waste Report object to be sent to the backend db
                        const newEReport = {
                            rep_person: name, email, telephone: tel, description: desc, location: loc, classification: class_res ,image_url: url
                        };

                        console.log(newEReport);

                        //Utilise the submitEReport function in the formActions file in the actions folder (line 21)
                        //Aims to submit the E-Waste Report to the backend db
                        this.props.submitEReport(newEReport);

                        //Reset input fields on the form
                        this.onReset()

                        //Message alert to the user
                        window.alert( 'Your report was successfully sent, please await an email with further instructions' );

                    })
                    .catch(err => console.log(err));
                });                

        }else{
            window.alert('Please classify your image.');
        }
        
    }

    onReset = e =>{

        //Reset our component's state to how it initially was
        this.setState({
            filename: 'Select file',
            imageUrl: null,
            results: {},
            showResults: false,
            classBtn: false, 
            progress: 0
        })

        //Reset or clear all fields in the form
        document.getElementById('ereport_form').reset();

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
        .catch(error => {
            this.setState({
                latitude: null, 
                longitude: null,
                userAddress: null
            });
            alert(error);
        });
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
 

    //Function to handle when an image is uploaded to the form
    handleUpload = (e) => {

        //Extracts all the file information submitted on the form
        const { files } = e.target;

        //Once there is at least one file
        if(files.length > 0){

            //Save the image file (the first file) in file state of the component using its designated function
            this.setState({file: e.target.files[0]});

            //Similarly, save the image's filename in filename state of the component using its designated function
            this.setState({filename: e.target.files[0].name});

            //Get the image's url
            const url = URL.createObjectURL(files[0]);

            //Save it to the imageUrl state of the component using its designated function 
            this.setState({imageUrl: url});

            this.setState({classBtn: true});
            //Change the classBtn state of the component to true using its designated function 
            //This essentially means show the classification button only when an image file is uploaded
            
        }
    };

    //Function used to send the image provided to the backend for classification
    classify = async e => {
       
        e.preventDefault();

        //Once an image is provided
        if(this.state.file !== ''){
             
            //Create the request body using the FormData class
            const formData = new FormData();

             //Append the submitted file to the request body
            formData.append('file', this.state.file);

            try {

                //Hit the backend api (Express & Nodejs) with the image to be classified => the response/results are stored in res
                const res = await axios.post('/api/upload', formData);

                //Extract the classification results
                const { list } = res.data;

                console.log(list);
                
                //Save the result to the results state of the component using its designated function 
                this.setState({results: list});
                
                //Change the showResults state to true as we have classified the image
                this.setState({showResults: true});

            } catch (err) {//If an error is caught
                if(err.response.status === 500 )
                    console.log(err.response.data.msg);
                else
                    console.log(err);
            }
        }else{
            window.alert('Image not submitted successfully');
        }
    }

    render(){
        
        //The following is rendered/displayed on the browser

        return( 
     
            <Fragment> {/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}
                <div className="bordered">
                <h2 className="ml-5" style={{textAlign: "center"}}>E-Waste Report Form</h2> 

                {/* E-Waste Form */}
                <Form onSubmit={this.onSubmit} onReset={this.onReset} id="ereport_form">

                    <FormGroup>       

                        <Label for="name">Name/Organisation</Label>
                        <Input type="text" name="name" id="name" placeholder="Enter your name/organisation" className="mb-3" onChange={this.onChange} required/>

                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Enter email" className="mb-3" onChange={this.onChange} required/>

                        <Label for="tel">Telephone Contact   (Format: 123-4567)</Label>
                        <Input type="tel" name="tel" id="tel" placeholder="Format: 123-4567" onChange={this.onChange} className="mb-3" pattern="[0-9]{3}-[0-9]{4}" required/>

                        <Label for="desc">Description</Label>
                        <Input type="text" name="desc" id="desc" placeholder="Enter E-Waste description" className="mb-3" onChange={this.onChange} required/>

                        <Label for="loc">Current Location</Label>
                        <Input type="text" name="loc" id="loc" placeholder={this.state.userAddress} className="mb-3" onChange={this.onChange} readOnly/>
                                               

                        <Label for="">Image of E-waste</Label>
                        
                        {/* The Image Classifier was defined was included in this component as opposed to being seperate (then imported)*/}

                        <Container className="custom-file mb-4">

                            <Label className="custom-file-label" for="class_input">
                                {/* Since we stored the image's filename in the filename state of the component we can display it*/}
                                {/* The following is how you render a component variable on the browser screen */}
                                {this.state.filename}
                            </Label>
                            
                            {/* Image Input Field */}
                            <Input type="file" className="custom-file-input mt-4" id="class_input" onChange={this.handleUpload} accept="image/*" capture="camera" required/>    

                        </Container>

                        {/* The classBtn state is boolean*/}
                        {/* This essentially means if the classBtn state is true, then show the uploaded image on the browser*/}
                        {/* The AND operator allows us to do this*/}
                        { this.state.classBtn && <img src={this.state.imageUrl} style={{width: '150px', height: '150px'}} alt="" className="class_img" id="class_img"/>}

                        {/* Similarly, if the classBtn state is true, then show the classification button on the browser*/}
                        { this.state.classBtn && <Button style={{ display: 'block'}} className="btn btn-primary block mt-4" onClick={this.classify}>Classify Image</Button> }

                        {/* The showResults state is also boolean*/}
                        {/* Similarly, if the showResults state is true, then show the classification results on the browser*/}
                        {/* The AND operator allows us to do this*/}
                        { this.state.showResults && 
                            <div>
                                
                                <ul className="mt-4">      
                                    {/* We utilise the function on line 27 to format the results*/}
                                    {this.state.results.map(formatResult)}
                                </ul>

                                    {/* We can store the top result from the image classification in a hidden input tag */}
                                    <Input type="text" name="class_res" id="class_res" placeholder={this.state.results[0].className} value={this.state.results[0].className} className="mb-3" readOnly hidden/>

                            </div>
                        }                        

                        <div>
                            <Button color="dark" style={{ marginTop: '2rem', fontSize: '20px'}} type="reset" >Clear Fields</Button> 
                            <Button color="dark" style={{ marginTop: '2rem', marginLeft: '2rem', fontSize: '20px'}} type="submit" >Submit Form</Button> 
                        </div>
                        
                    </FormGroup>

                </Form> 
                </div>
            </Fragment>

        );
    }
}

//This is used to import various states of the system as defined in the reducers folder
const mapStateToProps = (state) => ({
    error: state.error,
    report: state.form.report
});

//This is where the imported connect module incorporates all the functions/actions from the actions folder and states from the reducers folder into the actual component.
export default connect(mapStateToProps, { submitEReport })(EWasteReport);
