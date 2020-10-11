import React, { useEffect } from 'react';

import axios from 'axios';

import Header from '../../components/Header';

// import { Link } from 'react-router-dom';

function Cart() {
    // const [list, setList] = useState([{}]);

    useEffect(() => {
        const token = localStorage.getItem('token-user');
        const hash = Buffer.from(token, 'utf-8').toString('base64');
        axios.get('http://localhost:3333/user/cart', {
            headers: {
                'authorization': 'Basic ' + hash
            }
        })
            .then(res => {
                console.log(res);
            })
    }, []);


    return(
        <>
            <Header />
            <h1>Cart</h1>
        </>

        // <div className="header">
        //     <h1 title=>Carrinho</h1>
        //     <Link to="/">Voltar</Link>
        // </div>
    )
}

export default Cart;