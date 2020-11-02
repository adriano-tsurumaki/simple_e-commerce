import React, { createContext, useState, useContext } from 'react';

const MessageAlertContext = createContext();


export default function MessageAlertProvider({ children }) {
    const [listMessage, setListMessage] = useState([]);
    const [msgAlert, setMsgAlert] = useState('');

    return (
        <MessageAlertContext.Provider value={
            listMessage,
            setListMessage,
            msgAlert,
            setMsgAlert
        }>
            {children}
        </MessageAlertContext.Provider>
    )
}

export function useMessageAlert() {
    const context = useContext(MessageAlertContext);
    const { listMessage, setListMessage, msgAlert, setMsgAlert } = context;

    return {
        listMessage,
        setListMessage,
        msgAlert,
        setMsgAlert
    };
}