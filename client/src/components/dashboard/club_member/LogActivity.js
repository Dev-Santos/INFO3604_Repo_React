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

import { Alert, Button, Modal, ModalBody, ModalHeader, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Form, FormGroup, Col, Label, Input } from 'reactstrap';

//Imported Title Component
import Title from '../Title';

//These modules allow us to use the actions in the actions folder and states defined in the reducer folder 
import {useSelector, useDispatch, shallowEqual}  from 'react-redux';

//Functions imported from the activityActions file in the actions folder
import { getPastActivities, updateActivityRec } from '../../../actions/activityActions';

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
export default function LogActivity() {//This is a shorter method of defining a component and exporting it to be used (all in one)

    //Accesses the styling configuration on line 29
    const classes = useStyles();

    //The following states store the company and individual donation records
    const [comp_dons, setCompDons] = useState([]);
    const [ind_dons, setIndDons] = useState([]);

    //The following states are used with various modals
    const [modalER, setModalER] = useState(false);
    const [modalCompDon, setCompDonModal] = useState(false);
    const [modalIndDon, setIndDonModal] = useState(false);
    const [modalDonReq, setDonReqModal] = useState(false);
    const [modalComments, setCommentsModal] = useState(false);

    //States associated with an E-Waste Report
    const [rep_pers, setRepPerson] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [desc, setDesc] = useState('');
    const [loc, setLoc] = useState('');
    const [date, setDate] = useState('');
    const [img_url, setImgUrl] = useState('');

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
    const [d_date, setDDate] = useState('');
    const [d_img_url, setDImgUrl] = useState('');

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

    //The following states store the data to be sent to our backend api (Nodejs and Express)
    const [type, setType] = useState('');
    const [a_id, setAId] = useState('');
    const [record_id, setRecordId] = useState('');

    //This constant stores the details of the current system user. These were captured as a state in the reducers folder
    const user = useSelector((state) => state.auth.user, shallowEqual);

    //This constant stores the e-waste report records. These were captured as a state in the reducers folder
    const ereports = useSelector((state) => state.reg.listing.ereports, shallowEqual);

    //This constant stores the donation (company and individual) records. These were captured as a state in the reducers folder
    const donations = useSelector((state) => state.reg.listing.donations, shallowEqual);

    //This constant stores the donation request records. These were captured as a state in the reducers folder
    const donation_reqs = useSelector((state) => state.reg.listing.donation_reqs, shallowEqual);

    const dispatch = useDispatch();

    //This function executes the getPastActivities function from the activityActions file
    const activityListing = () => {
        if (user){
            dispatch(getPastActivities(user.id));
        }
    };

    //This useEffect function executes once the user (line 105) modifies
    //It pulls the all elapsed activity records from our backend database based on the user's id
    useEffect(activityListing,[user]);

    //This useEffect function executes once the donations value (line 111) modifies
    //Within the activity records, this seperates the company and individual donation records
    useEffect(() => {
        if (donations){
            setCompDons(donations.comp_dons);
            setIndDons(donations.ind_dons);
        }

    },[donations]);

    //This is executed everytime the e-waste report details modal toggles
    const toggleER = (e) => {
        setModalER(!modalER);
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

        setCommentsModal(!modalComments);

    }

    //This function is responsible for populating the e-waste report details based on the button selected
    //for each row
    const ereportDetails = e => {

        //We capture the assignment id for the respective row where the button is selected
        const recId = e.target.value;

        //We filter for the specific record from the activity listing
        const rec = ereports.filter((item) => {return item.a_id === parseInt(recId);})[0];
        
        //We now transfer the record details to the state of the component which we can use to input into the modal
        setRepPerson(rec.rep_person);
        setEmail(rec.email);
        setTel(rec.telephone);
        setDesc(rec.description);
        setLoc(rec.location);
        setDate(rec.e_date);
        setImgUrl(rec.image_url);

        //Open the modal
        setModalER(true);

    };

    
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
        setDDate(donationRec.d_date);
        setDImgUrl(donationRec.image_url);

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
        setDDate(donationRec.d_date);
        setDImgUrl(donationRec.image_url);

        //Open the modal
        setIndDonModal(true);

    }
    
    //This function is responsible for populating the donation request details based on the button selected
    //for each row
    const donationReqDetails = e => {
        
        //We capture the companyid for the respective row where the button is selected
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

    //This function is responsible for capturing the data to be sent to our backend api (Nodejs and Express) in the
    //component's state and presenting the user with the comments modal
    const updateActivity = (e) => {

        setType(e.target.name);
        setAId(e.target.value);
        setRecordId(e.target.id);

        //Open the modal
        setCommentsModal(true);

    }

    //This is executed once the user submits
    const onSubmit = (e) => {

        e.preventDefault();

        //Comment details are captured
        const comments = document.getElementById('comments').value;
        
        console.log({ comments, type, a_id, record_id });

        //Close the comments modal
        setCommentsModal(false);

        //Executes the updateActivityRec function from the beneficiaryActions file in the actions folder
        //This updates the activty table record and other associated table record to indicate that they're be completed
        dispatch(updateActivityRec({ comments, type, a_id, record_id }));

        window.alert('Successful update of activity record');

        //We reload our current page
        window.location.reload();

    }

    //The following is rendered/displayed on the browser
    return (

        <React.Fragment>{/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}

            {/* If currently, there are no elapsed activities */}
            { ereports ? ereports.length === 0 && comp_dons.length === 0 && ind_dons.length === 0 &&  <div>

                  { donation_reqs ? donation_reqs.length === 0 && <div>

                        <Grid item xs={12} style={{marginLeft: '100px'}}>

                              <Paper className={classes.paper}>

                                  <Title>Currently No Elapsed Activities</Title>

                              </Paper>

                        </Grid>

                  </div>: null}

            </div> : null}


            {/* If there are any e-waste reports to be logged */}
            { ereports ? ereports.length > 0 && 
                
                <div>

                    <Grid item xs={12}>

                
                        <Paper className={classes.paper}>
                            
                            {/* E-Waste Collection Listing Table */}

                            <Title>E-Waste Collection</Title>

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

                                                {/* Date Heading */}
                                                <TableCell align="center" variant="head">
                                                    <Typography component="div">
                                                        <Box fontWeight="fontWeightBold">
                                                            Date
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

                                        {/* E-Waste Reports records */}
                                        {ereports ? ereports.map((record) => (

                                            <TableRow key={record.a_id}>

                                                <TableCell align="center">{record.rep_person}</TableCell>
                                                
                                                <TableCell align="center">{record.description}</TableCell>

                                                <TableCell align="center">{record.location}</TableCell>

                                                <TableCell align="center">{record.a_date}</TableCell>

                                                {/* E-Waste Report Details Button*/}
                                                <TableCell align="center"> 
                                                        <Button outline color="primary" onClick={ereportDetails}  value={record.a_id}>
                                                            E-Waste Report Details
                                                        </Button> 
                                                </TableCell>

                                                {/* If the e-waste report stil needs to be logged */}
                                                { record.status === 0 &&
                                                      
                                                      <TableCell align="center" > 
                                                          <Button outline color="success" onClick={updateActivity} name="er" value={record.a_id} id={record.e_id}>
                                                              Set As Completed
                                                          </Button>
                                                      </TableCell>
                                                }

                                                {/* If the e-waste report is logged */}
                                                { record.status === 1 && 

                                                      <TableCell align="center">
                                                          <Alert color="success">Activity Logged</Alert> 
                                                      </TableCell>
                                                }


                                            </TableRow>
                                    
                                        )): null}

                                </TableBody>

                            </Table>

                            </Paper>
                            
                    </Grid>

            </div>: null} 
        

            {/* If there are any company donations to be logged */}          
            { comp_dons.length > 0 &&   
        
                <div>      

                <Grid item xs={12}>

                        <Paper className={classes.paper}>
                

                            {/* Donations For Collection (Company) Listing Table */}
                            <Title>Donations Collection (Company Donors)</Title>

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

                                        {/* Date Heading */}
                                        <TableCell align="center" variant="head">
                                            <Typography component="div">
                                                <Box fontWeight="fontWeightBold">
                                                    Date
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

                                    {/* This table displays the listing of company donations  */}
                                    {comp_dons ? comp_dons.map((record) => (

                                        <TableRow key={record.a_id}>

                                        <TableCell align="center">{record.donor}</TableCell>

                                        <TableCell align="center">{record.item_desc}</TableCell>

                                        <TableCell align="center">{record.retrieval_loc}</TableCell>

                                        <TableCell align="center">{record.a_date}</TableCell>


                                        {/* Donation Details Button */}
                                        <TableCell align="center" > 
                                            <Button outline color="primary" onClick={donationCompDetails}  value={record.a_id}>
                                                Donation Details
                                            </Button>
                                        </TableCell>

                                        {/* If the company donation stil needs to be logged */}
                                        { record.status === 0 &&
                                              
                                              <TableCell align="center" > 
                                                  <Button outline color="success" onClick={updateActivity} name="don" value={record.a_id} id={record.don_id}>
                                                      Set As Completed
                                                  </Button>
                                              </TableCell>

                                        }

                                        {/* If the company donation is logged */}
                                        { record.status === 1 && 

                                              <TableCell align="center">
                                                  <Alert color="success">Activity Logged</Alert> 
                                              </TableCell>

                                        }


                                      </TableRow>
                                
                                    )): null}

                                </TableBody>

                            </Table>

                        </Paper>
                
                    </Grid>
      
                </div> 
            }


            {/* If there are any individual donations to be logged */}
            { ind_dons.length > 0 &&  
        
                <div>      

                    <Grid item xs={12}>
                

                        <Paper className={classes.paper}>
                            
                            {/* Donations For Collection (Individual) Listing Table */}

                            <div style={{marginTop: '20px'}}> <Title>Donations For Collection (By Individual Donors)</Title> </div>

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

                                            {/* Date Heading */}
                                            <TableCell align="center" variant="head">
                                                <Typography component="div">
                                                    <Box fontWeight="fontWeightBold">
                                                        Date
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

                                        {/* This table displays the listing of individual donations  */}
                                        {ind_dons ? ind_dons.map((record) => (

                                                <TableRow key={record.a_id}>

                                                        <TableCell align="center">{record.donor}</TableCell>

                                                        <TableCell align="center">{record.item_desc}</TableCell>

                                                        <TableCell align="center">{record.retrieval_loc}</TableCell>

                                                        <TableCell align="center">{record.a_date}</TableCell>


                                                        {/* Donation Details Button */}
                                                        <TableCell align="center" > 
                                                            <Button outline color="primary" onClick={donationIndDetails}  value={record.a_id}>
                                                                Donation Details
                                                            </Button>
                                                        </TableCell>


                                                        {/* If the individual donation stil needs to be logged */}
                                                        { record.status === 0 &&
                                                  
                                                              <TableCell align="center" > 
                                                                  <Button outline color="success" onClick={updateActivity} name="don" value={record.a_id} id={record.don_id}>
                                                                      Set As Completed
                                                                  </Button>
                                                              </TableCell>

                                                        }


                                                        {/* If the individual donation is logged */}
                                                        { record.status === 1 && 

                                                              <TableCell align="center">
                                                                  <Alert color="success">Activity Logged</Alert> 
                                                              </TableCell>

                                                        }


                                                </TableRow>

                                        )): null}

                                </TableBody>

                            </Table>              
                  
                    </Paper>

                
                </Grid>
            
            </div>

            }


            {/* If there are any donation requests to be logged */}
            { donation_reqs ? donation_reqs.length > 0 && 

                <div>
                    <Grid item xs={12}>


                        <Paper className={classes.paper}>
                            
                            {/* >Donation Delivery Listing Table */}

                            <Title>Donation Delivery</Title>

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
                    
                                        {/* Item Request Heading */}
                                        <TableCell align="center" variant="head">
                                            <Typography component="div">
                                                <Box fontWeight="fontWeightBold">
                                                    Item Request
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

                                        {/* Date Heading */}
                                        <TableCell align="center" variant="head">
                                            <Typography component="div">
                                                <Box fontWeight="fontWeightBold">
                                                    Date
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

                                        {/* This table displays the listing of donation requests */}
                                        {donation_reqs ? donation_reqs.map((record) => (

                                            <TableRow key={record.a_id}>

                                                <TableCell align="center">{record.d_name}</TableCell>

                                                <TableCell align="center">{record.request}</TableCell>

                                                <TableCell align="center">{record.location}</TableCell>

                                                <TableCell align="center">{record.a_date}</TableCell>

                                                {/* Donation Details Button */}
                                                <TableCell align="center" > 
                                                    <Button outline color="primary" onClick={donationReqDetails}  value={record.a_id}>
                                                        Donation Details
                                                    </Button>
                                                </TableCell>

                                                
                                                {/* If the donation request stil needs to be logged */}
                                                { record.status === 0 &&
                                                  
                                                      <TableCell align="center" > 
                                                          <Button outline color="success" onClick={updateActivity} name="don_req" value={record.a_id} id={record.d_id}>
                                                              Set As Completed
                                                          </Button>
                                                      </TableCell>
                                                }

                                                
                                                {/* If the donation request stil is logged */}
                                                { record.status === 1 && 

                                                      <TableCell align="center">
                                                          <Alert color="success">Activity Logged</Alert> 
                                                      </TableCell>
                                                }


                                            </TableRow>
                                    
                                        )): null}

                                </TableBody>

                            </Table>

                        </Paper>

                    </Grid>

            </div>: null }


            {/* E-Waste Report Modal */}
            <Modal isOpen={modalER} toggle={toggleER} >

                <ModalHeader>E-Waste Report Details</ModalHeader>

                <ModalBody>

                  {/* For each of the following entries, the respective component states defined (lines 61-67) are referenced */}
                  
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
                        <ListGroupItemHeading>Submitted Date</ListGroupItemHeading>

                        <ListGroupItemText>
                          {date}
                        </ListGroupItemText>

                      </ListGroupItem>
        
                      <ListGroupItem>

                          <a href={img_url} target="_blank" rel="noopener noreferrer">
                              <Button outline color="primary" >
                                  View E-Waste
                              </Button>
                          </a>

                      </ListGroupItem>

                  </ListGroup>

                </ModalBody>
                
            </Modal>

            
            {/* Company Donation Details Modal */}
            <Modal isOpen={modalCompDon} toggle={toggleCompDon} >

                <ModalHeader>Donation Details</ModalHeader>

                <ModalBody>

                  {/* For each of the following entries, the respective component states defined (lines 70-80) are referenced */}

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
                              <Button outline color="primary" >
                                  View Item
                              </Button>
                          </a>

                      </ListGroupItem>                      

                  </ListGroup>

                </ModalBody>
                
            </Modal>            


            {/* Individual Donation Details Modal */}
            <Modal isOpen={modalIndDon} toggle={toggleIndDon} >

                <ModalHeader>Donation Details</ModalHeader>

                <ModalBody>

                  {/* For each of the following entries, the respective component states defined (lines 70-80) are referenced */}

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
                                <Button outline color="primary" >
                                    View Item
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

                  {/* For each of the following entries, the respective component states defined (lines 83-91) are referenced */}

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
                        <ListGroupItemHeading>Item Requested</ListGroupItemHeading>

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


            {/* Comments Modal */}
            <Modal isOpen={modalComments} toggle={toggleComments} >

                <ModalHeader>Comments</ModalHeader>

                <ModalBody>

                    {/* Comments Form */}
                                        
                    <Form onSubmit={onSubmit}>

                        <FormGroup>
                            <Label for="comments"> Please provide your final comments</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="text" id="comments" required />
                            </Col>
                        </FormGroup>

                        <div>
                            <Button color="dark" style={{ marginTop: '2rem', fontSize: '17px'}} type="reset" >Reset</Button> 
                            <Button color="dark" style={{ marginTop: '2rem', marginLeft: '2rem', fontSize: '17px'}} type="submit" >Submit</Button> 
                        </div>
                    
                    </Form>                    

                </ModalBody>
                
            </Modal>            


        </React.Fragment>
  );
}