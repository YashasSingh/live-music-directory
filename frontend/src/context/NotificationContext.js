// frontend/src/context/NotificationContext.js

import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const NotificationContext = createContext();

const socket = io();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.on('statusUpdate', (submission) => {
            setNotifications((prev) => [...prev, submission]);
        });

        return () => {
            socket.off('statusUpdate');
        };
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
