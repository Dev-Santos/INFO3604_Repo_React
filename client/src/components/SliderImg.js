//Needed React module
import React from 'react';

//This component is the same as the Img component in the gallery components folder


//Component specification using React Hooks
//With reference to line 28 in the Slider component, the img is passed in the src attribute
//This is then mapped to the src parameter of the following component

function SliderImg ({src}){
    
    //Style definition of the slider image
    let imgStyles ={
        width: 100 + "%",
        height: "60vh"
    }

    return(
        //We generate an img html element to be rendered on the browser
        <img src={src} alt="slide-img" style={imgStyles}/>
    );
};

export default SliderImg;//Export the component to be used