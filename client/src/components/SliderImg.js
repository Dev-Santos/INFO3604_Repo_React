import React from 'react';

function SliderImg ({src}){
    let imgStyles ={
        width: 100 + "%",
        height: "60vh"
    }
    return(
        <img src={src} alt="slide-img" style={imgStyles}/>
    );
};

export default SliderImg;