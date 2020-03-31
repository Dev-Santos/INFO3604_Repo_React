import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));
  


function Copyright() {
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

function Footer(){

    const classes = useStyles();

    return(
        <React.Fragment>
            <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Contact Us Via:
                </Typography>
                <div class="text-center">
                    <button type="button"><i class="fa fa-facebook-f fa-2x"></i> Facebook</button>
                    <button type="button"><i class="fa fa-twitter fa-2x"></i> Twitter</button>
                    <button type="button"><i class="fa fa-google fa-2x"></i> Google+</button>
                    <button type="button"><i class="fa fa-instagram fa-2x"></i> Instagram</button>
                </div>
                <br/>
                <Copyright />
            </footer>
    </React.Fragment>
    );
}

export default Footer;