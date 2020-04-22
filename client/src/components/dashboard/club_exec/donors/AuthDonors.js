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

//Functions imported from the donorActions file in the actions folder
import { getDonorListing } from '../../../../actions/donorActions';

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
export default function AuthDonors() {//This is a shorter method of defining a component and exporting it to be used (all in one)

  //Accesses the styling configuration on line 30
  const classes = useStyles();

  //The following states are used to populate the 'More Details' modal for the company donors
  const [modal, setModal] = useState(false);
  const [comp_name, setCompName] = useState('');
  const [comp_add, setCompAdd] = useState('');
  const [comp_website, setCompWebsite] = useState('');
  const [comp_email, setCompEmail] = useState('');
  const [comp_tel, setCompTel] = useState('');
  const [comp_cp_name, setCompMainContact] = useState('');
  const [comp_pos, setCompPos] = useState('');
  const [comp_cp_tel, setCompCPTel] = useState('');

  //This constant stores the authenticated company donor records. These were captured as a state in the reducers folder
  const comp = useSelector((state) => state.reg.listing.comp, shallowEqual);

  //This constant stores the authenticated individual donor records. These were captured as a state in the reducers folder
  const ind = useSelector((state) => state.reg.listing.ind, shallowEqual);

  const dispatch = useDispatch();

  //This function executes the getDonorListing function from the donorActions file
  const donorListing = () => {
    dispatch(getDonorListing());
  };

  //The useEffect function executes once the component is loaded and it references the listing function defined above
  //This essentially pulls the authenticated donor records from our backend database
  useEffect(donorListing,[]);

  //This is executed everytime the company donor details modal toggles
  const toggle = (e) => {

    setModal(!modal);

  }

  //This function is responsible for populating the company donor details based on the button selected
  //for each row
  const donorDetails = e => {
    
    //We capture the companyid for the respective row where the button is selected
    const recId = e.target.value;

    //We filter for the specific record from the list of authenticated company donors
    const donorRec = comp.filter((item) => {return item.id === parseInt(recId);})[0];
    
    //We now transfer the record details to the state of the component which we can use to input into the modal
    setCompName(donorRec.CompanyName);
    setCompAdd(donorRec.CompanyAddress);
    setCompWebsite(donorRec.CompanyWebsite);
    setCompEmail(donorRec.CompanyEmail);
    setCompTel(donorRec.CompanyPhoneNumber);
    setCompMainContact(donorRec.MainContact);
    setCompPos(donorRec.ContactPosition);
    setCompCPTel(donorRec.ContactNumber);

    //Open the modal
    setModal(true);

  }


  //The following is rendered/displayed on the browser
  return (

        <React.Fragment>{/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}

            <Grid item xs={12}>

              <Paper className={classes.paper}>

                
                  {/* Authenticated Company DonorsTable */}

                  <Title>Authenticated Company Donors</Title>

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

                              {/* Registration Date Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Registration Date
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

                            {/* This table displays the listing of authenticated company donors  */}
                            {comp ? comp.map((record) => (

                                <TableRow key={record.id}>

                                  <TableCell align="center">{record.CompanyName}</TableCell>

                                  <TableCell align="center">{record.CompanyEmail}</TableCell>

                                  <TableCell align="center">{record.CompanyPhoneNumber}</TableCell>

                                  <TableCell align="center">{record.MainContact}</TableCell>

                                 <TableCell align="center">{record.reg_date}</TableCell>

                                  {/* More Details Button */}
                                  <TableCell align="center" > 
                                      <Button outline color="primary" onClick={donorDetails}  value={record.id}>
                                          More Details
                                      </Button>
                                  </TableCell>

                                </TableRow>
                          
                            )): null}

                      </TableBody>

                  </Table>

                </Paper>
                
            </Grid>
            
            <Grid item xs={12}>

              <Paper className={classes.paper}>

                
                  {/* Authenticated Individual Donors Table */}

                  <Title>Authenticated Individual Donors</Title>

                    <Table size="medium">

                      <TableHead>

                          <TableRow >

                              {/* Name Heading */}  
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Name
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Email Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Email
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Telephone Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Telephone
                                      </Box>
                                  </Typography>
                              </TableCell>


                              {/* Registration Date Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Registration Date
                                      </Box>
                                  </Typography>
                              </TableCell>

                          </TableRow>

                      </TableHead>

                      <TableBody>

                            {/* This table displays the listing of authenticated individual donors  */}
                            {ind ? ind.map((record) => (

                                <TableRow key={record.id}>

                                  <TableCell align="center">{record.FirstName + " " + record.LastName}</TableCell>

                                  <TableCell align="center">{record.Email}</TableCell>

                                  <TableCell align="center">{record.Phone}</TableCell>

                                  <TableCell align="center">{record.reg_date}</TableCell>

                                </TableRow>
                          
                            )): null}

                      </TableBody>

                  </Table>

                </Paper>
                
            </Grid>

            
            {/* Company Donor Details Modal */}
            <Modal isOpen={modal} toggle={toggle} >

                <ModalHeader>Company Donor Details</ModalHeader>

                <ModalBody>

                  {/* For each of the following entries, the respective component states defined lines 52-59 are referenced */}
                  
                  <ListGroup>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Company Name</ListGroupItemHeading>

                        <ListGroupItemText>
                          {comp_name}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Company Address</ListGroupItemHeading>

                        <ListGroupItemText>
                          {comp_add}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Company Website</ListGroupItemHeading>

                        <ListGroupItemText>
                          {comp_website}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>

                        <ListGroupItemHeading>Company Email</ListGroupItemHeading>

                        <ListGroupItemText>
                          {comp_email}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Company Phone Number</ListGroupItemHeading>

                        <ListGroupItemText>
                          {comp_tel}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Main Contact</ListGroupItemHeading>

                        <ListGroupItemText>
                          {comp_cp_name}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Position</ListGroupItemHeading>

                        <ListGroupItemText>
                          {comp_pos}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Telephone Number</ListGroupItemHeading>

                        <ListGroupItemText>
                          {comp_cp_tel}
                        </ListGroupItemText>

                      </ListGroupItem>

                  </ListGroup>

                </ModalBody>
                
            </Modal>

            
        </React.Fragment>
  );
}