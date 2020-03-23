import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input, Container} from 'reactstrap';
//import ImageClassifier from './ImageClassifier';
import ImageClassifier from './ReactUploadImage';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';



class EWasteReport extends Component {

    
    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    onSubmit = e => {
        console.log('Form selected');
    }

    render(){

        const authView = ( 
            <Fragment>
                <h2 className="ml-5" style={{textAlign: "center"}}>Report E-Waste Form</h2>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>       
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Enter your name" className="mb-3" required/>

                        <Label for="desc">Description</Label>
                        <Input type="text" name="desc" id="desc" placeholder="Enter E-Waste description" className="mb-3" required/>
                        
                        <Label for="loc">Location</Label>
                        <Input type="text" name="loc" id="loc" placeholder="Enter the location" className="mb-3" required/>

                        <Label for="">Image of E-waste</Label>
                        
                        <ImageClassifier/>

                        <Button color="dark" style={{marginTop: '2rem', fontSize: '20px'}} type="submit">Submit Form</Button> 

                    </FormGroup>

                </Form> 
                
            </Fragment>);


        return(
            <div>    
                <Container>
                    { this.props.isAuthenticated ? authView : ''}
                </Container>    
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(EWasteReport);