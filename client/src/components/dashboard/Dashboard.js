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
import { CE_MainListItems, CE_SecondaryListItems } from './club_exec/listItems'; //These are the items seen on the left-hand side of the dashboard for the club executive interface
import RegistrationListing from './club_exec/club_members/RegistrationListing'; // This component captures the registration listing of club members
import AuthUsers from './club_exec/club_members/AuthUsers';//This component captures the listing of authenticated club members
import CE_DashboardOptions from './club_exec/DashboardOptions';//This component displays the initial options/features on the dashboard
import EWasteReportsListing from './club_exec/EWasteReportsListing';//This component captures all the e-waste records from the database
import DonorRegistrationListing from './club_exec/donors/DonorRegistrationListing';//This component captures the registration listing of company and individual donors
import DonorListing from './club_exec/donors/AuthDonors';//This component captured the authenticated individual and company donors


import { CM_MainListItems } from './club_member/listItems';//These are the items seen on the left-hand side of the dashboard for the club member interface
import CM_DashboardOptions from './club_member/DashboardOptions';//This component displays the initial options/features on the dashboard

//These modules allow us to use the states defined in the reducer folder 
import {useSelector, shallowEqual}  from 'react-redux';

const drawerWidth = 280;

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
    width: '100%',
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

  //This function accesses the auth state in the reducer folder to capture the user's information
  const user = useSelector( (state) => state.auth.user, shallowEqual );
  
  console.log(isAuthenticated);

  //Accesses the styling configuration on line 28
  const classes = useStyles();

  const open= true;

  //Here we define the HTML/JSX elements of this component before rendering them on the browser
  //We need to check if the user is authenticated first before rendering the component
  //This defines the dashboard of the club executive interface
  const clubExecView = (

      <Container>
          
          <br/>
          <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
            Dashboard
          </Typography>

          <div className={classes.root}>
      
                  {/* Left-Hand Sidebar of Options  */}

                      <Drawer variant="permanent" classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose), }} open={open} style={{zIndex: 0}}>
                        
                        {/*  First Half of Options  */}
                        <List>{CE_MainListItems}</List>

                        <Divider />

                        {/*  Second Half of Options  */}  
                        <List>{CE_SecondaryListItems}</List>

                      </Drawer>

            {/*  This creates a space between the left-hand side of options on the dashboard and everything on the right  */}  
            <div className={classes.appBarSpacer} />


            <Container className={classes.container} >
              
                <Grid container spacing={3}>

                      {/* The following describes which components are rendered based on the current/submitted url path */}
                      {/* It is always positioned on the right of the dashboard's sidebar options  */}

                      
                      {/* Initially the dashboard options are shown to the user */}
                      <Route path="/api/dashboard" exact  component={CE_DashboardOptions} />   


                      {/* Only this route/url, the RegistrationListing component is shown*/}
                      <Route path="/api/dashboard/reg_listing" exact  component={RegistrationListing} />     

                      {/* Only this route/url, the RegistrationListing component is shown*/}
                      <Route path="/api/dashboard/reg_users" exact  component={AuthUsers} />

                      {/* Only this route/url, the EWasteReportsListing component is shown*/}
                      <Route path="/api/dashboard/ereports" exact  component={EWasteReportsListing} />

                      {/* Only this route/url, the DonorRegistrationListing component is shown*/}
                      <Route path="/api/dashboard/donor_reg_listing" exact  component={DonorRegistrationListing} />

                      {/* Only this route/url, the DonorRegistrationListing component is shown*/}
                      <Route path="/api/dashboard/donor_listing" exact  component={DonorListing} />

                </Grid>

            </Container>	

        </div>

    </Container>
  )


  //Here we define the HTML/JSX elements of this component before rendering them on the browser
  //We need to check if the user is authenticated first before rendering the component
  //This defines the dashboard of the club member interface
  const clubMemView = (

      <Container>
            
          <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
            Dashboard
          </Typography>

          <div className={classes.root}>
      
                  {/* Left-Hand Sidebar of Options  */}

                      <Drawer variant="permanent" classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose), }} open={open}>
                        
                        {/*  Set of Options  */}
                        <List>{CM_MainListItems}</List>

                        <Divider />

                      </Drawer>

            {/*  This creates a space between the left-hand side of options on the dashboard and everything on the right  */}  
            <div className={classes.appBarSpacer} />


            <Container className={classes.container} >
              
                <Grid container spacing={3}>

                      {/* The following describes which components are rendered based on the current/submitted url path */}
                      {/* It is always positioned on the right of the dashboard's sidebar options  */}

                      
                      {/* Initially the dashboard options are shown to the user */}
                      <Route path="/api/dashboard" exact  component={CM_DashboardOptions} />   
   

                </Grid>

            </Container>	

        </div>

    </Container>
  )


  //The following is rendered/displayed on the browser
  return (
      <div>

        {/* The isAuthenticated state is a boolean */}

        {/* If the user is authenticated and has a user type of 1 (Club Executive), render the elements in clubExecView variable (line 112) */}
        { isAuthenticated && user.userType === 1 ? clubExecView : null}
        
        {/* If the user is authenticated and has a user type of 2 (Club Member), render the elements in clubMemView variable (line 168) */}
        { isAuthenticated && user.userType === 2 ? clubMemView : null }


        {/* Else nothing is shown*/}

      </div>

  );

}

export default Dashboard;//Export the component to be used