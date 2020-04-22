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

//Functions imported from the regActions and donorActions files in the actions folder
import { createUser } from '../../../../actions/regActions';
import { getDonorRegListing, updateDonorStatus } from '../../../../actions/donorActions';

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
export default function DonorRegistrationListing() {//This is a shorter method of defining a component and exporting it to be used (all in one)

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

  //This constant stores the company donor registration records. These were captured as a state in the reducers folder
  const comp = useSelector((state) => state.reg.listing.comp, shallowEqual);

  //This constant stores the individual donor registration records. These were captured as a state in the reducers folder
  const ind = useSelector((state) => state.reg.listing.ind, shallowEqual);

  const dispatch = useDispatch();

  //This function executes the getDonorRegListing function from the regActions file
  const donorListing = () => {
    dispatch(getDonorRegListing());
  };

  //The useEffect function executes once the component is loaded and it references the listing function defined above
  //This essentially pulls the all the donor registration records from our backend database
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

    //We filter for the specific record from the list of registered company donors
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

  
  //Once the 'Validate Donor' button is clicked
  const validateDonor = e => {
    
    //The component captures the value, name and id of the respective record in which the button was clicked
    const recValue = e.target.value;
    const recName = e.target.name;
    const recId = e.target.id;   

    //Once the user selects 'OK' on  the confirmation box
    if(window.confirm("Are you sure you want validate the donor: " + recName)){

      let validateRec = null;

      //If the user wanted to validate an individual donor
      if(recId === 'ind'){

        //Executes the updateDonorStatus function from the donorActions file in the actions folder using their donor id
        //This essentially changes a donor's status from 0 (Pending) to 1 (Authenticated)
        dispatch( updateDonorStatus(recValue) );
        
        //We filter the ind variable from line 66 (which contains all the individual registration records) for a specific registration record
        //using their donor id
        validateRec = ind.filter((item) => {return item.id === parseInt(recValue);})[0];

        //We capture the FirstName, LastName, Email and password fields of our filtered record
        const { FirstName, LastName, Email, password } = validateRec;

        //We create a donor object using the extracted fields
        const newDonor = {
          name: FirstName + " " + LastName, email: Email, password, clubID: -1 , userType: 4
        }

        //Executes the createUser function from the regActions file in the actions folder
        //This creates a new user (of a donor user type) in the users table of the db using the object created above
        dispatch( createUser(newDonor) );

      }
      //If the user wanted to validate an company donor
      else if(recId === 'comp'){
        
        //We filter the comp variable from line 63 (which contains all the company donor registration records) for a specific registration record
        //using their donor id
        validateRec = comp.filter((item) => {return item.id === parseInt(recValue);})[0];

        console.log(validateRec);

        //We capture the CompanyName, CompanyEmail, password and donor_id fields of our filtered record
        const { CompanyName, CompanyEmail, password, donor_id } = validateRec;

        //Executes the updateDonorStatus function from the donorActions file in the actions folder using their donor id
        //This essentially changes a donor's status from 0 (Pending) to 1 (Authenticated)
        dispatch( updateDonorStatus(donor_id) );

        //We create a donor object using the extracted fields
        const newDonor = {
          name: CompanyName, email: CompanyEmail, password, clubID: -1, userType: 4
        }

        //Executes the createUser function from the regActions file in the actions folder
        //This creates a new user (of a donor user type) in the users table of the db using the object created above
        dispatch( createUser(newDonor) );

      }

      //Notifies the user of successful authentication
      window.alert(recName + " authenticated successfully!");

      //This captures the updated donor registration information from our backend database
      dispatch(getDonorRegListing());

      //We reload our current page
      window.location.reload();

    }
  }


  //The following is rendered/displayed on the browser
  return (

        <React.Fragment>{/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}

            <Grid item xs={12}>

              <Paper className={classes.paper}>

                
                  {/* Company Donor Registration Listing Table */}

                  <Title>Registration Listing - Company Donors</Title>

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

                            {/* This table displays the registration listing of company donors  */}
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

                                  {/* Validate Donor Button*/}
                                  <TableCell align="center"> 
                                      <Button outline color="success" onClick={validateDonor} id="comp" name={record.CompanyName} value={record.id} >
                                          Validate Donor
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

                
                  {/* Individual Donors Registration Listing Table */}

                  <Title>Registration Listing - Individual Donors</Title>

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

                            {/* This table displays the registration listing of individual donors  */}
                            {ind ? ind.map((record) => (

                                <TableRow key={record.id}>

                                  <TableCell align="center">{record.FirstName + " " + record.LastName}</TableCell>

                                  <TableCell align="center">{record.Email}</TableCell>

                                  <TableCell align="center">{record.Phone}</TableCell>

                                  <TableCell align="center">{record.reg_date}</TableCell>

                                  {/* Validate Donor Button*/}
                                  <TableCell align="center"> 
                                      <Button outline color="success" onClick={validateDonor} id="ind" name={record.FirstName + " " + record.LastName} value={record.id}>
                                          Validate Donor
                                      </Button>
                                  </TableCell>

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

                  {/* For each of the following entries, the respective component states defined lines 53-60 are referenced */}

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