//Needed React modules
import React, {useState, useEffect} from 'react';

//Import the CSS file for the Slider
import '../Slider.scss';

//Import the component to store each image on the slider
import SliderImg from './SliderImg';

//Imported images that are shown in the slider
import i1 from '../pics/slider1.png';
import i2 from '../pics/slider2.png';
import i3 from '../pics/slider3.png';


//Imported Bootstrap elements
import {ChevronLeft, ChevronRight} from '@material-ui/icons';



//Component Specification using React Hooks
function Slider(){
    

    // let's create an array of components to be shown inside the slider
    //Similar to the ImageGallery we pass the image reference in the src attribute
    //This array holds all the elements to be loaded on the pages
    let sliderArr = [<SliderImg src={i1}/>, <SliderImg src={i2}/>, <SliderImg src={i3}/>];


    //Similar to the ReactUploadImage component, we define the component's states, the functions to set their values
    //and their initial values in the useState function.

    const [x, setX] = useState(0);//This state is responsible for positioning each image on the slider 
    //If x === 0 (1st image)
    //If x === -100 (2nd image)
    //If x === -200 (3rd image)
    //If x === -300 (4th  image) and so on........


    const [counter, setCounter] = useState(0);// This state counts the amount of seconds each image is shown
    

    //This function is always running in the background
    useEffect(() => {
        
        //This function checks how many seconds an image is shown
        const check = () =>{

            //Increment the amount of seconds an image is shown
            setCounter(counter => counter + 1);

            //After 4 seconds go to the image on the right => This is where we control how long an image is shown
            if (counter === 4){
                
                //Reset the counter for the amount of seconds an image is shown back to 0
                setCounter(0);

                //This function positions the image on right as the current image shown
                goRight();

            }
        }
        
        //This above function is executed every 1000 milliseconds (1 second)
        const interval = setInterval(check, 1000);
    
        return () => {
          clearInterval(interval);//Once the component is exited, clear the interval timer
        };

    });

    //This function is responsible for changing to the image on the left
    const goLeft = () => {
        
        //If x === 0 (1st image)
        //If x === -100 (2nd image)
        //If x === -200 (3rd image)
        //If x === -300 (4th  image) and so on........

        //To go to the left we need to add 100 to the x state of the component

        //If we are on the first image 
        if(x === 0)

            //Loop back around and position the rightmost image on the slider => -200 (in our case)
            setX(-100 * (sliderArr.length - 1));

        else

            //Position the image on the left onto the slider
            setX(x + 100);

        setCounter(0);//Set the amount of seconds an image is shown back to 0

    };


    //This function is responsible for changing to the image on the right
    const goRight = () => {

        //If x === 0 (1st image)
        //If x === -100 (2nd image)
        //If x === -200 (3rd image)
        //If x === -300 (4th  image) and so on........

        //To go to the right we need to minus 100 from the x state of the component

        //If we are on the last image -> x = - 200 (in our case)      
        if(x === -100 * (sliderArr.length - 1))
            
            //Loop back around and position the leftmost image on the slider
            setX(0);

        else

            setX(x - 100);
            //Position the image on the right onto the slider

        setCounter(0);//Set the amount of seconds an image is shown back to 0

    };


    //The following is rendered/displayed on the browser

    return(

        <div className="slider">

            {/* Recall the slideArr array on line 27 has all the image elements to be rendered on the page */}
            {/* The following code goes through the images in the array and loads them on to the page */}
            {
                sliderArr.map((item, index) => {
                    return(
                        <div key={index} className="slide" style={{transform: `translateX(${x}%)`}}>
                            {item}
                        </div>
                    );
                })
            }


            {/* The Left arrow on the slider */}
            <button id="goLeft" onClick={goLeft}>
                <ChevronLeft/>
                {/*<i className="fas fa-chevron-left"></i>*/}
            </button>


            {/* The Right arrow on the slider */}
            <button id="goRight" onClick={goRight}>
                <ChevronRight/>
                {/*<i className="fas fa-chevron-right"></i>*/}
            </button>  


        </div>

    );
}

export default Slider;//Export the component to be used