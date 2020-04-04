//Needed React module
import React from 'react';


//Component specification using React Hooks
//With reference to line 125 in the ImageGallery component, the img is passed in the src attribute

//This is then mapped to the src parameter of the following component

function Img ({src}){

    //Style definition of the gallery image
    let imgStyles ={
        width: 100 + "%",
        height: "25vh"
    }

    
    return(
        //We generate an img html element to be rendered on the browser
        <img src={src} alt="slide-img" style={imgStyles}/>
    );

};

export default Img;//Export the component to be used