import React from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

const CategoryNav = (props) => {
    return (
        <Link to={props.link} className="category-nav">
            <span>{props.label}</span>
        </Link>
    )
}

const Navbar = () => {
    return (
        <nav className="navbar">
            <CategoryNav
                link="/categories"
                label="Categories"
            />
            <CategoryNav
                link="/top/best-seller"
                label="Best Sellers"
            />
            <CategoryNav
                link="/top/best-writter"
                label="Best Writters"
            />
            <CategoryNav
                link="/offers"
                label="Offers"
            />
            <CategoryNav
                link="/offers/pre-order"
                label="Pre-Order"
            />
        </nav>
    )
}

export default Navbar;