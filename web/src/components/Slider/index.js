import React, { useState } from 'react';
import './styles.css';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const Slider = () => {
    let sliderArr = [
        <img 
            src="https://images.pexels.com/photos/705771/pexels-photo-705771.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="image1"
            className="img-carousel"
        />,
        <img 
            src="https://images.pexels.com/photos/3274903/pexels-photo-3274903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="image1"
            className="img-carousel"
        />,
        <img 
            src="https://images.pexels.com/photos/1025469/pexels-photo-1025469.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="image1"
            className="img-carousel"
        />,
        <img 
            src="https://images.pexels.com/photos/749983/nature-milky-way-stars-galaxy-749983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="image1"
            className="img-carousel"
        />
    ];

    const [x, setX] = useState(0);

    const goLeft = () => {
        x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
    }

    const goRight = () => {
        x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100);
    }

    return (
        <div className="container-slider">
            <div className="slider">
                {sliderArr.map((item, index) => {
                    return (
                        <div 
                            key={index} 
                            className="slide"
                            style={{transform:`translateX(${x}%)`}}
                        >
                            {item}
                        </div>
                    );
                })}
                
                <button id="goLeft"  onClick={goLeft}>
                    <AiOutlineLeft className="arrows"/>
                    {/* <img src={AiOutlineLeft} alt="chevron left" /> */}
                </button>
                <button id="goRight" onClick={goRight}>
                    <AiOutlineRight className="arrows"/>
                    {/* <img src={AiOutlineRight} alt="chevron right" /> */}
                </button>
            </div>

            <div className="separator"></div>
        </div>
    )
}

export default Slider;