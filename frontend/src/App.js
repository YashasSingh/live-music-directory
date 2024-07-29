// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './components/Profile';
import Gigs from './components/Gigs';
import Submissions from './components/Submissions';
import GlobalStyle from './globalStyles';

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <Layout>
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/gigs" element={<Gigs />} />
                    <Route path="/submissions" element={<Submissions />} />
                    <Route path="/" element={<h2>Welcome to the Music Directory</h2>} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
