//Needed React modules
import React, { useEffect, useState } from 'react';

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
import { Alert, Button, Modal, ModalBody, ModalHeader, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

//Imported Title Component
import Title from '../../Title';

//These modules allow us to use the actions in the actions folder and states defined in the reducer folder 
import {useSelector, useDispatch, shallowEqual}  from 'react-redux';

//Functions imported from the regActions and donorActions files in the actions folder
import { getApprovedDonations } from '../../../../actions/donorActions';

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
export default function ApprovedDonations() {//This is a shorter method of defining a component and exporting it to be used (all in one)

  //Accesses the styling configuration on line 29
  const classes = useStyles();

  //The following states are used to populate the 'Donation Details' modal
  const [modal, setModal] = useState(false);
  const [donor, setDonor] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [units, setUnits] = useState('');
  const [location, setLocation] = useState('');
  const [retrieval_loc, setRetLoc] = useState('');
  const [classification, setClassification] = useState('');
  const [date, setDate] = useState('');

  //This constant stores the approved donation records. These were captured as a state in the reducers folder
  const listing = useSelector((state) => state.reg.listing, shallowEqual);

  const dispatch = useDispatch();

  //This function executes the getApprovedDonations function from the regActions file
  const donationsListing = () => {
    dispatch(getApprovedDonations());
  };

  //The useEffect function executes once the component is loaded and it references the listing function defined above
  //This essentially pulls the all the approved donations records from our backend database
  useEffect(donationsListing,[]);

  //This is executed everytime the company donor details modal toggles
  const toggle = (e) => {

    setModal(!modal);

  }

  // This function handles populating the component states used for the 'Donor Details' modal
  const donationDetails = e => {
    
    //We capture the donation id for the respective row where the button was selected
    const recId = e.target.value;

    //We filter for the specific record from the list of approved donations
    const donationRec = listing.filter((item) => {return item.id === parseInt(recId);})[0];
    
    //We now transfer the record details to the state of the component which we can use to input into the modal
    setDonor(donationRec.donor);
    setItemType(donationRec.item_type);
    setItemDesc(donationRec.item_desc);
    setSerialNo(donationRec.serial_no);
    setUnits(donationRec.units);
    setLocation(donationRec.location);
    setRetLoc(donationRec.retrieval_loc);
    setClassification(donationRec.classification);
    setDate(donationRec.date);

    //Open the modal
    setModal(true);

  }

  //The following is rendered/displayed on the browser
  return (

        <React.Fragment>{/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}


            <Grid item xs={12}>

              <Paper className={classes.paper}>
                
                  {/* Company Donations Listing Table */}

                  <Title>Approved Donations - Company Donors</Title>

                    <Table size="medium">

                      <TableHead>

                          <TableRow >

                              {/* Donor Heading */}  
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Donor
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

                              {/* Retrieval Location Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Retrieval Location
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

                              {/* More Details Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        More Details
                                      </Box>
                                  </Typography>
                              </TableCell>


                              {/* Image Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Image
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

                            {/* This table displays the approved donation listing of company donors  */}
                            {/* All company donations have a company attribute equal to 1  */}
                            {listing ? listing.filter((record) => { return parseInt(record.company) === 1 }).map( (item) => (

                                <TableRow key={item.id}>

                                  <TableCell align="center">{item.donor}</TableCell>

                                  <TableCell align="center">{item.item_desc}</TableCell>

                                  <TableCell align="center">{item.retrieval_loc}</TableCell>

                                  <TableCell align="center">{item.date}</TableCell>

                                  {/* More Details Button */}
                                  <TableCell align="center" > 
                                      <Button outline color="primary"  onClick={donationDetails}  value={item.id}>
                                          More Details
                                      </Button>
                                  </TableCell>


                                  {/* View Image Button*/}
                                  <TableCell align="center"> 
                                      <a href={item.image_url} target="_blank" rel="noopener noreferrer">
                                        <Button outline color="primary" >
                                            View Image
                                        </Button>
                                      </a>
                                  </TableCell>

                                  <TableCell align="center">
                                    
                                      {/* If a donation is pending collection */}
                                      { item.completed === 0 && <Alert color="danger">Pending Completion</Alert>}

                                      {/* If a donation was collected */}
                                      { item.completed === 1 && <Alert color="success">Donation Collected</Alert> }
                                  
                                  </TableCell>


                                </TableRow>
                          
                            )): null}

                      </TableBody>

                  </Table>

                </Paper>
                
            </Grid>


            <Grid item xs={12}>

              <Paper className={classes.paper}>
                
                  {/* Individual Donations Listing Table */}

                  <Title>Approved Donations - Individual Donors</Title>

                    <Table size="medium">

                      <TableHead>

                          <TableRow >

                              {/* Donor Heading */}  
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Donor
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

                              {/* Retrieval Location Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Retrieval Location
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

                              {/* More Details Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        More Details
                                      </Box>
                                  </Typography>
                              </TableCell>
                              
                              {/* Image Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Image
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

                            {/* This table displays the donation listing of individual donors  */}
                            {/* All individual donations have a company attribute equal to 0  */}
                            {listing ? listing.filter((record) => { return parseInt(record.company) === 0 }).map( (item) => (

                                <TableRow key={item.id}>

                                  <TableCell align="center">{item.donor}</TableCell>

                                  <TableCell align="center">{item.item_desc}</TableCell>

                                  <TableCell align="center">{item.retrieval_loc}</TableCell>

                                  <TableCell align="center">{item.date}</TableCell>

                                  {/* More Details Button */}
                                  <TableCell align="center" > 
                                      <Button outline color="primary"  onClick={donationDetails}  value={item.id}>
                                          More Details
                                      </Button>
                                  </TableCell>

                                  {/* View Image Button*/}
                                  <TableCell align="center"> 
                                      <a href={item.image_url} target="_blank" rel="noopener noreferrer">
                                        <Button outline color="primary" >
                                            View Image
                                        </Button>
                                      </a>
                                  </TableCell>

                                  <TableCell align="center">
                                    
                                      {/* If a donation is pending collection */}
                                      { item.completed === 0 && <Alert color="danger">Pending Completion</Alert>}

                                      {/* If a donation was collected */}
                                      { item.completed === 1 && <Alert color="success">Donation Collected</Alert> }
                                  
                                  </TableCell>                                  

                                </TableRow>
                          
                            )): null}

                      </TableBody>

                  </Table>

                </Paper>
                
            </Grid>
            
            

            {/* Donation Details Modal */}
            <Modal isOpen={modal} toggle={toggle} >

                <ModalHeader>Donation Details</ModalHeader>

                <ModalBody>

                  {/* For each of the following entries, the respective component states defined (lines 52-60) are referenced */}

                  <ListGroup>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Donor</ListGroupItemHeading>

                        <ListGroupItemText>
                          {donor}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Item Type</ListGroupItemHeading>

                        <ListGroupItemText>
                          {itemType}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Item Description</ListGroupItemHeading>

                        <ListGroupItemText>
                          {itemDesc}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>

                        <ListGroupItemHeading>Serial Number</ListGroupItemHeading>

                        <ListGroupItemText>
                          {serialNo}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Number of Units</ListGroupItemHeading>

                        <ListGroupItemText>
                          {units}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Location (Sent From)</ListGroupItemHeading>

                        <ListGroupItemText>
                          {location}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Retrieval Location</ListGroupItemHeading>

                        <ListGroupItemText>
                          {retrieval_loc}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Classified As</ListGroupItemHeading>

                        <ListGroupItemText>
                          {classification}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Submission Date</ListGroupItemHeading>

                        <ListGroupItemText>
                          {date}
                        </ListGroupItemText>

                      </ListGroupItem>

                  </ListGroup>

                </ModalBody>
                
            </Modal>

            
        </React.Fragment>
  );
}