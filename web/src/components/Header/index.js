import React from 'react';

import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

import logo from '../../assets/icons/logo.svg';

import CartPopper from './CartPopper';
import WishListPopper from './WishListPopper';
import UserPopper from './UserPopper';

import { 
    AiOutlineDown, 
    AiOutlineSearch, 
} from 'react-icons/ai';

import './styles.css';

const ComponentHeader = () => {

    const isLogged = localStorage.getItem('isLogged');
    console.log(isLogged);

    return (
        <div className="header-fixed">
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
                    <div className="popper popper--wishlist">
                        <WishListPopper />
                    </div>
                    <div className="popper">
                        <CartPopper />
                    </div>
                    <div className="popper popper--user">
                        <UserPopper isLogged={isLogged} />
                    </div>
                </div>

            </div>

            <Navbar />
        </div>
    )
}

export default ComponentHeader;