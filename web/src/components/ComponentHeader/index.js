import React from 'react';

import { Link } from 'react-router-dom';

import './styles.css';


const ComponentHeader = (props) => {
    const url = props.url;

    return (
        <div className="header-principal">
            <h1>{props.title}</h1>
            <Link to={url}>{props.urlTitle}</Link>
        </div>
    )
}

export default ComponentHeader;