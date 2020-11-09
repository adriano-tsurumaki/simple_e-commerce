import React from 'react';
import { Link } from 'react-router-dom';

import {
    AiOutlineUser
} from 'react-icons/ai';

const UserPopper = (props) => {
    const Online = (
        <>
            <h1>Olá</h1>
        </>
    );

    const Offline = (
        <>
            <span>You're not logged</span>
            <button>
                <Link to="/login">Log in</Link>
            </button>
        </>
    );

    return (
        <>
            <Link to={props.isLogged ? '/user' : '/login'} className="anchor-icon">
                <AiOutlineUser alt="user" className="icon" />
            </Link>
            <div className="popper-geral popper-user">
                {props.isLogged ? Offline : Online}
            </div>
        </>
    )
}

export default UserPopper;