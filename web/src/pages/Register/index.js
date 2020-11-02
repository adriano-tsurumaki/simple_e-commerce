import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import logoFav from '../../assets/icons/favicon.svg';

import axios from '../../services/api';
import * as yup from 'yup';


import './styles.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();


    const loginSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required()
    });

    const handleSubmit = () => {
        const archive = {
            name,
            email,
            password
        }

        loginSchema
            .isValid(archive)
            .then(valid => {
                if(valid) {
                    const hash = Buffer.from(`${name}/<!$3P4R4T0R!>/${password}/<!$3P4R4T0R!>/${email}`, 'utf-8').toString('base64');
                    axios.defaults.headers.authorization = `Basic ${hash}`;
                    axios.post('/user/register')
                        .then(res => {
                            console.log(res);
                            const { token } = res.data;
                            localStorage.setItem('token-user', token);
                            localStorage.setItem('isLogged', true);
                            history.push('/');
                        })
                        .catch(err => console.log('Ocorreu um erro! ' + err));
                    delete axios.defaults.headers["authorization"];
                }
            })
        delete axios.defaults.headers["authorization"];
        
    }

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

                <button 
                    type="submit" 
                    id="button-login"
                    onClick={handleSubmit}
                >
                    Sign up
                </button>

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