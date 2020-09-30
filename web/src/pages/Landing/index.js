import React from 'react';

import ComponentHeader from '../../components/ComponentHeader';

function Landing() {

    // function handleAddItem(evt) {
    // }

    return (

        <div>
            <ComponentHeader 
                title="Página Inicial"
                url="/Cart"
                urlTitle="Carrinho"
            />

            <div className="list">
                <div className="box">
                    <div className="img">
                        <img src="https://static.netshoes.com.br/produtos/tenis-nike-quest-2-masculino/26/HZM-1743-026/HZM-1743-026_detalhe1.jpg?ts=1562156633?ims=280x280" alt="Calça"/>
                    </div>
                    <p>Tênis Nike Quest 2 Masculino</p>
                    <p>R$ 229,99</p>
                    <button className="button-add" /*onClick={() => handleAddItem()}*/>Adicionar ao carrinho</button>
                </div>
            </div>
        </div>

        // <div className="header">
        //     <h1>Página Inicial</h1>
        //     <Link to="/Cart">Carrinho</Link>
        // </div>
    )
}

export default Landing;