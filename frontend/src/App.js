// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </Switch>
        </Router>
    );
};

export default App;
