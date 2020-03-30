import React, { Component } from 'react';
import Slider from './Slider';

class Homepage extends Component{
    render(){
        return(
            <div>
                <h1 style={{textAlign:'center'}}>Welcome to the website's Homepage</h1>
                <br/>
                <Slider/>
            </div>   
        );
    }
}

export default Homepage;