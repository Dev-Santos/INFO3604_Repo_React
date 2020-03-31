import React from 'react';

function GalleryImg ({src}){
    let imgStyles ={
        width: 100 + "%",
        height: "25vh"
    }
    return(
        <img src={src} alt="slide-img" style={imgStyles}/>
    );
};

export default GalleryImg;