//Needed React modules
import React from 'react';

//This module is used to merge multiple styling classes
import clsx from 'clsx';

//Imported Bootstrap elements
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

//Imported Title Component
import Title from '../Title';


//Styling classes defined => which referenced by different elements in the component
const useStyles = makeStyles((theme) => ({
  
  root: {
    display: 'flex'
  },

  container: {
    width: '70%',
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    background: 'rgb(153, 230, 255)',
  },

  paper: {
    marginTop: '20px',
    marginBottom: '20px',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    background: 'rgb(252, 251, 220)'
  },

  fixedHeight: {
    height: 365,
    width: 350
  },

  depositContext: {
    flex: 1,
  },

  centered: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

}));


//Component specification using React Hooks => Component as a function
function DashboardOptions() {

  //Accesses the styling configuration on line 20
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //The following is rendered/displayed on the browser

  return (

    <React.Fragment> {/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}


            {/*  First Box on the Left */}

            <Grid item xs={12} md={7} lg={6} style={{paddingLeft: '30px'}}>

                <Paper className={fixedHeightPaper}>

                    <div className={classes.centered}><Title>Club Members</Title></div>

                    <Typography color="textPrimary" style={{textAlign: 'center'}} >
                      Pending registrations and Existing Club Members.
                    </Typography>

                    <div className={classes.centered} style={{marginTop: '10px'}}>
                      <Link color="primary" href="/api/dashboard/reg_listing">

                        <Button variant="contained" color="primary">
                          Registration Listing
                        </Button>
                        
                      </Link>
                    </div>

                    <div style={{marginTop: '10px'}} className={classes.centered}>
                      <Link color="primary" href="/api/dashboard/reg_users">

                        <Button variant="contained" color="primary">
                          Authenticated Users
                        </Button>
                        
                      </Link>
                    </div>

                    <Typography color="textPrimary" style={{marginTop: '10px', textAlign: 'center'}}>
                      Create and View Club Activities
                    </Typography>

                    <div className={classes.centered} style={{marginTop: '10px'}}>
                      <Link color="primary" href="/api/dashboard/activity">

                        <Button variant="contained" color="primary">
                          Create Activity
                        </Button>
                        
                      </Link>
                    </div>

                    <div className={classes.centered} style={{marginTop: '10px'}}>
                      <Link color="primary" href="/api/dashboard/activity_listing">

                        <Button variant="contained" color="primary">
                          Activity Listing
                        </Button>
                        
                      </Link>
                    </div>

                </Paper>

            </Grid>
            

            {/*  First Box on the Right */}

            <Grid item xs={12} md={7} lg={6} style={{paddingLeft: '50px'}}>

                <Paper className={fixedHeightPaper}>

                    <div className={classes.centered}><Title>Donors</Title></div>

                    <Typography color="textPrimary" style={{textAlign: 'center'}}>
                      Pending registrations and Existing Donors.
                    </Typography>

                    <div className={classes.centered} style={{marginTop: '10px'}}>
                      <Link color="primary" href="/api/dashboard/donor_reg_listing">
                        
                        <Button variant="contained" color="primary">
                          Registration Listing
                        </Button>

                      </Link>
                    </div>

                    <div className={classes.centered} style={{marginTop: '10px'}}>
                      <Link color="primary" href="/api/dashboard/donor_listing">
                        
                        <Button variant="contained" color="primary">
                          Authenticated Donors
                        </Button>

                      </Link>
                    </div>

                    <Typography color="textPrimary" style={{marginTop: '10px', textAlign: 'center'}}>
                      Submitted and Approved Donations
                    </Typography>

                    <div className={classes.centered} style={{marginTop: '10px'}}>
                      <Link color="primary" href="/api/dashboard/donations">

                        <Button variant="contained" color="primary">
                          Submitted Donations
                        </Button>
                        
                      </Link>
                    </div>

                    <div className={classes.centered} style={{marginTop: '10px'}}>
                      <Link color="primary" href="/api/dashboard/donations_auth">

                        <Button variant="contained" color="primary">
                          Approved Donations
                        </Button>
                        
                      </Link>
                    </div>                    

                </Paper>

            </Grid>


            {/*  Second Box on the Left */}

            <Grid item xs={12} md={7} lg={6} style={{paddingLeft: '30px'}}>

                <Paper className={fixedHeightPaper}>

                    <div className={classes.centered}><Title>Beneficiaries</Title></div>

                    <Typography color="textPrimary" style={{textAlign: 'center'}}>
                      Pending registrations and Existing Beneficiaries.
                    </Typography>

                    <div className={classes.centered} style={{marginTop: '10px'}}>
                      <Link color="primary" href="/api/dashboard/ben_reg_listing">
                        
                        <Button variant="contained" color="primary">
                          Registration Listing
                        </Button>

                      </Link>
                    </div>

                    <div className={classes.centered} style={{marginTop: '10px'}}>
                      <Link color="primary" href="/api/dashboard/ben_listing">
                        
                        <Button variant="contained" color="primary">
                          Authenticated Beneficiaries
                        </Button>

                      </Link>
                    </div>

                    <Typography color="textPrimary" style={{marginTop: '10px', textAlign: 'center'}}>
                      Submitted and Approved Donation Requests
                    </Typography>

                    <div className={classes.centered} style={{marginTop: '10px'}}>
                      <Link color="primary" href="/api/dashboard/donation_reqs">

                        <Button variant="contained" color="primary">
                          Submitted Donation Requests
                        </Button>
                        
                      </Link>
                    </div>

                    <div className={classes.centered} style={{marginTop: '10px'}}>
                      <Link color="primary" href="/api/dashboard/donation_reqs_auth">

                        <Button variant="contained" color="primary">
                          Approved Donations Requests
                        </Button>
                        
                      </Link>
                    </div>

                </Paper>

            </Grid>
            

            {/*  Second Box on the Right */}

            <Grid item xs={12} md={7} lg={6} style={{paddingLeft: '50px'}}>

                <Paper className={fixedHeightPaper}>

                      <div className={classes.centered}><Title>E-Waste Reports</Title></div>

                      <Typography color="textPrimary" style={{textAlign: 'center'}}>
                        Submitted and Collected E-Waste Report Instances.
                      </Typography>

                      <div className={classes.centered} style={{marginTop: '10px'}}>
                        <Link color="primary" href="/api/dashboard/ereports">
                          
                          <Button variant="contained" color="primary">
                            E-Waste For Collection
                          </Button>

                        </Link>
                      </div>

                      <div className={classes.centered} style={{marginTop: '10px'}}>
                        <Link color="primary" href="/api/dashboard/ereports_collected">
                          
                          <Button variant="contained" color="primary">
                            Collected E-Waste
                          </Button>

                        </Link>
                      </div>

                </Paper>

            </Grid>

    </React.Fragment>

  );
}

export default DashboardOptions;//Export the component to be used