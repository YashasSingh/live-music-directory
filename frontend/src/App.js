// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './components/Profile';
import Gigs from './components/Gigs';
import Submissions from './components/Submissions';
import GlobalStyle from './globalStyles';
import { NotificationProvider } from './context/NotificationContext';
import Login from './components/Login';
import Signup from './components/Signup';

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    return token ? element : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <NotificationProvider>
                <Layout>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                        <Route path="/gigs" element={<PrivateRoute element={<Gigs />} />} />
                        <Route path="/submissions" element={<PrivateRoute element={<Submissions />} />} />
                        <Route path="/" element={<Navigate to="/login" />} />
                    </Routes>
                </Layout>
            </NotificationProvider>
        </Router>
    );
};

export default App;
