//Needed React modules
import React from 'react';
import {Route} from 'react-router-dom';

//This module is used to merge multiple styling classes
import clsx from 'clsx';

//Imported Bootstrap elements
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

//Imported components to be included somewhere in the document
import { mainListItems, secondaryListItems } from './listItems'; //These are the items seen on the left-hand side of the dashboard
import RegistrationListing from './RegistrationListing'; // This component captures the registration tables seen
import DashboardOptions from './DashboardOptions';//This component displays the initial options/features on the dashboard

//These modules allow us to use the states defined in the reducer folder 
import {useSelector, shallowEqual}  from 'react-redux';

const drawerWidth = 240;

//Styling classes defined => which referenced by different elements in the component
const useStyles = makeStyles((theme) => ({
  
  root: {
    display: 'flex'
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth
  },

  drawerPaperClose: {
    overflowX: 'hidden',
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },

  appBarSpacer: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    marginTop: '0',
  },

  container: {
    width: '70%',
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },

  paper: {
    marginTop: '20px',
    marginBottom: '20px',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },

  fixedHeight: {
    height: 180,
    width: 280
  },

  depositContext: {
    flex: 1,
  },

}));


//Component Specification using React Hooks => Component as a function
function Dashboard() {

  //This function accesses the auth state in the reducer folder to determine if a user is authenticated
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated, shallowEqual);
  
  console.log(isAuthenticated);

  //Accesses the styling configuration on line 28
  const classes = useStyles();

  const open= true;

  //Here we define the HTML/JSX elements of this component before rendering them on the browser
  //We need to check if the user is authenticated first before rendering the component
  const view = (

      <Container>
            
          <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
            Dashboard
          </Typography>

          <div className={classes.root}>
      
                  {/* Left-Hand Sidebar of Options  */}

                      <Drawer variant="permanent" classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose), }} open={open}>
                        
                        {/*  First Half of Options  */}
                        <List>{mainListItems}</List>

                        <Divider />

                        {/*  Second Half of Options  */}  
                        <List>{secondaryListItems}</List>

                      </Drawer>

            {/*  This creates a space between the left-hand side of options on the dashboard and everything on the right  */}  
            <div className={classes.appBarSpacer} />


            <Container className={classes.container} >
              
                <Grid container spacing={3}>

                      {/* The following describes which components are rendered based on the current/submitted url path */}
                      {/* It is always positioned on the right of the dashboard's sidebar options  */}

                      
                      {/* Initially the dashboard options are shown to the user */}
                      <Route path="/api/dashboard" exact  component={DashboardOptions} />   


                      {/* Only this route/url, the RegistrationListing component is shown*/}
                      <Route path="/api/dashboard/register" exact  component={RegistrationListing} />     

                </Grid>

            </Container>	

        </div>

    </Container>
  )


  //The following is rendered/displayed on the browser
  return (
      <div>

        {/* The isAuthenticated state is a boolean */}
        {/* Only if the user is authenticated, we render the HTML/JSX elements defined from lines 103-154 */}
        {/* Else nothing is shown*/}

        { isAuthenticated ? view : null}

      </div>

  );

}

export default Dashboard;//Export the component to be used