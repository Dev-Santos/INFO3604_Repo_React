import React from 'react';

//Imported Bootstrap elements
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Link from '@material-ui/core/Link';

import './Footer.css';


//Styles specification
// const useStyles = makeStyles((theme) => ({
//     footer: {
//       backgroundColor: theme.palette.background.paper,
//       padding: theme.spacing(6),
//     },
//   }));
  

//Footer Component Specification using React Hooks
function Footer(){

    //Initialisation of element styles
    // const classes = useStyles();

    
    //The following is rendered/displayed on the browser
    return(

        <React.Fragment>
          <footer className="site-footer">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <h6>About</h6>
                  <p className="text-justify">This project aims to assist the members of the organization RSC with the management and collection of e-waste around Trinidad and perhaps throughout the Caribbean in the future.
                  We believe that the citizens of Trinidad and Tobago will benefit from the use of this application as it will assist, even if minimally, to keep our country more ‘waste free.’ </p>
                </div>

                <div className="col-xs-6 col-md-3">
                  <h6>User Types</h6>
                  <ul className="footer-links">
                    <li>Admin</li>
                    <li>Beneficiaries</li>
                    <li>Donars</li>
                    <li>Club Executives</li>
                    <li>Club Member</li>
                    <li>Guest User</li>
                  </ul>
                </div>

                <div className="col-xs-6 col-md-3">
                  <h6>Quick Links</h6>
                  <ul className="footer-links">
                    <li><a href="/api/home">About Us</a></li>
                    <li><a href="/api/home">Contact Us</a></li>
                    <li><a href="/api/home">Donate</a></li>
                    <li><a href="/api/home">Request</a></li>
                    <li><a href="/api/home">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
              <hr />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-sm-6 col-xs-12">
                  <p className="copyright-text">Copyright &copy; 2017 All Rights Reserved by 
              <a href="/"> eMargin8</a>.
                  </p>
                </div>

                <div className="col-md-4 col-sm-6 col-xs-12">
                  <ul className="social-icons">
                    <li><a className="facebook" href="/"><i className="fa fa-facebook"></i></a></li>
                    <li><a className="twitter" href="/"><i className="fa fa-twitter"></i></a></li>
                    <li><a className="dribbble" href="/"><i className="fa fa-dribbble"></i></a></li>
                    <li><a className="linkedin" href="/"><i className="fa fa-linkedin"></i></a></li>   
                  </ul>
                </div>
              </div>
            </div>
      </footer>

    </React.Fragment>
    
    );
}

export default Footer;//Export the component to be used