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

//Imported Title Component
import Title from '../../Title';

//These modules allow us to use the actions in the actions folder and states defined in the reducer folder 
import {useSelector, useDispatch, shallowEqual}  from 'react-redux';

//Functions imported from the regActions file in the actions folder
import { getCMListing } from '../../../../actions/regActions';


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
export default function AuthUsers() {//This is a shorter method of defining a component and exporting it to be used (all in one)

  //Accesses the styling configuration on line 30
  const classes = useStyles();

  //This constant stores the authenticated club member records. These were captured as a state in the reducers folder
  const reg = useSelector((state) => state.reg.listing, shallowEqual);

  const dispatch = useDispatch();

  //This function executes the getCMListing function from the regActions file
  const listing = () => {
    dispatch(getCMListing());
  };

  //The useEffect function executes once the component is loaded and it references the listing function defined above
  //This essentially pulls the registration results from our backend database
  useEffect(listing,[]);


  //The following is rendered/displayed on the browser
  return (

        <React.Fragment>{/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}


            <Grid item xs={12}>

                <Paper className={classes.paper}>

                                                      
                    <Title>Authenticated Club Members</Title>
                      
                      {/* Authenticated Club Members Table */}
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

                              </TableRow>

                          </TableHead>

                          <TableBody>
                            
                              {/* This table consists of records whose registration status equals to 1 */}
                              {/* These are the persons who have valid user accounts and can login => Club members*/}
                              {reg ? reg.map((record) => (
                                
                                <TableRow key={record.id}>

                                  <TableCell align="center">{record.name}</TableCell>

                                  <TableCell align="center">{record.email}</TableCell>

                                  <TableCell align="center">{record.location}</TableCell>

                                  <TableCell align="center">{record.address}</TableCell>
                                  
                                </TableRow>

                              )): null}

                          </TableBody>

                      </Table>

                  </Paper>

            </Grid>  

        </React.Fragment>
  );
}