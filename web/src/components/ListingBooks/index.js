import React, { useEffect } from 'react';

import { useSelectBest } from '../../context/SelectBest';

import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

import './styles.css';

const StarsRating = value => {
    const rating = parseFloat(value.rating);
    let starFill = Math.trunc(rating);
    let starHalf = rating % 1;
    let starEmpty = (5 - rating) < 0 ? 0 : (Math.trunc(5 - rating));

    return (
        <div className="card-star">
            {starFill > 0 && [...Array(starFill)].map((value, index) => {
                return <BsStarFill className="star-fill" key={index} />
            })}

            {starHalf > 0 && <BsStarHalf className="star-half" />}
            
            {starEmpty > 0 && [...Array(starEmpty)].map((value, index) => {
                return <BsStar className="star" key={index} />
            })}
        </div>
    )
}

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

const BestSeller = () => {
    // useEffect(() => {
    //     // Axios here
    //     /*
    //         {
    //             title;
    //             author;
    //             price;
    //             star;
    //         }
    //     */
    // }, []);

    return (
        <>
            <div className="card-best-book">
                <img src="https://images-na.ssl-images-amazon.com/images/I/51kcJqp-3-L._SX346_BO1,204,203,200_.jpg" alt="Book 1"/>
                <StarsRating rating="4.1" />
                <div className="card-hidden">
                    
                </div>
            </div>
            <div className="card-best-book">
                <img src="https://images-na.ssl-images-amazon.com/images/I/51kcJqp-3-L._SX346_BO1,204,203,200_.jpg" alt="Book 1"/>
            </div>
            <div className="card-best-book">
                <img src="https://images-na.ssl-images-amazon.com/images/I/51kcJqp-3-L._SX346_BO1,204,203,200_.jpg" alt="Book 1"/>
            </div>
            <div className="card-best-book">
                <img src="https://images-na.ssl-images-amazon.com/images/I/51kcJqp-3-L._SX346_BO1,204,203,200_.jpg" alt="Book 1"/>
            </div>
            <div className="card-best-book">
                <img src="https://images-na.ssl-images-amazon.com/images/I/51kcJqp-3-L._SX346_BO1,204,203,200_.jpg" alt="Book 1"/>
            </div>
            <div className="card-best-book">
                <img src="https://images-na.ssl-images-amazon.com/images/I/51kcJqp-3-L._SX346_BO1,204,203,200_.jpg" alt="Book 1"/>
            </div>
            <div className="card-best-book">
                <img src="https://images-na.ssl-images-amazon.com/images/I/51kcJqp-3-L._SX346_BO1,204,203,200_.jpg" alt="Book 1"/>
            </div>
            <div className="card-best-book">
                <img src="https://images-na.ssl-images-amazon.com/images/I/51kcJqp-3-L._SX346_BO1,204,203,200_.jpg" alt="Book 1"/>
            </div>
        </>
    )
}

const ListingBooks = () => {
    const { selected, setSelected } = useSelectBest();

    useEffect(() => setSelected('BS'), [setSelected]);

    return (
        <div className="container-grid-listBook">
            {selected === 'BS' && <BestSeller />}
            {selected === 'BO' && <BestOffer />}
            {selected === 'PO' && <PreOrder />}
            {selected === 'RL' && <Release />}
        </div>
    )
}

export default ListingBooks;