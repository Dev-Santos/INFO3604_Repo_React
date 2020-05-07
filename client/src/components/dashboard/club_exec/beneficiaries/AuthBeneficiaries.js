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
import { Button, Modal, ModalBody, ModalHeader, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

//Imported Title Component
import Title from '../../Title';

//These modules allow us to use the actions in the actions folder and states defined in the reducer folder 
import {useSelector, useDispatch, shallowEqual}  from 'react-redux';

//Functions imported from the beneficiaryActions file in the actions folder
import { getBeneficiaryListing } from '../../../../actions/beneficiaryActions';

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
export default function BeneficiaryListing() {//This is a shorter method of defining a component and exporting it to be used (all in one)

  //Accesses the styling configuration on line 29
  const classes = useStyles();

  //The following states are used to populate the 'Beneficiary Details' modal
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [mainContact, setMainContact] = useState('');
  const [pos, setContactPosition] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [date, setDate] = useState('');

  //This constant stores the authenticated beneficiary records. These were captured as a state in the reducers folder
  const listing = useSelector((state) => state.reg.listing, shallowEqual);

  const dispatch = useDispatch();

  //This function executes the getBeneficiaryListing function from the beneficiaryActions file
  const beneficiaryListing = () => {
    dispatch(getBeneficiaryListing());
  };

  //The useEffect function executes once the component is loaded and it references the beneficiaryListing function defined above
  //This essentially pulls the all the authenticated beneficiary records from our backend database
  useEffect(beneficiaryListing,[]);

  //This is executed everytime the beneficiary details modal toggles
  const toggle = (e) => {

    setModal(!modal);

  }

  // This function handles populating the component states used for the 'Beneficiary Details' modal
  const beneficiaryDetails = e => {
    
    //We capture the beneficiary id for the respective row where the button was selected
    const recId = e.target.value;

    //We filter for the specific record from the list of approved beneficiaries
    const beneficiaryRec = listing.filter((item) => {return item.ben_id === parseInt(recId);})[0];
    
    //We now transfer the record details to the state of the component which we can use to input into the modal
    setName(beneficiaryRec.CompanyName);
    setAddress(beneficiaryRec.CompanyAddress);
    setWebsite(beneficiaryRec.CompanyWebsite);
    setEmail(beneficiaryRec.CompanyEmail);
    setTel(beneficiaryRec.CompanyPhoneNumber);
    setMainContact(beneficiaryRec.MainContact);
    setContactPosition(beneficiaryRec.ContactPosition);
    setContactNumber(beneficiaryRec.ContactNumber);
    setDate(beneficiaryRec.reg_date);

    //Open the modal
    setModal(true);

  }

  //The following is rendered/displayed on the browser
  return (

        <React.Fragment>{/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}


            <Grid item xs={12}>

              <Paper className={classes.paper}>
                
                  {/* Beneficiary Listing Table */}

                  <Title>Authenticated Beneficiaries</Title>

                    <Table size="medium">

                      <TableHead>

                          <TableRow >

                              {/* Company Name Heading */}  
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Company Name
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Company Email Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Company Email
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Company Telephone Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Company Telephone
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Main Contact Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Main Contact
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

                          </TableRow>

                      </TableHead>

                      <TableBody>

                            {/* This table displays the listing of authenticated beneficiaries  */}
                            {listing ? listing.map((record) => (

                                <TableRow key={record.id}>

                                  <TableCell align="center">{record.CompanyName}</TableCell>

                                  <TableCell align="center">{record.CompanyEmail}</TableCell>

                                  <TableCell align="center">{record.CompanyPhoneNumber}</TableCell>

                                  <TableCell align="center">{record.MainContact}</TableCell>

                                  <TableCell align="center">{record.reg_date}</TableCell>

                                  {/* More Details Button */}
                                  <TableCell align="center" > 
                                      <Button outline color="primary"  onClick={beneficiaryDetails}  value={record.ben_id}>
                                          More Details
                                      </Button>
                                  </TableCell>

                                </TableRow>
                          
                            )): null}

                      </TableBody>

                  </Table>

                </Paper>
                
            </Grid>         
            

            {/* Beneficiary Details Modal */}
            <Modal isOpen={modal} toggle={toggle} >

                <ModalHeader>Beneficiary Details</ModalHeader>

                <ModalBody>

                  {/* For each of the following entries, the respective component states defined lines 52-60 are referenced */}

                  <ListGroup>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Company Name</ListGroupItemHeading>

                        <ListGroupItemText>
                          {name}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Company Address</ListGroupItemHeading>

                        <ListGroupItemText>
                          {address}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Company Website</ListGroupItemHeading>

                        <ListGroupItemText>
                          {website}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>

                        <ListGroupItemHeading>Company Email</ListGroupItemHeading>

                        <ListGroupItemText>
                          {email}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Company Telephone</ListGroupItemHeading>

                        <ListGroupItemText>
                          {tel}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Main Contact</ListGroupItemHeading>

                        <ListGroupItemText>
                          {mainContact}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Contact Position</ListGroupItemHeading>

                        <ListGroupItemText>
                          {pos}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Contact Telephone</ListGroupItemHeading>

                        <ListGroupItemText>
                          {contactNumber}
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