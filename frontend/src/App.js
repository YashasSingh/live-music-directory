import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './components/Profile';
import Gigs from './components/Gigs';
import Submissions from './components/Submissions';
import GlobalStyle from './globalStyles';
import { NotificationProvider } from './context/NotificationContext';
import Home from './components/Home';  // Import the Home component

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <NotificationProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />  {/* Set Home component as the root route */}
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/gigs" element={<Gigs />} />
                        <Route path="/submissions" element={<Submissions />} />
                    </Routes>
                </Layout>
            </NotificationProvider>
        </Router>
    );
};

export default App;
