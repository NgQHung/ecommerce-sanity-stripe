import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface IProps {
    children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: IProps) => {
    return (
        <div className="layout">
            <Head>
                <title>JS Mastery Store</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className="main-container">{children}</main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;
