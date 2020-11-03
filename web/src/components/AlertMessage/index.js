import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AiFillCheckCircle } from "react-icons/ai";
import { BsExclamationCircleFill } from "react-icons/bs";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import './styles.css';

function removeMessage(id) {
    return {
        type: 'REMOVE_MESSAGE',
        id
    }
}

function setTimerMessage(id) {
    return {
        type: 'SET_TIMER_MESSAGE',
        id
    }
}

const AlertMessage = ({ list, total, dispatch }) => {

    useEffect(() => {
        list.map(item => {
            if(!item.setTimer) {
                dispatch(setTimerMessage(item.id));
                const timer = setTimeout(() => {
                    dispatch(removeMessage(item.id));
                }, 5000);

                return () => clearTimeout(timer);
            }
            return true;
        })
    }, [total, dispatch, list]);

    return (
        <div className="list-alerts">
            {total !== 0 && list.map(item => (
                <div className={`item-alert ${item.type_alert}`} key={item.id}>
                    {item.type_alert === "success" && <AiFillCheckCircle className="icon-alert" />}
                    {item.type_alert === "warning" && <BsExclamationCircleFill className="icon-alert" />}
                    {item.type_alert === "info" && <BsFillInfoCircleFill className="icon-alert" />}
                    {item.type_alert === "danger" && <BsXCircleFill className="icon-alert" />}
                    <span><span>{item.type_alert}</span>: {item.msg}</span>
                    <div className="close-btn" onClick={() => dispatch(removeMessage(item.id))}>
                        <AiOutlineClose className="icon-close-alert"/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default connect(state => ({
    list: state.list,
    total: state.total
}))(AlertMessage);