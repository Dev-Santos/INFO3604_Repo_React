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

//Functions imported from the regActions and beneficiaryActions files in the actions folder
import { createUser } from '../../../../actions/regActions';
import { getBeneficiaryRegListing, updateBeneficiaryStatus } from '../../../../actions/beneficiaryActions';

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
export default function BeneficiaryRegListing() {//This is a shorter method of defining a component and exporting it to be used (all in one)

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

  //This constant stores the beneficiary registration listing records. These were captured as a state in the reducers folder
  const listing = useSelector((state) => state.reg.listing, shallowEqual);

  const dispatch = useDispatch();

  //This function executes the getBeneficiaryRegListing function from the beneficiaryActions file
  const beneficiaryListing = () => {
    dispatch(getBeneficiaryRegListing());
  };

  //The useEffect function executes once the component is loaded and it references the beneficiaryListing function defined above
  //This essentially pulls the beneficiary registration listing from our backend database
  useEffect(beneficiaryListing,[]);

  //This is executed everytime the beneficiary details modal toggles
  const toggle = (e) => {

    setModal(!modal);

  }

  // This function handles populating the component states used for the 'Beneficiary Details' modal
  const beneficiaryDetails = e => {
    
    //We capture the registration id for the respective row where the button was selected
    const recId = e.target.value;

    //We filter for the specific record from the list of beneficiary registration records
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

  //Once the 'Validate Beneficiary' button is clicked
  const validateBeneficiary = e => {
    
    //The component captures the name and id of the respective record in which the button was clicked
    const recName = e.target.name;
    const recId = e.target.id;   

    //Once the user selects 'OK' on  the confirmation box
    if(window.confirm("Are you sure you want authenticate the beneficiary: " + recName)){

        //Executes the updateBeneficiaryStatus function from the beneficiaryActions file in the actions folder using their registration id
        //This essentially changes a beneficiary's status from 0 (Pending) to 1 (Authenticated)
        dispatch( updateBeneficiaryStatus(recId) );

        //We filter the ind variable from line 64 (which contains all the beneficiary registration records) for a specific registration record
        //using their registration id
        let validateRec = listing.filter((item) => {return item.ben_id === parseInt(recId);})[0];

        //We capture the CompanyName, CompanyEmail and password fields of our filtered record
        const { CompanyName, CompanyEmail, password } = validateRec;

        //We create a beneficiary object using the extracted fields
        const newBeneficiary = {
        name: CompanyName, email: CompanyEmail, password, clubID: -1 , userType: 5
        }

        //console.log(newBeneficiary);

        //Executes the createUser function from the regActions file in the actions folder
        //This creates a new user (of a beneficiary user type) in the users table of the db using the object created above
        dispatch( createUser(newBeneficiary) );

        //Notifies the user of successful authentication
        window.alert("Beneficiary authenticated successfully!");

        //This captures the updated beneficiary information from our backend database
        dispatch(getBeneficiaryRegListing());

        //We reload our current page
        window.location.reload();

    }
  }

  //The following is rendered/displayed on the browser
  return (

        <React.Fragment>{/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}


            <Grid item xs={12}>

              <Paper className={classes.paper}>
                
                  {/* Beneficiary Listing Table */}

                  <Title>Beneficiary Registration Listing</Title>

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

                            {/* This table displays the beneficiary registration listing  */}
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

                                  {/* Validate Beneficiary Button*/}
                                  <TableCell align="center"> 
                                      <Button outline color="success" onClick={validateBeneficiary} id={record.ben_id} name={record.CompanyName} >
                                        Validate Beneficiary
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

                  {/* For each of the following entries, the respective component states defined lines 52-61 are referenced */}

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