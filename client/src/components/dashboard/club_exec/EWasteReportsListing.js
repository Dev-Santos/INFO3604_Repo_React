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
import Title from '../Title';

//These modules allow us to use the actions in the actions folder and states defined in the reducer folder 
import {useSelector, useDispatch, shallowEqual}  from 'react-redux';

//Functions imported from the formActions file in the actions folder
import { getERListing } from '../../../actions/formActions';


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
export default function EWasteReportsListing() {//This is a shorter method of defining a component and exporting it to be used (all in one)

  //Accesses the styling configuration on line 30
  const classes = useStyles();

  //This constant stores the e-waste reports. These were captured as a state in the reducers folder
  const ereports = useSelector((state) => state.form.listing, shallowEqual);

  const dispatch = useDispatch();

  //This function executes the getERListing function from the formActions file
  const listing = () => {
    dispatch(getERListing());
  };

  //The useEffect function executes once the component is loaded and it references the listing function defined above
  //This essentially pulls the e-waste reports from our backend database
  useEffect(listing,[]);

  //The following is rendered/displayed on the browser
  return (

        <React.Fragment>{/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}

            <Grid item xs={12}>

              <Paper className={classes.paper}>
                
                  {/* E-Waste Reports Listing Table */}

                  <Title>E-Waste Reports Listing</Title>

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

                              {/* Email Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        Email
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

                              {/* Classification Heading */}
                              <TableCell align="center" variant="head">
                                  <Typography component="div">
                                      <Box fontWeight="fontWeightBold">
                                        E-Waste Classified As
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

                                  <TableCell align="center">{record.email}</TableCell>

                                  <TableCell align="center">{record.description}</TableCell>

                                  <TableCell align="center">{record.location}</TableCell>

                                  <TableCell align="center">{record.classification}</TableCell>

                                  <TableCell align="center">{record.date}</TableCell>

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

        </React.Fragment>
  );
}