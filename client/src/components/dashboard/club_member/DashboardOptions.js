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
    height: 200,
    width: 280
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

            <Grid item xs={12} md={7} lg={6} style={{paddingLeft: '50px'}}>

                <Paper className={fixedHeightPaper}>

                      <div className={classes.centered}><Title>Activity Schedule</Title></div>

                      <Typography color="textPrimary" style={{textAlign: 'center'}}>
                        View Assigned Activities That Are Upcoming
                      </Typography>

                      <div className={classes.centered} style={{marginTop: '10px'}}>

                        <Link color="primary" href="/api/dashboard/upcoming_act">
                          
                          <Button variant="contained" color="primary">
                            Upcoming Activities
                          </Button>

                        </Link>
                      
                      </div>

                </Paper>

            </Grid>
            

            {/*  First Box on the Right */}

            <Grid item xs={12} md={7} lg={6} style={{paddingLeft: '50px'}}>

                <Paper className={fixedHeightPaper}>

                      <div className={classes.centered}><Title>Log Club Activities</Title></div>

                      <Typography color="textPrimary" style={{textAlign: 'center'}}>
                        Identify Completed Activities And Provide Additional Comments
                      </Typography>

                      <div className={classes.centered} style={{marginTop: '10px'}}>
                        
                        <Link color="primary" href="/api/dashboard/log_act">
                          
                          <Button variant="contained" color="primary">
                            Log Completed Activities
                          </Button>

                        </Link>
                      
                      </div>

                </Paper>

            </Grid>

    </React.Fragment>

  );
}

export default DashboardOptions;//Export the component to be used