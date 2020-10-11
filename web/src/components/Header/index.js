import React from 'react';

import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

import logo from '../../assets/icons/logo.svg';

import { AiOutlineDown } from 'react-icons/ai';

import { AiOutlineSearch } from 'react-icons/ai';

import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import './styles.css';

const ComponentHeader = () => {
    // const url = props.url;

    return (
        <>
            <div className="header-principal">

                <div className="nav-left">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="logo"/>
                    </Link>
                </div>

                <div className="nav-center">
                    <input type="text" placeholder="Search anything" className="search-bar"/>
                    <div className="search-category">
                        <span>Category</span>
                        <AiOutlineDown className="chevron-down" />
                    </div>
                    <button className="search-button">
                        <AiOutlineSearch alt="search" className="icon-search" />
                    </button>
                </div>

                <div className="nav-right">
                    <Link to="#" className="anchor-icon">
                        <AiOutlineHeart alt="heart" className="icon"/>
                    </Link>
                    <Link to="#" className="anchor-icon">
                        <AiOutlineUser alt="user" className="icon" />
                    </Link>
                    <Link to="/cart" className="anchor-icon">
                        <AiOutlineShoppingCart alt="cart" className="icon"/>
                    </Link>
                </div>

            </div>

            <Navbar />
        </>
    )
}

export default ComponentHeader;