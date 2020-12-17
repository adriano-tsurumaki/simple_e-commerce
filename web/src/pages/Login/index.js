import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';

import logoFav from '../../assets/icons/favicon.svg';

import axios from '../../services/api';
import * as yup from 'yup';

import './styles.css';

const Message = (props) => {
    return (
        <div className="notification">
            {props.msg}
        </div>
    )
}


function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [anyNotification, setAnyNotification] = useState('');

    const history = useHistory();


    const loginSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email(),
        password: yup.string().required()
    });

    const handleSubmit = () => {

        let form = {
            name,
            password
        };

        const hash = Buffer.from(`${name}/<!$3P4R4T0R!>/${password}`, 'utf-8').toString('base64');

        loginSchema
            .isValid(form)
            .then(valid => {
                if(valid) {
                    axios.post('user/login', null, {
                        headers: {
                            'authorization': `Basic ${hash}`
                        }
                    })
                    .then(res => {
                        const { token, auth, msg } = res.data;
                        const deadline = {
                            start: Date.now(),
                            end: Date.now() + 600000
                            // end: Date.now() + 10000
                        }
                        if(auth) {
                            console.log('token recebido com sucesso');
                            localStorage.setItem('token-user', token);
                            localStorage.setItem('isLogged', true);
                            localStorage.setItem('deadline', JSON.stringify(deadline));
                            history.push('/');
                        } else {
                            setAnyNotification(true);
                            console.log(msg);
                        }
                    });
                    delete axios.defaults.headers["authorization"];
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
                    // onKeyDown={(e) => handleEnter(e, true)}
                    value={name} 
                    placeholder="E-mail or username"
                    id="input-name"
                />
                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    // onKeyDown={(e) => handleEnter(e, false)}
                    value={password}
                    placeholder="Password"
                    id="input-password"
                />

                <button onClick={handleSubmit} id="button-login">Log in</button>

                <div id="option-remember">
                    <input type="checkbox" />
                    <span>Remember me</span>
                </div>

                <div id="option-register">
                    <span>Don't have an account? </span>
                    <Link to="/register">
                        <span>Sign up here</span>
                    </Link>
                </div>
            </div>

            { anyNotification && <Message msg="okay" /> }
        </div>
    )
}

export default Login;