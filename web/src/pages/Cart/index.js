import React from 'react';

import ComponentHeader from '../../components/ComponentHeader';

// import { Link } from 'react-router-dom';

function Cart() {
    return(

        <ComponentHeader 
            title="Carrinho" 
            url="/"
            urlTitle="Voltar"
        />

        // <div className="header">
        //     <h1 title=>Carrinho</h1>
        //     <Link to="/">Voltar</Link>
        // </div>
    )
}

export default Cart;