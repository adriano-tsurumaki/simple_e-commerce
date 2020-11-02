import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { useSelectBest } from '../../context/SelectBest';

import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

import { AiOutlineShoppingCart } from 'react-icons/ai';

import axios from '../../services/api';

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

    const [books, setBooks] = useState([]);

    const history = useHistory();

    const handleAddCart = (id) => {
        const token = localStorage.getItem('token-user');
        axios.defaults.headers.authorization = `Bearer ${token}`;
        axios.post('user/cart', {id_book: id})
            .then((res) => {
                const { auth, redirectForLogin } = res.data;
                if(redirectForLogin) {
                    history.push('/login');
                }
                if(!auth)
                    console.log(res.data);

                console.log(res.data);
            })
            .catch((err) => {
                console.log('Catch: ' + err.res.data.error)
            })
        delete axios.defaults.headers["authorization"];
        // axios.post('user/cart');
    }
    useEffect(() => {
        axios.get('bestsellers/' + 16)
            .then((response) => {
                setBooks(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log('Ocorreu um erro! ' + err);
            })
    }, []);

    return (
        <>
            {books.map((book, index) => {
                return (
                    <div className="card-best-book" key={'best-book-'+index}>
                        <div className="card-img">
                            <img src={book.img_url_medium} alt="Book 1"/>
                        </div>

                        <StarsRating rating={book.rating} />

                        {/* <div className="show-more">
                            <span>Show more</span>
                        </div> */}

                        <AiOutlineShoppingCart
                            className="card-hidden-cart"
                            onClick={() => handleAddCart(book.id)}
                        />

                        <div className="card-hidden">
                            <h1 className="card-hidden-title">{book.title}</h1>
                            <h2 className="card-hidden-author">{book.author}</h2>
                            <h3 className="card-hidden-price">{book.price}</h3>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

const ListingBooks = () => {
    const { selected, setSelected } = useSelectBest();

    useEffect(() => setSelected('BS'), [setSelected]);

    return (
        <>
            <div className="container-grid-listBook">
                {selected === 'BS' && <BestSeller />}
                {selected === 'BO' && <BestOffer />}
                {selected === 'PO' && <PreOrder />}
                {selected === 'RL' && <Release />}
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