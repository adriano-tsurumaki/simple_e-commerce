import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import axios from '../../services/api';

const User = () => {

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token-user');
        axios.defaults.headers.authorization = `Bearer ${token}`;
        axios.get('http://localhost:3333/user')
            .then(res => {
                if(!res.data.auth) {
                    history.push('/login');
                }
                console.log(res.data);
            })
        delete axios.defaults.headers["authorization"];
    }, [history]);

    return(
        <h1>Usuário</h1>
    )
}

export default User;