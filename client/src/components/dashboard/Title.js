//Needed React modules
import React from 'react';

import PropTypes from 'prop-types';

//Imported Bootstrap elements
import Typography from '@material-ui/core/Typography';


//Component Specification using React Hooks
export default function Title(props) {//This is a shorter method of defining a component and exporting it to be used (all in one)
  
  //The following is rendered/displayed on the browser
  //It returns a Typography element with specific attributes
  return (
    
    <Typography component="p" variant="h6" color="primary" gutterBottom>
        {props.children}
    </Typography>

  );

}

Title.propTypes = {
  children: PropTypes.node,
};