import React, { useState } from 'react';

import axios from 'axios';
import * as yup from 'yup';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const loginSchema = yup.object().shape({
        name: yup.string().required(),
        password: yup.string().required()
    });

    const handleSubmit = event => {
        event.preventDefault();

        const archive = {
            name,
            password
        };

        const hash = Buffer.from(`${name}/<!$3P4R4T0R!>/${password}`, 'utf-8').toString('base64');

        loginSchema
            .isValid(archive)
            .then(() => {
                axios.post('http://localhost:3333/user/login', null, {
                    headers: {
                        'authorization': `Basic ${hash}`
                    }
                })
                    .then(res => {
                        const { token } = res.data;
                        console.log(token);
                        // console.log('Token recebido com sucesso');
                        localStorage.setItem('token-user', token);
                    });
            });
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Usuário</label>
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="username">Senha</label>
                <input 
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login;