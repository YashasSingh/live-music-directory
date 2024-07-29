// frontend/src/components/Layout.js

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Header = styled.header`
    background-color: #282c34;
    padding: 1rem;
    color: white;
    text-align: center;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-around;
    background-color: #61dafb;
    padding: 1rem;
`;

const Main = styled.main`
    flex: 1;
    padding: 2rem;
`;

const Footer = styled.footer`
    background-color: #282c34;
    color: white;
    text-align: center;
    padding: 1rem;
`;

const Layout = ({ children }) => {
    return (
        <Container>
            <Header>
                <h1>Music Directory & Professional Network</h1>
            </Header>
            <Nav>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/gigs">Gigs</Link>
                <Link to="/submissions">Submissions</Link>
            </Nav>
            <Main>{children}</Main>
            <Footer>© 2024 Music Directory</Footer>
        </Container>
    );
};

export default Layout;
