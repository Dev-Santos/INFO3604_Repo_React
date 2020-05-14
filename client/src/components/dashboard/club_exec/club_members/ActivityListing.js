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

//Functions imported from the activityActions file in the actions folder
import { getActivityListing } from '../../../../actions/activityActions';

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
export default function ActivityListing() {//This is a shorter method of defining a component and exporting it to be used (all in one)

  //Accesses the styling configuration on line 30
  const classes = useStyles();

  //The following states store the company and individual donation records
  const [comp_dons, setCompDons] = useState([]);
  const [ind_dons, setIndDons] = useState([]);

  //The following states are used with various modals
  const [modalER, setERModal] = useState(false);
  const [modalCompDon, setCompDonModal] = useState(false);
  const [modalIndDon, setIndDonModal] = useState(false);
  const [modalDonReq, setDonReqModal] = useState(false);
  const [modalComments, setCommentModal] = useState(false);
  
  //This state is used to store the comments provided by a club member
  const [comments, setComments] = useState(null);

  //States associated with an E-Waste Report
  const [rep_pers, setRepPers] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [desc, setDesc] = useState('');
  const [loc, setLoc] = useState('');
  const [img_url, setImgUrl] = useState('');
  const [date, setDate] = useState('');

  //States associated with a Donation
  const [donor, setDonor] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorTel, setDonorTel] = useState('');
  const [donorMC, setDonorMC] = useState('');
  const [item_type, setItemType] = useState('');
  const [item_desc, setItemDesc] = useState('');
  const [serial_no, setSerialNo] = useState('');
  const [units, setUnits] = useState('');
  const [rloc, setRLoc] = useState('');
  const [d_img_url, setDImgUrl] = useState('');
  const [d_date, setDDate] = useState('');

  //States associated with a Donation Request
  const [ben, setBen] = useState('');
  const [benEmail, setBenEmail] = useState('');
  const [benTel, setBenTel] = useState('');
  const [benMC, setBenMC] = useState('');
  const [request, setRequest] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [d_req_loc, setDReqLoc] = useState('');
  const [d_req_date, setDReqDate] = useState('');

  //This constant stores the e-waste report records. These were captured as a state in the reducers folder
  const ereports = useSelector((state) => state.reg.listing.ereports, shallowEqual);
  
  //This constant stores the donation (company and individual) records. These were captured as a state in the reducers folder
  const donations = useSelector((state) => state.reg.listing.donations, shallowEqual);
  
  //This constant stores the donation request records. These were captured as a state in the reducers folder
  const donation_reqs = useSelector((state) => state.reg.listing.donation_reqs, shallowEqual);

  const dispatch = useDispatch();

  //This function executes the getActivityListing function from the activityActions file
  const activityListing = () => {
    dispatch(getActivityListing());
  };

  //The useEffect function executes once the component is loaded and it references the activityListing function defined above
  //This essentially pulls the all the activity records from our backend database
  useEffect(activityListing,[]);

  //This useEffect function executes once the donation variable (line 102) modifies
  //It seperates the company and individual donation records
  useEffect(() => {
    
    if (donations){
      setCompDons(donations.comp_dons);
      setIndDons(donations.ind_dons);
    }

  },[donations]);


  //This is executed everytime the e-waste report details modal toggles
  const toggleER = (e) => {

    setERModal(!modalER);

  }

  //This is executed everytime the company donation details modal toggles
  const toggleCompDon = (e) => {

    setCompDonModal(!modalCompDon);

  }

  //This is executed everytime the individual donation details modal toggles
  const toggleIndDon = (e) => {

    setIndDonModal(!modalIndDon);

  }

  //This is executed everytime the donation request details modal toggles
  const toggleDonReq = (e) => {

    setDonReqModal(!modalDonReq);

  }

  //This is executed everytime the comments details modal toggles
  const toggleComments = (e) => {

    setCommentModal(!modalComments);

  }

  //This function is responsible for populating the e-waste report details based on the button selected
  //for each row
  const ereportDetails = e => {
    
    //We capture the assignment id for the respective row where the button is selected
    const recId = e.target.value;

    //We filter for the specific record from the activity listing
    const ereportRec = ereports.filter((item) => {return item.a_id === parseInt(recId);})[0];
    
    //We now transfer the record details to the state of the component which we can use to input into the modal
    setRepPers(ereportRec.rep_person);
    setEmail(ereportRec.email);
    setTel(ereportRec.telephone);
    setDesc(ereportRec.description);
    setLoc(ereportRec.location);
    setImgUrl(ereportRec.image_url);
    setDate(ereportRec.e_date);

    //Open the modal
    setERModal(true);

  }

  //This function is responsible for populating the company donation details based on the button selected
  //for each row
  const donationCompDetails = e => {
    
    //We capture the assignment id for the respective row where the button is selected
    const recId = e.target.value;

    //We filter for the specific record from the activity listing
    const donationRec = comp_dons.filter((item) => {return item.a_id === parseInt(recId);})[0];
    
    //We now transfer the record details to the state of the component which we can use to input into the modal
    setDonor(donationRec.donor);
    setDonorEmail(donationRec.email);
    setDonorTel(donationRec.CompanyPhoneNumber);
    setDonorMC(donationRec.MainContact);
    setItemType(donationRec.item_type);
    setItemDesc(donationRec.item_desc);
    setSerialNo(donationRec.serial_no);
    setUnits(donationRec.units);
    setRLoc(donationRec.retrieval_loc);
    setDImgUrl(donationRec.image_url);
    setDDate(donationRec.d_date);

    //Open the modal
    setCompDonModal(true);

  }

  //This function is responsible for populating the individual donation details based on the button selected
  //for each row
  const donationIndDetails = e => {
    
    //We capture the assignment id for the respective row where the button is selected
    const recId = e.target.value;

    //We filter for the specific record from the activity listing
    const donationRec = ind_dons.filter((item) => {return item.a_id === parseInt(recId);})[0];
    
    //We now transfer the record details to the state of the component which we can use to input into the modal
    setDonor(donationRec.donor);
    setDonorEmail(donationRec.email);
    setDonorTel(donationRec.Phone);
    setItemType(donationRec.item_type);
    setItemDesc(donationRec.item_desc);
    setSerialNo(donationRec.serial_no);
    setUnits(donationRec.units);
    setRLoc(donationRec.retrieval_loc);
    setDImgUrl(donationRec.image_url);
    setDDate(donationRec.d_date);

    //Open the modal
    setIndDonModal(true);

  }

  //This function is responsible for populating the donation request details based on the button selected
  //for each row
  const donationReqDetails = e => {
    
    //We capture the assignment id for the respective row where the button is selected
    const recId = e.target.value;

    //We filter for the specific record from the activity listing
    const donationReqRec = donation_reqs.filter((item) => {return item.a_id === parseInt(recId);})[0];
    
    //We now transfer the record details to the state of the component which we can use to input into the modal
    setBen(donationReqRec.d_name);
    setBenEmail(donationReqRec.email);
    setBenTel(donationReqRec.CompanyPhoneNumber);
    setBenMC(donationReqRec.MainContact);
    setRequest(donationReqRec.request);
    setQuantity(donationReqRec.quantity);
    setReason(donationReqRec.reason);
    setDReqLoc(donationReqRec.location);
    setDReqDate(donationReqRec.date);

    //Open the modal
    setDonReqModal(true);

  }

  //This function is responsible for populating the comments details based on the button selected
  //for each row
  const viewComments = e => {

      //We now transfer the comments to the state of the component which we can use to input into the modal
      setComments(e.target.value);

      //Open the modal
      setCommentModal(true);

  }


  //The following is rendered/displayed on the browser
  return (

        <React.Fragment>{/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}

            <Grid item xs={12}>

              <Paper className={classes.paper}>

                
                  {/* E-Waste For Collection Listing Table */}

                  <Title>E-Waste For Collection</Title>

                    <Table size="medium">

                      <TableHead>

                          <TableRow >

                              {/* Club Member Responsible Heading */}  
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Club Member Responsible
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Date Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Date
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

                              {/* E-Waste Report Details Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        E-Waste Report Details
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

                            {/* This table displays the list of e-waste reports  */}
                            {ereports ? ereports.map((record) => (

                                <TableRow key={record.a_id}>

                                  <TableCell align="center">{record.name}</TableCell>

                                  <TableCell align="center">{record.a_date}</TableCell>

                                  <TableCell align="center">{record.location}</TableCell>


                                  {/* View Details Button */}
                                  <TableCell align="center" > 
                                      <Button outline color="primary" onClick={ereportDetails}  value={record.a_id}>
                                          View Details
                                      </Button>
                                  </TableCell>


                                  <TableCell align="center">

                                    {/* If an e-waste report is pending collection */}
                                    { record.status === 0 && <Alert color="danger">Pending Completion</Alert>}

                                    {/* If an e-waste report was collected */}
                                    { record.status === 1 && 
                                        
                                        <div>

                                          <Alert color="success">Completed</Alert>
                                          <Button outline color="primary" onClick={viewComments}  value={record.comments} style={{width: '150px'}}>
                                              View Comments
                                          </Button>

                                        </div>

                                    }

                                  </TableCell>


                                </TableRow>
                          
                            )): null}

                      </TableBody>

                  </Table>

                </Paper>
                
            </Grid>


            <Grid item xs={12}>

              <Paper className={classes.paper}>

                
                  {/* Company Donations For Collection Listing Table */}

                  <Title>Donations For Collection (By Company Donors)</Title>

                    <Table size="medium">

                      <TableHead>

                          <TableRow >

                              {/* Club Member Responsible Heading */}  
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Club Member Responsible
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Date Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Date
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

                              {/* Donation Details Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Donation Details
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

                            {/* This table displays the list of company donations  */}
                            {comp_dons ? comp_dons.map((record) => (

                                <TableRow key={record.a_id}>

                                  <TableCell align="center">{record.name}</TableCell>

                                  <TableCell align="center">{record.a_date}</TableCell>

                                  <TableCell align="center">{record.retrieval_loc}</TableCell>


                                  {/* View Details Button */}
                                  <TableCell align="center" > 
                                      <Button outline color="primary" onClick={donationCompDetails}  value={record.a_id}>
                                          View Details
                                      </Button>
                                  </TableCell>


                                  <TableCell align="center">

                                    {/* If a donation is pending collection */}
                                    { record.status === 0 && <Alert color="danger">Pending Completion</Alert>}

                                    {/* If a donation was collected */}
                                    { record.status === 1 && 
                                        
                                        <div>

                                          <Alert color="success">Completed</Alert>
                                          <Button outline color="primary" onClick={viewComments}  value={record.comments} style={{width: '150px'}}>
                                              View Comments
                                          </Button>

                                        </div>

                                    }

                                  </TableCell>


                                </TableRow>
                          
                            )): null}

                      </TableBody>

                  </Table>
                
                  {/* Individual Donations For Collection Listing Table */}

                  <div style={{marginTop: '20px'}}> <Title>Donations For Collection (By Individual Donors)</Title> </div>

                    <Table size="medium">

                      <TableHead>

                          <TableRow >

                              {/* Club Member Responsible Heading */}  
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Club Member Responsible
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Date Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Date
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

                              {/* Donation Details Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Donation Details
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

                            {/* This table displays the list of individual donations  */}
                            {ind_dons ? ind_dons.map((record) => (

                                <TableRow key={record.a_id}>

                                  <TableCell align="center">{record.name}</TableCell>

                                  <TableCell align="center">{record.a_date}</TableCell>

                                  <TableCell align="center">{record.retrieval_loc}</TableCell>


                                  {/* View Details Button */}
                                  <TableCell align="center" > 
                                      <Button outline color="primary" onClick={donationIndDetails}  value={record.a_id}>
                                          View Details
                                      </Button>
                                  </TableCell>


                                  <TableCell align="center">

                                    {/* If a donation is pending collection */}
                                    { record.status === 0 && <Alert color="danger">Pending Completion</Alert>}

                                    {/* If a donation was collected */}
                                    { record.status === 1 && 
                                        
                                        <div>

                                          <Alert color="success">Completed</Alert>
                                          <Button outline color="primary" onClick={viewComments}  value={record.comments} style={{width: '150px'}}>
                                              View Comments
                                          </Button>

                                        </div>

                                    }

                                  </TableCell>


                                </TableRow>

                            )): null}

                      </TableBody>


                  </Table>

                </Paper>
                
            </Grid>


            <Grid item xs={12}>

              <Paper className={classes.paper}>

                
                  {/* Deliveries To Beneficiaries Listing Table */}

                  <Title>Deliveries To Beneficiaries</Title>

                    <Table size="medium">

                      <TableHead>

                          <TableRow >

                              {/* Club Member Responsible Heading */}  
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Club Member Responsible
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Date Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Date
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

                              {/* Donation Details Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Donation Details
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

                            {/* This table displays the list of donation requests */}
                            {donation_reqs ? donation_reqs.map((record) => (

                                <TableRow key={record.a_id}>

                                  <TableCell align="center">{record.name}</TableCell>

                                  <TableCell align="center">{record.a_date}</TableCell>

                                  <TableCell align="center">{record.location}</TableCell>


                                  {/* View Details Button */}
                                  <TableCell align="center" > 
                                      <Button outline color="primary" onClick={donationReqDetails}  value={record.a_id}>
                                          View Details
                                      </Button>
                                  </TableCell>


                                  <TableCell align="center">

                                    {/* If a donation request is pending delivery */}
                                    { record.status === 0 && <Alert color="danger">Pending Completion</Alert>}

                                    {/* If a donation request was delivered */}
                                    { record.status === 1 && 
                                        
                                        <div>

                                          <Alert color="success">Completed</Alert>
                                          <Button outline color="primary" onClick={viewComments}  value={record.comments} style={{width: '150px'}}>
                                              View Comments
                                          </Button>

                                        </div>

                                    }

                                  </TableCell>


                                </TableRow>
                          
                            )): null}

                      </TableBody>

                      

                  </Table>

                </Paper>
                
            </Grid>


            {/* E-Waste Report Details Modal */}
            <Modal isOpen={modalER} toggle={toggleER} >

                <ModalHeader>E-Waste Report Details</ModalHeader>

                <ModalBody>

                  {/* For each of the following entries, the respective component states defined lines 66-72 are referenced */}

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
                        <ListGroupItemHeading>Location</ListGroupItemHeading>

                        <ListGroupItemText>
                          {loc}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Date Submitted</ListGroupItemHeading>

                        <ListGroupItemText>
                          {date}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                          
                        <a href={img_url} target="_blank" rel="noopener noreferrer">
                          
                          <Button outline color="primary">
                              View Image
                          </Button>

                        </a>

                      </ListGroupItem>

                  </ListGroup>

                </ModalBody>
                
            </Modal>



            {/* Club Member Comments Details Modal */}
            <Modal isOpen={modalComments} toggle={toggleComments} >

                <ModalHeader>Club Member Comments</ModalHeader>

                <ModalBody>

                  {/* For each of the following entries, the respective component states defined (line 63) are referenced */}

                  <ListGroup>
        
                      <ListGroupItem>

                        <ListGroupItemText>
                          {comments}
                        </ListGroupItemText>

                      </ListGroupItem>

                  </ListGroup>

                </ModalBody>
                
            </Modal>



            {/* Donation Details Modal */}
            <Modal isOpen={modalCompDon} toggle={toggleCompDon} >

                <ModalHeader>Donation Details</ModalHeader>

                <ModalBody>

                  {/* For each of the following entries, the respective component states defined (lines 75-85) are referenced */}

                  <ListGroup>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Donor</ListGroupItemHeading>

                        <ListGroupItemText>
                          {donor}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Email</ListGroupItemHeading>

                        <ListGroupItemText>
                          {donorEmail}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Telephone Contact</ListGroupItemHeading>

                        <ListGroupItemText>
                          {donorTel}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>

                        <ListGroupItemHeading>Main Contact</ListGroupItemHeading>

                        <ListGroupItemText>
                          {donorMC}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Item Type</ListGroupItemHeading>

                        <ListGroupItemText>
                          {item_type}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Item Description</ListGroupItemHeading>

                        <ListGroupItemText>
                          {item_desc}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Serial Number</ListGroupItemHeading>

                        <ListGroupItemText>
                          {serial_no}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Units</ListGroupItemHeading>

                        <ListGroupItemText>
                          {units}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Retrieval Location</ListGroupItemHeading>

                        <ListGroupItemText>
                          {rloc}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Date Submitted</ListGroupItemHeading>

                        <ListGroupItemText>
                          {d_date}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                          
                        <a href={d_img_url} target="_blank" rel="noopener noreferrer">
                          
                          <Button outline color="primary">
                              View Image
                          </Button>

                        </a>

                      </ListGroupItem>

                  </ListGroup>

                </ModalBody>
                
            </Modal>            



            {/* Donation Details Modal */}
            <Modal isOpen={modalIndDon} toggle={toggleIndDon} >

                <ModalHeader>Donation Details</ModalHeader>

                <ModalBody>

                  {/* For each of the following entries, the respective component states defined (lines 75-85) are referenced */}

                  <ListGroup>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Donor</ListGroupItemHeading>

                        <ListGroupItemText>
                          {donor}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Email</ListGroupItemHeading>

                        <ListGroupItemText>
                          {donorEmail}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Telephone Contact</ListGroupItemHeading>

                        <ListGroupItemText>
                          {donorTel}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Item Type</ListGroupItemHeading>

                        <ListGroupItemText>
                          {item_type}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Item Description</ListGroupItemHeading>

                        <ListGroupItemText>
                          {item_desc}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Serial Number</ListGroupItemHeading>

                        <ListGroupItemText>
                          {serial_no}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Units</ListGroupItemHeading>

                        <ListGroupItemText>
                          {units}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Retrieval Location</ListGroupItemHeading>

                        <ListGroupItemText>
                          {rloc}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Date Submitted</ListGroupItemHeading>

                        <ListGroupItemText>
                          {d_date}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                          
                        <a href={d_img_url} target="_blank" rel="noopener noreferrer">
                          
                          <Button outline color="primary">
                              View Image
                          </Button>

                        </a>

                      </ListGroupItem>

                  </ListGroup>

                </ModalBody>
                
            </Modal>            



            {/* Donation Request Details Modal */}
            <Modal isOpen={modalDonReq} toggle={toggleDonReq} >

                <ModalHeader>Donation Request Details</ModalHeader>

                <ModalBody>

                  {/* For each of the following entries, the respective component states defined (lines 88-96) are referenced */}

                  <ListGroup>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Beneficiary</ListGroupItemHeading>

                        <ListGroupItemText>
                          {ben}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Email</ListGroupItemHeading>

                        <ListGroupItemText>
                          {benEmail}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Telephone Contact</ListGroupItemHeading>

                        <ListGroupItemText>
                          {benTel}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Main Contact</ListGroupItemHeading>

                        <ListGroupItemText>
                          {benMC}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Item Request</ListGroupItemHeading>

                        <ListGroupItemText>
                          {request}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Quantity</ListGroupItemHeading>

                        <ListGroupItemText>
                          {quantity}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Reason for Request</ListGroupItemHeading>

                        <ListGroupItemText>
                          {reason}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Retrieval Location</ListGroupItemHeading>

                        <ListGroupItemText>
                          {d_req_loc}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>
                        <ListGroupItemHeading>Date Submitted</ListGroupItemHeading>

                        <ListGroupItemText>
                          {d_req_date}
                        </ListGroupItemText>

                      </ListGroupItem>

                  </ListGroup>

                </ModalBody>
                
            </Modal>            

            
        </React.Fragment>
  );
}