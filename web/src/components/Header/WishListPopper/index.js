import React from 'react';
import { Link } from 'react-router-dom';

import {
    AiOutlineHeart
} from 'react-icons/ai';

const WishListPopper = () => {
    
    return (
        <>
            <Link to="#" className="anchor-icon">
                <AiOutlineHeart alt="heart" className="icon"/>
            </Link>
            <div className="popper-geral popper-whishlist">
                Popper de wishlist
            </div>
        </>
    )
}

export default WishListPopper;