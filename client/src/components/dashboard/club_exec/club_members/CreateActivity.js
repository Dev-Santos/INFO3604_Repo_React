//Needed React modules
import React, { useState, useEffect } from 'react';

//Imported Bootstrap elements
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//Imported Title Component
import Title from '../../Title';

import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

//These modules allow us to use the actions in the actions folder and states defined in the reducer folder 
import {useSelector, useDispatch, shallowEqual}  from 'react-redux';

//Functions imported from the actions folder
import { getERListing, clearFormListing } from '../../../../actions/formActions';
import { clearRegListing, getCMAuthListing } from '../../../../actions/regActions';
import { getApprovedDonations } from '../../../../actions/donorActions';
import { getApprovedDonationReqs } from '../../../../actions/beneficiaryActions';
import { submitActivity } from '../../../../actions/activityActions';

//Styling classes defined => which referenced by different elements in the component
const useStyles = makeStyles((theme) => ({

    paper: {
      marginTop: '20px',
      marginBottom: '20px',
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      background: 'rgb(252, 251, 220)'
    }
  
  }));
  



//Component Specification using React Hooks => Component as a function
export default function CreateActivity() {//This is a shorter method of defining a component and exporting it to be used (all in one)

    //Accesses the styling configuration on line 31
    const classes = useStyles();

    const dispatch = useDispatch();

    //This constant stores the e-waste report records. These were captured as a state in the reducers folder
    const ereports = useSelector((state) => state.form.listing, shallowEqual);

    //This constant stores the approved donations or donation request records. These were captured as a state in the reducers folder
    const appDon_Ben = useSelector((state) => state.reg.listing, shallowEqual);

    //This constant stores the list of authenticated club members. These were captured as a state in the reducers folder
    const clubMem = useSelector((state) => state.reg.cm, shallowEqual);

    //This state is responsible for storing the type of activity to be created
    const [type, setType] = useState(null);

    //This function executes the getCMAuthListing function from the regActions file
    const listing = () => {
        dispatch(getCMAuthListing());
    };

    //The useEffect function executes once the component is loaded and it references the listing function defined above
    //This essentially pulls all the authenticated club members from our backend database
    useEffect(listing,[]);


    //Executed everytime the 'Activity Type' input field on the form is changed
    const onChange = e => {
        
        const id = e.target.id;
        const value = e.target.value;

        if (id === 'type'){
            
            // If it is an E-Waste Collection
            if ( value === 'e'){

                //Save the type to the state
                setType('e');

                //Pull the e-waste reports listing and clear all other records
                dispatch(getERListing());
                dispatch(clearRegListing())

            }

            // If it is a Donation Collection
            if (value === 'd'){

                //Save the type to the state
                setType('d');

                //Pull the approved donation records and clear all other records
                dispatch(getApprovedDonations());
                dispatch(clearFormListing())

            }

            // If it is a Delivery To A Beneficiary
            if (value === 'b'){

                //Save the type to the state
                setType('b');

                //Pull the approved donation request records and clear all other records
                dispatch(getApprovedDonationReqs())
                dispatch(clearFormListing())

            }
            

        }

    }


    //This is executed once the user submits
    const onSubmit = e => {

        e.preventDefault();

        //Capture all the values from the form
        const type = document.getElementById('type').value;
        const record_id = document.getElementById('records').value;
        const date = document.getElementById('date').value;
        const cm_id = document.getElementById('cm').value;

        let assignment_type_id = null;

        if ( type === 'e' ){
            assignment_type_id = 1;
        }
        else if ( type === 'd' ){
            assignment_type_id = 2;
        }
        else{
            assignment_type_id = 3;
        }

        //Construct our assignment object
        const newAssignment = {
            cm_id, assignment_type_id, record_id, date
        };

        console.log(newAssignment);

        //Utilises the submitActivity function in the activityActions file in the actions folder
        //Aims to create a record in the assignments table
        dispatch(submitActivity(newAssignment));

        window.alert('Activity submitted successfully.');

        //Clears all fields on the form
        document.getElementById('activity_form').reset();

    }

    //The following is rendered/displayed on the browser
    return (

        <React.Fragment>{/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}

            <Grid item xs={12}>

                    <Paper className={classes.paper}>

                                                
                        <Title>Set Up Club Activity</Title>


                            <Form id="activity_form" onSubmit={onSubmit}>

                                    <FormGroup>

                                        <FormGroup>

                                            <Label for="type">Activity Type</Label>
                                            <Input type="select" name="type" id="type" onChange={onChange} required>

                                                    <option hidden></option>
                                                    <option value="e" >E-Waste Collection</option>
                                                    <option value="d">Donation Collection</option>
                                                    <option value="b">Delivery to Beneficiary</option>

                                            </Input>

                                        </FormGroup>


                                        <FormGroup>

                                            <Label for="records">Corresponding Records</Label>
                                            <Input type="select" name="records" id="records" required>
                                                    
                                                    <option hidden></option>
                                                    {/* Using the variable from line 57, populate the following dropdown menu with the e-waste reports listing */}
                                                    {   
                                                       ereports ? (ereports.map(({id, rep_person, description, location, date}) => (
                                                            <option key={id} value={id}>{rep_person + "  ||  " + description + "  ||  " + location + "  ||  " + date}</option>
                                                            ))
                                                       ) : null
                                                    }


                                                    {/* Using the variable from line 60, populate the following dropdown menu with the donation listing */}
                                                    {   
                                                       type === 'd' && appDon_Ben ? (appDon_Ben.map(({id, donor, item_desc, location, date}) => (
                                                            <option key={id} value={id}>{donor + "  ||  "  + item_desc +  "  ||  " + location + "  ||  " + date}</option>
                                                            ))
                                                       ) : null
                                                    }


                                                    {/* Using the variable from line 60, populate the following dropdown menu with the donation request listing */}
                                                    {   
                                                       type === 'b' && appDon_Ben ? (appDon_Ben.map(({id, name, request, location, date}) => (
                                                            <option key={id} value={id}>{name + "  ||  " + request + "  ||  " + location + "  ||  " + date}</option>
                                                            ))
                                                       ) : null
                                                    }

                                            </Input>

                                        </FormGroup>
              
                                        <FormGroup>

                                            <Label for="date">Date</Label>
                                            <Input type="date" id="date" name="date" min={new Date().toISOString().slice(0,10)} defaultValue={new Date().toISOString().slice(0,10)} required/>

                                        </FormGroup>
  
                                        <FormGroup>

                                            <Label for="cm">Assigned Club Member</Label>
                                            <Input type="select" id="cm" name="cm" required>

                                                <option hidden></option>

                                                {/* Using the variable from line 63, populate the following dropdown menu with the club member listing */}
                                                {   
                                                    clubMem ? (clubMem.map(({id, name}) => (
                                                        <option key={id} value={id}>{name}</option>
                                                        ))
                                                    ) : null
                                                }


                                            </Input>

                                        </FormGroup>
                                        
                                        <div>
                                            <Button color="dark" style={{marginTop: '2rem', width:'180px'}} type="submit">Submit Activity</Button>
                                            <Button color="dark" style={{marginTop: '2rem', marginLeft: '20px', width:'130px'}} type="reset">Clear All Fields</Button>
                                        </div>
                                        

                                    </FormGroup>

                            </Form>

                    </Paper>

            </Grid>  

        </React.Fragment>
  );
}