import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import logoFav from '../../assets/icons/favicon.svg';

import './styles.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="container-grid-formulation">

            <div className="form-register">
                <div className="logo-center">
                    <Link to="/">
                        <img src={logoFav} alt="Imagem de uma logo com a funcionalidade de voltar ao home page"/>
                    </Link>
                </div>
                <input 
                    type="text" 
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                    placeholder="Username"
                    id="input-name"
                />

                <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    placeholder="E-mail address"
                    id="input-email"
                />

                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    placeholder="Password"
                    id="input-password"
                />

                <button type="submit" id="button-login">Sign up</button>

                <div id="option-register">
                    <span>Already have an account?</span>
                    <Link to="/login">
                        <span> Log in here</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register;