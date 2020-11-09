import React from 'react';

import { Link } from 'react-router-dom';

import {
    AiOutlineShoppingCart
} from 'react-icons/ai';

import './styles.css';

const CartPopper = () => {

    const isLogged = localStorage.getItem('isLogged');


    const CartEmpty = (
        <>
            <span id="span-title-cart-empty">Your cart is empty</span>
            <button className="button-popper-styled-diff">
                <Link to="/">Keep buying</Link>
            </button>
        </>
    );

    const CartContent = (
        <>
            <div className="card-buyable">
                <div className="card-item-image">
                    <img src="https://m.media-amazon.com/images/I/41prSQnkSiL.jpg" alt="Item 1"/>
                </div>
                <div className="card-item-description">
                    <span className="title">
                        Harry Potter e o prisioneiro de Azkaban
                    </span>
                    <span className="author">
                        J.K. Rowling
                    </span>
                    <span className="price">
                        R$29,09
                    </span>
                </div>
            </div>
            <div className="card-buyable">
                <div className="card-item-image">
                    <img src="https://m.media-amazon.com/images/I/41prSQnkSiL.jpg" alt="Item 1"/>
                </div>
                <div className="card-item-description">
                    <span className="title">
                        Harry Potter e o prisioneiro de Azkaban
                    </span>
                    <span className="author">
                        J.K. Rowling
                    </span>
                    <span className="price">
                        R$29,09
                    </span>
                </div>
            </div>
            <div className="card-buyable">
                <div className="card-item-image">
                    <img src="https://m.media-amazon.com/images/I/41prSQnkSiL.jpg" alt="Item 1"/>
                </div>
                <div className="card-item-description">
                    <span className="title">
                        Harry Potter e o prisioneiro de Azkaban
                    </span>
                    <span className="author">
                        J.K. Rowling
                    </span>
                    <span className="price">
                        R$29,09
                    </span>
                </div>
            </div>
            <div className="popper-total-cart">
                <span>Total: R$ 234,54</span>
            </div>
            <button className="button-popper-styled">
                <Link to="/cart">Go to cart</Link>
            </button>
        </>
    );

    return (
        <>
            <Link to={isLogged ? '/cart' : '/login'} className="anchor-icon">
                <AiOutlineShoppingCart alt="cart" className="icon"/>
            </Link>
            <div className="popper-geral popper-cart">
                {isLogged ? CartContent : CartEmpty}
            </div>
        </>
    )
}

export default CartPopper;