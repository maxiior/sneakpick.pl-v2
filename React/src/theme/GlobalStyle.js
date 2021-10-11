import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&display=swap');
    *, *::before, *::after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font-size: 62.5%;
        overflow: ${({ scroll }) => scroll && "hidden"};
    }

    body {
        font-size: 1.6rem;
        font-family: 'Work Sans', sans-serif;
        margin: 0;

        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background-color: ${({ theme }) => theme.grey};
        }

        ::-webkit-scrollbar-thumb {
            background: ${({ theme }) => theme.blue};
        }
    }

    body, input, textarea, button {
        font-size: 1.6rem;
        font-family: 'Work Sans', sans-serif;
        margin: 0;
    }
`;

export default GlobalStyle;
