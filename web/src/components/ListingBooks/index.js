import React, { useEffect } from 'react';

import BestSeller from './BestSeller';


import { useSelectBest } from '../../context/SelectBest';

import './styles.css';

const Release = () => {
    return (
        <h1>Release</h1>
    )
}

const PreOrder = () => {
    return (
        <h1>Pre-Order</h1>
    )
}

const BestOffer = () => {
    return (
        <h1>Best Offers</h1>
    )
}

const ListingBooks = ({ modules }) => {
    const { selected, setSelected } = useSelectBest();

    console.log(modules);
    useEffect(() => setSelected('BS'), [setSelected]);

    return (
        <>
            <div className="container-grid-listBook">
                <div className="listbook-row">
                    {selected === 'BS' && <BestSeller />}
                    {selected === 'BO' && <BestOffer />}
                    {selected === 'PO' && <PreOrder />}
                    {selected === 'RL' && <Release />}
                </div>
                <div className="container-grid-more-books">
                    <button className="button-show-more">
                        Show More
                    </button>
                </div>
            </div>
        </>
    )
}

export default ListingBooks;