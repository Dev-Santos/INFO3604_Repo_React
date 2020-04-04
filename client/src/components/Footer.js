import React from 'react';

//Imported Bootstrap elements
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';


//Styles specification
const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));
  

//Copyright Component Specification using React Hooks
function Copyright() {
    
  //The following is rendered/displayed on the browser
    return (

      <Typography variant="body2" color="textSecondary" align="center">
        
        {'Copyright © '}
        
        <Link color="inherit" href="/">
          RSC Website
        </Link>{' '}

        {new Date().getFullYear()}

        {'.'}

      </Typography>
    );
  }


//Footer Component Specification using React Hooks
function Footer(){

    //Initialisation of element styles
    const classes = useStyles();

    
    //The following is rendered/displayed on the browser
    return(

        <React.Fragment>

            <footer className={classes.footer}>
                
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Contact Us Via:
                </Typography>

                {/* Social Media Icons */}
                <div className="text-center">
                    <button type="button"><i className="fa fa-facebook-f fa-2x"></i> Facebook</button>
                    <button type="button"><i className="fa fa-twitter fa-2x"></i> Twitter</button>
                    <button type="button"><i className="fa fa-google fa-2x"></i> Google+</button>
                    <button type="button"><i className="fa fa-instagram fa-2x"></i> Instagram</button>
                </div>

                <br/>

                <Copyright /> {/* Positioning of the Copyright Component defined above */}

            </footer>

    </React.Fragment>
    
    );
}

export default Footer;//Export the component to be used