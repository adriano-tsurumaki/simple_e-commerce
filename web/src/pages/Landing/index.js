import React from 'react';

import Header from '../../components/Header';
// import Banner from './Banner';
import Slider from '../../components/Slider';

import './styles.css';

function Landing() {

    return (
        <>
            <div className="container-header-flex">
                <Header />
                <Slider />
            </div>
            <div className="container-list-books">

            </div>
        </>
    )
}

export default Landing;