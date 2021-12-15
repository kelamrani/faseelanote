import React from "react";
import { GlobalStyle } from "../styles/GlobalStyle";
import "./layout.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Layout({ children }) {
return (
    <>
        <GlobalStyle />
        <ToastContainer position="top-center" />
        <main>{children}</main>
    </>
)
}

export default Layout
