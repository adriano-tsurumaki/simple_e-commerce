import React, { useState, useEffect, useCallback, useRef } from 'react';

import { useHistory } from 'react-router-dom';

import { AiOutlineCloseCircle } from "react-icons/ai";

import axios from '../../services/api';

import './styles.css';

import Header from '../../components/Header';

// import { Link } from 'react-router-dom';

function Cart() {

    const initClose = useRef(true);

    const [listCarts, setListCarts] = useState([]);

    const [keyList, setKeyList] = useState('');

    // const [canClick, setCanClick] = useState(true);

    const [receiveCarts, setReceiveCarts] = useState([]);
    const [isReceived, setIsReceived] = useState(false);

    const [totalCheck, setTotalCheck] = useState(0);

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token-user');
        const hash = Buffer.from(token, 'utf-8').toString('base64');
        axios.get('user/cart', {
            headers: {
                'authorization': 'Basic ' + hash
            }
        })
            .then(res => {
                const { auth, redirectForLogin, list, total } = res.data;
                if(redirectForLogin) {
                    history.push('/login');
                }
                if(!auth) {
                    return undefined;
                }
                setReceiveCarts([...list]);
                setTotalCheck(total);
            })
            .catch(err => console.log(err));
    }, [history]);

    const updateListCarts = useCallback(() => {
        console.log('Atualizando a lista');
        setListCarts(oldState => oldState.filter(item => item.key !== keyList));
        setIsReceived(true);
    }, [keyList]);
    
    useEffect(() => {
        if(initClose.current)
            initClose.current = false;
        else {
            updateListCarts();
        }
    }, [updateListCarts]);

    const handleRemoveItem = useCallback((id_item, key) => {
        const token = localStorage.getItem('token-user');
        const str = `${token}/<!$3P4R4T0R!>/${id_item}`;
        const hash = Buffer.from(str, 'utf-8').toString('base64');
        axios.defaults.headers.authorization = `Basic ${hash}`;
        axios.delete('user/cart')
            .then(res => {
                // console.log(res.data);
                setKeyList(key);
                
                setTotalCheck(res.data.total);
            });
        delete axios.defaults.headers["authorization"];
    }, []);

    // const handleRemoveItem = (id_item, key) => {
    //     if(!canClick) {
    //         console.log("Não pode!");
    //         return false;
    //     }
    //     setCanClick(false);
    //     const token = localStorage.getItem('token-user');
    //     const str = `${token}/<!$3P4R4T0R!>/${id_item}`;
    //     const hash = Buffer.from(str, 'utf-8').toString('base64');
    //     axios.defaults.headers.authorization = `Basic ${hash}`;
    //     axios.delete('user/cart')
    //         .then(res => {
    //             setKeyList(key);
    //             setCanClick(true);
    //             setTotalCheck(res.data.total);
    //         });
    //     delete axios.defaults.headers["authorization"];
    // }

    useEffect(() => {
        if(isReceived) {
            console.log({isReceived});
            return (() => {});
        }
        
        console.log('Renderizando o componente pela primeira vez');

        const elements = receiveCarts.map(arr => {
            const item = arr[0];
            const id_item = arr["id_item"];
            return (
                <div className="listed-cart" key={`item-cart-${item.id}`}>

                    <div className="cart-divided-left">
                        <div className="cart-img">
                            <img src={item.image} alt={item.title}/>
                        </div>
                    </div>
                    <div className="cart-divided-center">
                        <div className="description-cart">
                            <span className="title-cart">{item.title}</span>
                            <span className="author-cart">{item.author}</span>
                        </div>
                    </div>
                    <div className="cart-divided-right">
                        <div className="flex-content-right">
                            <AiOutlineCloseCircle 
                                id="close-icon-cart" 
                                onClick={() => handleRemoveItem(id_item, `item-cart-${item.id}`)} 
                            />
                        </div>
                        <div className="flex-content-right">
                            <span className="cart-single-price">R$ {item.price}</span>
                        </div>
                    </div>

                </div>
            )
        });

        setListCarts([...elements]);
    }, [receiveCarts, isReceived, handleRemoveItem]);

    return(
        <>
            <Header />

            <div className="geral-cart">
                <div className="grid-cart">
                    <div className="container-cart">

                        {listCarts}

                    </div>
                    <div className="container-checkout-cart">
                        <div className="checkout-cart">
                            <span className="checkout-text-subtotal">
                                Subtotal: <span>R$ {totalCheck}</span>
                            </span>
                            <button className="checkout-button" onClick={()=>console.log(listCarts)}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;