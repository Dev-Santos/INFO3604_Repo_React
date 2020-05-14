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

//Functions imported from the regActions file in the actions folder
import { getRegListing, updateRegStatus, createUser } from '../../../../actions/regActions';


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
export default function RegistrationListing() {//This is a shorter method of defining a component and exporting it to be used (all in one)

  //Accesses the styling configuration on line 30
  const classes = useStyles();

  //This constant stores the club member registration records. These were captured as a state in the reducers folder
  const reg = useSelector((state) => state.reg.cm, shallowEqual);

  const dispatch = useDispatch();

  //This function executes the getRegListing function from the regActions file
  const listing = () => {
    dispatch(getRegListing());
  };

  //The useEffect function executes once the component is loaded and it references the listing function defined above
  //This essentially pulls the club member registration records from our backend database
  useEffect(listing,[]);


  //Once the 'Validate User' button is clicked
  const validateUser = e => {
    
    //The component captures the name and id of the respective record in which the button was clicked
    const recName = e.target.name; 
    const recId = e.target.value; 
    
    //We filter the reg variable from line 52 (which contains all the registration records) for a specific registration record
    //using their registration id
    const validateRec = reg.filter((item) => {return item.id === parseInt(recId);})[0];

    console.log(validateRec);

    //We capture the id, email, password and clubID fields of our filtered record
    const { id, name, email, password, clubID } = validateRec;
    
    console.log(id);

    //We create a user object using the extracted fields
    const newUser = {
      name, email, password, clubID, userType:2
    }

    console.log(newUser);

    //Once the user selects 'OK' on  the confirmation box
    if(window.confirm("Are you sure you want validate " + recName)){
        
        console.log('Continue');

        //Executes the updateRegStatus function from the regActions file in the actions folder using their registration id
        //This essentially changes a person's registration status from 0 to 1
        dispatch( updateRegStatus(id) );

        //Executes the createUser function from the regActions file in the actions folder
        //This creates a new user in the users table of the db using the object containing their information (line 85)
        dispatch( createUser(newUser) );

        //Notifies the user of successful authentication
        window.alert(recName + " authenticated successfully!");


        //This captures the update registration information from our backend database
        dispatch(getRegListing());

        //We reload our current page
        window.location.reload();
        
    }
  }

  //The following is rendered/displayed on the browser
  return (

        <React.Fragment>{/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}

            <Grid item xs={12}>

              <Paper className={classes.paper}>

                
                  {/* Club Member Registration Listing Table */}

                  <Title>Club Member Registration Listing</Title>

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

                              {/* Club Location Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Club Location
                                      </Box>
                                  </Typography>
                              </TableCell>

                              {/* Club Address Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Club Address
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

                            {/* This table consists of records whose registration status equals to 0 */}
                            {/* These are the persons whose registration status is pending*/}
                            {reg ? reg.map((record) => (

                                <TableRow key={record.id}>

                                  <TableCell align="center">{record.name}</TableCell>

                                  <TableCell align="center">{record.email}</TableCell>

                                  <TableCell align="center">{record.location}</TableCell>

                                  <TableCell align="center">{record.address}</TableCell>

                                  {/* Validate User Button*/}
                                  <TableCell align="center"> 
                                      <Button outline color="success" onClick={validateUser} name={record.name} value={record.id}>
                                          Validate User
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