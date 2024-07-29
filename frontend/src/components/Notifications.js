// frontend/src/components/Notifications.js

import React, { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';
import styled from 'styled-components';

const NotificationContainer = styled.div`
    position: fixed;
    top: 10px;
    right: 10px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    width: 300px;
    z-index: 1000;
`;

const NotificationItem = styled.div`
    margin-bottom: 1rem;
`;

const Notifications = () => {
    const { notifications } = useContext(NotificationContext);

    return (
        <NotificationContainer>
            <h3>Notifications</h3>
            {notifications.map((notification, index) => (
                <NotificationItem key={index}>
                    <p>{`Submission for ${notification.Gig.title} is now ${notification.status}`}</p>
                </NotificationItem>
            ))}
        </NotificationContainer>
    );
};

export default Notifications;
