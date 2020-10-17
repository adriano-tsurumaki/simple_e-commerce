import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';

import logoFav from '../../assets/icons/favicon.svg';

import axios from '../../services/api';
import * as yup from 'yup';

import './styles.css';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();


    const loginSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email(),
        password: yup.string().required()
    });

    const handleSubmit = () => {
        
        // if(name.search(/@/i) === -1) {
            
        // }

        let form = {
            name,
            password
        };

        const hash = Buffer.from(`${name}/<!$3P4R4T0R!>/${password}`, 'utf-8').toString('base64');

        loginSchema
            .isValid(form)
            .then(valid => {
                console.log(valid);
                if(valid) {
                    axios.post('user/login', null, {
                        headers: {
                            'authorization': `Basic ${hash}`
                        }
                    })
                    .then(res => {
                        const { token } = res.data;
                        console.log('token recebido com sucesso');
                        localStorage.setItem('token-user', token);
                        localStorage.setItem('isLogged', true);
                        history.push('/');
                    });
                }
            });
    }

    return (
        <div className="container-grid-formulation">

            <div className="form-login">
                <div className="logo-center">
                    <Link to="/">
                        <img src={logoFav} alt="Imagem de uma logo com a funcionalidade de voltar ao home page"/>
                    </Link>
                </div>
                <input 
                    type="text" 
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                    placeholder="E-mail or username"
                    id="input-name"
                />
                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    placeholder="Password"
                    id="input-password"
                />

                <button onClick={handleSubmit} id="button-login">Log in</button>

                <div id="option-remember">
                    <input type="checkbox" id=""/>
                    <span>Remember me</span>
                </div>

                <div id="option-register">
                    <span>Don't have an account? </span>
                    <Link to="/register">
                        <span>Sign up here</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;