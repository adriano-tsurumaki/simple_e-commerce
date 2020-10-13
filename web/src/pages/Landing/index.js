import React from 'react';

import Header from '../../components/Header';
// import Banner from './Banner';
import Slider from '../../components/Slider';
import BestBooks from '../../components/BestBooks';

import './styles.css';

function Landing() {

    return (
        <>
            <div className="container-header-flex">
                <Header />
                <Slider />
            </div>
            <div className="container-list-books">
                <BestBooks />
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            {/* Aplicar um slide dinâmico de promoções que é gerenciado pelo adm */}
        </>
    )
}

export default Landing;