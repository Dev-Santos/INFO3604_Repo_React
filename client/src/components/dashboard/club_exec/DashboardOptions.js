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
    height: 180,
    width: 280
  },

  depositContext: {
    flex: 1,
  },

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

            <Grid item xs={12} md={7} lg={6} style={{paddingLeft: '50px'}}>

                <Paper className={fixedHeightPaper}>

                    <Title>Registration Listing</Title>

                    <Typography color="textPrimary" className={classes.depositContext}>
                      View pending registrations submitted by the public
                    </Typography>

                    <div>
                      <Link color="primary" href="/api/dashboard/register">

                        <Button variant="contained" color="primary">
                          View Registration Listing
                        </Button>
                        
                      </Link>
                    </div>

                </Paper>

            </Grid>
            

            {/*  First Box on the Right */}

            <Grid item xs={12} md={7} lg={6} style={{paddingLeft: '50px'}}>

                <Paper className={fixedHeightPaper}>

                    <Title>Donor Information</Title>

                    <Typography color="textPrimary" className={classes.depositContext}>
                      Brief Description
                    </Typography>

                    <div>
                      <Link color="primary" href="#">
                        
                        <Button variant="contained" color="primary">
                          View Donor Info
                        </Button>

                      </Link>
                    </div>

                </Paper>

            </Grid>


            {/*  Second Box on the Left */}

            <Grid item xs={12} md={7} lg={6} style={{paddingLeft: '50px'}}>

                <Paper className={fixedHeightPaper}>

                    <Title>Beneficiary Information</Title>

                    <Typography color="textPrimary" className={classes.depositContext}>
                      Brief Description
                    </Typography>

                    <div>
                      <Link color="primary" href="#">
                        
                        <Button variant="contained" color="primary">
                          View Beneficiary Info
                        </Button>

                      </Link>
                    </div>

                </Paper>

            </Grid>
            

            {/*  Second Box on the Right */}

            <Grid item xs={12} md={7} lg={6} style={{paddingLeft: '50px'}}>

                <Paper className={fixedHeightPaper}>

                    <Title>Warehouse Inventory</Title>

                    <Typography color="textPrimary" className={classes.depositContext}>
                      Brief Description
                    </Typography>

                    <div>
                      <Link color="primary" href="#">
                        
                        <Button variant="contained" color="primary">
                          View Warehouse Details
                        </Button>

                      </Link>
                    </div>
                
                </Paper>

            </Grid>


            {/*  Third Box on the Left */}

            <Grid item xs={12} md={7} lg={6} style={{paddingLeft: '50px'}}>

                <Paper className={fixedHeightPaper}>

                    <Title>E-Waste Reports</Title>

                    <Typography color="textPrimary" className={classes.depositContext}>
                      Brief Description
                    </Typography>

                    <div>
                      <Link color="primary" href="/api/dashboard/ereports">
                        
                        <Button variant="contained" color="primary">
                          View E-Waste Reports
                        </Button>

                      </Link>
                    </div>
                
                </Paper>

            </Grid>


            {/*  Third Box on the Right */}

            <Grid item xs={12} md={7} lg={6} style={{paddingLeft: '50px'}}>

                <Paper className={fixedHeightPaper}>

                    <Title>Club Information</Title>

                    <Typography color="textPrimary" className={classes.depositContext}>
                      Brief Description
                    </Typography>

                    <div>
                      <Link color="primary" href="#">
                        
                        <Button variant="contained" color="primary">
                          View Club Details
                        </Button>

                      </Link>
                    </div>
                
                </Paper>

            </Grid>

    </React.Fragment>

  );
}

export default DashboardOptions;//Export the component to be used