// frontend/src/globalStyles.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Arial', sans-serif;
        background-color: #f5f5f5;
    }

    a {
        text-decoration: none;
        color: #333;
    }

    a:hover {
        color: #61dafb;
    }
`;

export default GlobalStyle;
