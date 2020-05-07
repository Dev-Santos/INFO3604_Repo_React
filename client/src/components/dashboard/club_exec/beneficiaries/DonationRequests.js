//Needed React modules
import React, { useEffect } from 'react';

//Imported Bootstrap elements
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//Additional imported Bootstrap elements
import { Button } from 'reactstrap';

//Imported Title Component
import Title from '../../Title';

//These modules allow us to use the actions in the actions folder and states defined in the reducer folder 
import {useSelector, useDispatch, shallowEqual}  from 'react-redux';

//Functions imported from the beneficiaryActions file in the actions folder
import { getSubmittedDonationReqs, approveDonationReq } from '../../../../actions/beneficiaryActions';

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
export default function DonationReqListing() {//This is a shorter method of defining a component and exporting it to be used (all in one)

  //Accesses the styling configuration on line 29
  const classes = useStyles();

  //This constant stores the submitted donation request records. These were captured as a state in the reducers folder
  const listing = useSelector((state) => state.reg.listing, shallowEqual);

  const dispatch = useDispatch();

  //This function executes the getSubmittedDonationReqs function from the beneficiaryActions file
  const donationReqsListing = () => {
    dispatch(getSubmittedDonationReqs());
  };

  //The useEffect function executes once the component is loaded and it references the donationReqsListing function defined above
  //This essentially pulls the all the submitted donation request records from our backend database
  useEffect(donationReqsListing,[]);

  //Once the 'Approve Donation Request' button is clicked
  const validateDonationReq = e => {
    
    //The component captures the name and id of the respective record in which the button was clicked
    const recName = e.target.name;
    const recId = e.target.id;   

    //Once the user selects 'OK' on  the confirmation box
    if(window.confirm("Are you sure you want approve this donation request by " + recName)){

      //Executes the approveDonationReq function from the beneficiaryActions file in 
      //the actions folder using their donation request id
      //This essentially changes a donation request's status from 0 (Pending) to 1 (Approved)
      dispatch( approveDonationReq(recId) );

      //Notifies the user of successful approval
      window.alert("Donation request approved successfully! ");

      //This captures the updated donation request information from our backend database
      dispatch(getSubmittedDonationReqs());

      //We reload our current page
      window.location.reload();

    }
  }

  //The following is rendered/displayed on the browser
  return (

        <React.Fragment>{/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}


            <Grid item xs={12}>

              <Paper className={classes.paper}>
                
                  {/* Submitted Donation Requests Table */}

                  <Title>Submitted Donation Requests</Title>

                    <Table size="medium">

                      <TableHead>

                          <TableRow >

                              {/* Beneficiary Name Heading */}  
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Beneficiary Name
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Item Description Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Item Description
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Reason for Request Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Reason for Request
                                      </Box>
                                  </Typography>
                              </TableCell>
          
                              {/* Quantity Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Quantity
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Delivery Location Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Delivery Location
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Submission Date Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Submission Date
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Status Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Status
                                      </Box>
                                  </Typography>
                              </TableCell>

                          </TableRow>

                      </TableHead>

                      <TableBody>

                            {/* This table displays the submitted donation requests listing  */}
                            {listing ? listing.map((record) => (

                                <TableRow key={record.id}>

                                  <TableCell align="center">{record.name}</TableCell>

                                  <TableCell align="center">{record.request}</TableCell>

                                  <TableCell align="center">{record.reason}</TableCell>

                                  <TableCell align="center">{record.quantity}</TableCell>

                                  <TableCell align="center">{record.location}</TableCell>

                                  <TableCell align="center">{record.date}</TableCell>

                                  {/* Approve Donation Request Button*/}
                                  <TableCell align="center"> 
                                      <Button outline color="success" onClick={validateDonationReq} id={record.id} name={record.name} >
                                          Approve Donation Request
                                      </Button>
                                  </TableCell>

                                </TableRow>
                          
                            )): null}

                      </TableBody>

                  </Table>

                </Paper>
                
            </Grid>
            
        </React.Fragment>
  );
}