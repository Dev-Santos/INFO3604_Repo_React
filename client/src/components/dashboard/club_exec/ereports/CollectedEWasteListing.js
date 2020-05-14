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

//Functions imported from the formActions file in the actions folder
import { getCollectedERListing } from '../../../../actions/formActions';


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
export default function CollectedEWasteListing() {//This is a shorter method of defining a component and exporting it to be used (all in one)

  //Accesses the styling configuration on line 30
  const classes = useStyles();

  //This constant stores the e-waste reports. These were captured as a state in the reducers folder
  const ereports = useSelector((state) => state.form.listing, shallowEqual);

  //The following states are used to populate the 'More Details' modal for the e-waste reports
  const [modal, setModal] = useState(false);
  const [rep_pers, setRepPerson] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [desc, setDesc] = useState('');
  const [loc, setLoc] = useState('');
  const [classification, setClass] = useState('');
  const [date, setDate] = useState('');

  //This function is responsible for populating the e-waste report details based on the button selected
  //for each row
  const reportDetails = e => {
    
    //We capture the report id for the respective row where the button is selected
    const recId = e.target.value;

    //We filter for the specific record from the list of e-waste reports
    const rec = ereports.filter((item) => {return item.id === parseInt(recId);})[0];
    
    //We now transfer the record details to the state of the component which we can use to input into the modal
    setRepPerson(rec.rep_person);
    setEmail(rec.email);
    setTel(rec.telephone);
    setDesc(rec.description);
    setLoc(rec.location);
    setClass(rec.classification);
    setDate(rec.date);

    //Open the modal
    setModal(true);

  }

  //This is executed everytime the e-waste report details modal toggles
  const toggle = (e) => {

    setModal(!modal);

  }

  const dispatch = useDispatch();

  //This function executes the getCollectedERListing function from the formActions file
  const listing = () => {
    dispatch(getCollectedERListing());
  };

  //The useEffect function executes once the component is loaded and it references the listing function defined above
  //This essentially pulls the e-waste reports from our backend database
  useEffect(listing,[]);

  //The following is rendered/displayed on the browser
  return (

        <React.Fragment>{/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}

            <Grid item xs={12}>

              <Paper className={classes.paper}>
                
                  {/* Collected E-Waste Reports Listing Table */}

                  <Title>Collected E-Waste Report Listing</Title>

                    <Table size="medium">

                      <TableHead>

                          <TableRow >

                              {/* Report Person Heading */}  
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Report Person
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* E-Waste Description Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        E-Waste Description
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Location Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Location
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Submitted Date Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Submitted Date
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

                          </TableRow>

                      </TableHead>

                      <TableBody>

                            {/* E-Waste Reports records */}
                            {ereports ? ereports.map((record) => (

                                <TableRow key={record.id}>

                                  <TableCell align="center">{record.rep_person}</TableCell>
                                  
                                  <TableCell align="center">{record.description}</TableCell>

                                  <TableCell align="center">{record.location}</TableCell>

                                  <TableCell align="center">{record.date}</TableCell>

                                  {/* More Details Button*/}
                                  <TableCell align="center"> 
                                        <Button outline color="primary" onClick={reportDetails}  value={record.id}>
                                            More Details
                                        </Button> 
                                  </TableCell>

                                  {/* View Image Button*/}
                                  <TableCell align="center"> 
                                      <a href={record.image_url} target="_blank" rel="noopener noreferrer">
                                        <Button outline color="primary" >
                                            View Image
                                        </Button>
                                      </a>
                                  </TableCell>

                                </TableRow>
                          
                            )): null}

                      </TableBody>
                      
                  </Table>

                </Paper>
                
            </Grid>


            {/* E-Waste Report Modal */}
            <Modal isOpen={modal} toggle={toggle} >

                <ModalHeader>E-Waste Report Details</ModalHeader>

                <ModalBody>

                  {/* For each of the following entries, the respective component states defined lines 55-62 are referenced */}
                  
                  <ListGroup>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Report Person</ListGroupItemHeading>

                        <ListGroupItemText>
                          {rep_pers}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Email</ListGroupItemHeading>

                        <ListGroupItemText>
                          {email}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Telephone Contact</ListGroupItemHeading>

                        <ListGroupItemText>
                          {tel}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>

                        <ListGroupItemHeading>E-Waste Description</ListGroupItemHeading>

                        <ListGroupItemText>
                          {desc}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Identified Location</ListGroupItemHeading>

                        <ListGroupItemText>
                          {loc}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>E-Waste Classified As</ListGroupItemHeading>

                        <ListGroupItemText>
                          {classification}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Submitted Date</ListGroupItemHeading>

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