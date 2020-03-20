import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input, Container} from 'reactstrap';
import ImageClassifier from './ImageClassifier';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';







class EWasteReport extends Component {

    
    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    render(){

        const authView = ( 
            <Fragment>
                <h2 className="ml-5" style={{textAlign: "center"}}>Report E-Waste Form</h2>
                <Form>
                    <FormGroup>       
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Enter your name" className="mb-3"/>

                        <Label for="desc">Description</Label>
                        <Input type="text" name="desc" id="desc" placeholder="Enter E-Waste description" className="mb-3"/>
                        
                        <Label for="loc">Location</Label>
                        <Input type="text" name="loc" id="loc" placeholder="Enter the location" className="mb-3"/>

                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter password" onChange={this.onChange} minLength="8" className="mb-3"/>

                    </FormGroup>
                </Form>
                <ImageClassifier/>
                <Button color="dark" style={{marginTop: '2rem'}} >Submit</Button> 
            </Fragment>);


        return(
            <div>    
                <Container>
                    { this.props.isAuthenticated ? authView : <h2 className="ml-5" style={{textAlign: "center"}}>Please login to access this feature</h2>}
                </Container>    
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(EWasteReport);