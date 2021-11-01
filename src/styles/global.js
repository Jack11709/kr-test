import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html {
        background-color: #F8F8FF;
    }
    body {
        margin: 0 auto;
        font-family: 'Roboto Mono', monospace, sans-serif;
        max-width: 900px;
    }
    a {
        text-decoration: none;
        color: inherit;
        display: block;
    }
    main {
        padding: 10px 35px;
    }
`
