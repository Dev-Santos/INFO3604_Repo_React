import React, {useState, useEffect} from 'react';
import '../Slider.scss';
import SliderImg from './SliderImg';
import i1 from '../pics/slider1.png';
import i2 from '../pics/slider2.png';
import i3 from '../pics/slider3.png';

function Slider(){
    // let's create an array for component to show inside the slider
    let sliderArr = [<SliderImg src={i1}/>, <SliderImg src={i2}/>, <SliderImg src={i3}/>];

    const [x, setX] = useState(0);

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const check = () =>{
            setCounter(counter => counter + 1);
            if (counter === 4){
                setCounter(0); 
                goRight();
            }
        }
        
        const interval = setInterval(check, 1000);
    
        return () => {
          clearInterval(interval);
        };
    });

    const goLeft = () => {
        if(x === 0)
            setX(-100 * (sliderArr.length - 1));
        else
            setX(x + 100);
        setCounter(0);
    };

    const goRight = () => {
        if(x === -100 * (sliderArr.length - 1))
            setX(0);
        else
            setX(x - 100);
        setCounter(0);
    };

    return(
        <div className="slider">
            {
                sliderArr.map((item, index) => {
                    return(
                        <div key={index} className="slide" style={{transform: `translateX(${x}%)`}}>
                            {item}
                        </div>
                    );
                })
            }
            <button id="goLeft" onClick={goLeft}>
                <i class="fas fa-chevron-left"></i>
            </button>
            <button id="goRight" onClick={goRight}>
                <i class="fas fa-chevron-right"></i>
            </button>   
        </div>
    );
}

export default Slider;