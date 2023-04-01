import React from "react";
import { HashRouter } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import Header from "./components/common/Header";
import GlobalModal from "./components/modules/GlobalModal";
import {openGlobalModal} from "./components/modules/GlobalModal/GlobalModal";
import "./styles.css";
import GlobalStyle from "./styles/globals";

import Routes from "./Routes";

import theme from "./styles/theme";

export default function App() {

React.useEffect(() => {
  openGlobalModal(<div style={{width:"100%", display:"flex", flexDirection: "column", justifyContent:"center"}}>
    <h1>Welcome to Convolve</h1>
   <p style={{fontSize: "1.1rem"}}>
    NOTE FROM THE DEV: Hi there! This app is currently sending backend requests to a proxy that routes back to a local machine I have running, which, in turn, handles LLM interactions. That being said, there are no uptime guarantees. If you find things are offline it could be temporary, or, it might be permanent. Apologies if things aren't working as intended!
    <br /> 
    <br />
    You can view the source for this project at <a href="https://github.com/pyxld-kris/convolve" target="_blank">https://github.com/pyxld-kris/convolve</a>. 
  </p>
  <p>
    What if you could put 10 ChatGPTs in a room together, give them all different jobs, and have them work together to tackle specific tasks? In a nutshell, that's the idea behind Convolve.
  </p>
	 
  </div>); 
}, []);

return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalModal />
        <GlobalStyle />
        <HashRouter>
          <Header />
          <Routes />
          {/* <Footer /> */}
        </HashRouter>
      </ThemeProvider>
    </div>
  );
}
